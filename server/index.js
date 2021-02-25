// import helmet for securing app from xss attacks

// import express-rate-limit to prevent DoS attacks where repeated requests flood the server

// import body-parser middleware which looks at requests where content-type of header matches

// import 'dotenv/config';
// import cors from 'cors';

const express = require("express");
const formData = require("express-form-data");
const cloudinary = require("cloudinary");
const app = express();
const { PORT = 3000 } = process.env;
const path = require("path");
const jwtAuthentication = require("./jwt-authentication");
// const flash = require("connect-flash");
// const session = require("express-session");

const axios = require("axios");

var userCount;
let promiseObject = {};

cloudinary.config({
  cloud_name: "dj2xpmtn5",
  api_key: "541919797753448",
  api_secret: "DrbaMbi5MbaF0mF3axbspgXb35U",
});

// app.use(express.cookieParser("keyboard cat"));
// app.use(
//   session({
//     secret: "adarsh",
//     saveUninitialized: true,
//     resave: true,
//   })
// );
// app.use(flash());
app.use(formData.parse());
app.use(express.static("client/public"));

// middleware to parse body for fetching form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use((req, res, next) => {
  Promise.resolve(promiseObject)
    .then(({ accessToken }) => {
      // if (accessToken) res.setHeader("Access-Token", accessToken);
      if (req) jwtAuthentication.setAccessToken(accessToken);
    })
    .catch((err) => {
      console.error(err);
    });

  next();
});
app.use(jwtAuthentication.jwtAuthenticationMiddleware);

// get the mysql service
var mysql = require("mysql");

// add the credentials to access your database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "employee",
  multipleStatements: true,
});

// connect to mysql
connection.connect(function (err) {
  // in case of error
  if (err) {
    console.log(err.code);
    console.log(err.fatal);
  }
});

$query = `SELECT COUNT(*) AS total FROM emp1`;

connection.query($query, function (err, rows, fields) {
  if (err) {
    console.log("An error occurred  performing the query.");
    return;
  }

  console.log("Query successfully executed: ", rows[0].total);
  userCount = rows[0].total;
});

app.set("views", path.join("client/public"));
app.set("view engine", "ejs");

app.post("/jwt-login", jwtAuthentication.jwtLogin);

app.get("/", (req, res) => {
  res.sendFile("app.html", { root: "client/public" });
});

app.get("/products", (req, res) => {
  res.sendFile("all_products.html", { root: "client/public" });
});

app.get("/all-products", (req, res) => {
  connection.query(
    `create table if not exists products (id INT(6) unsigned auto_increment primary key,
    name varchar(20) not null, description varchar(30) not null, image text); 
    SELECT * FROM products;`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows[1]);
    }
  );
});

app.get(
  `/products/new`,
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    res.sendFile("new_product.html", { root: "client/public" });
  }
);

app.post(
  "/products/new",
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    //perform a query
    $query = `insert into products (name, description) values ('${req.body.name}','${req.body.description}')`;

    connection.query($query, function (err, rows, fields) {
      if (err) {
        console.log("An error occurred performing the query.");
        return res.redirect("/products/new");
      }

      return res.redirect("/products");
    });
  }
);

app.get("/products/:id/edit", (req, res) => {
  res.sendFile("edit_product.html", { root: "client/public" });
});

app.get("/products/:id/editInfo", (req, res) => {
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) console.log("ERROR while editing - " + error);
      res.send(results[0]);
    }
  );
});

app.post("/products/:id/edit", (req, res) => {
  $query = `UPDATE products SET name = '${req.body.name}', 
    description = '${req.body.description}',
    image = '${req.body.image}' WHERE ID = '${req.params.id}'`;

  connection.query($query, (err) => {
    if (err) {
      console.log("ERROR while editing - " + err);
    }
  });
  return res.redirect("/products");
});

app.post("/image-upload", (req, res) => {
  cloudinary.uploader.upload(req.files.myFile.path).then((image) => {
    res.send(image);
  });
});

app.get("/products/:id/delete", (req, res) => {
  $query = `DELETE FROM products WHERE ID = ${req.params.id}`;

  connection.query($query, (err) => {
    if (err) {
      console.log("ERROR while deleting - " + err);
    }
  });

  return res.redirect("/products");
});

app.get("/products/:id/show", (req, res) => {
  console.log("SHOW PAGE = " + req.params.id);
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) console.log("ERROR while editing - " + error);
      res.render("show_product", {
        product: results[0],
      });
    }
  );
});

app.get("/users", (req, res) => {
  axios.get("https://randomuser.me/api/?page=1&results=10").then((response) => {
    res.send(response.data);
  });
});

app.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "client/public" });
});

app.post("/register", (req, res) => {
  //perform a query
  $query = `INSERT INTO emp1 values (${userCount + 1},20,'${
    req.body.username
  }','${req.body.password}')`;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error occurred performing the query.");
      return res.redirect("/register");
    }

    console.log("Query successfully executed: ", rows);
    userCount += 1;
    return res.redirect("/products");
  });
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "client/public" });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  $query = `SELECT COUNT(*) as found FROM emp1 WHERE first = '${req.body.username}' and last = '${req.body.password}'`;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error occurred performing the query.");
      return res.redirect("/login");
    }

    console.log("Query successfully executed: ", rows);

    if (rows[0].found == 0) {
      return res.redirect("/login");
    }
    // Set an access token using jwt after a successful search in the database
    promiseObject = jwtAuthentication.jwtLogin(req, res);

    return res.redirect("/products");
  });
});

app.get("/close", (req, res) => {
  // Close the connection with database
  connection.end(function () {
    // the connection has been closed
  });
  return res.redirect("/products");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

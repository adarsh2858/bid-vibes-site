// import helmet for securing app from xss attacks

// import express-rate-limit to prevent DoS attacks where repeated requests flood the server

// import body-parser middleware which looks at requests where content-type of header matches

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const axios = require("axios");

var userCount;

app.use(express.static("client/public"));

// middleware to parse body for fetching form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.sendFile("app.html", { root: "client/public" });
});

app.get("/products", (req, res) => {
  res.sendFile("products.html", { root: "client/public" });
});

app.get("/all-products", (req, res) => {
  connection.query(
    `create table if not exists products (id INT(6) unsigned auto_increment primary key,
    name varchar(20) not null, description varchar(30) not null); 
    SELECT * FROM products;`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows[1]);
    }
  );
});

app.get("/products/new", (req, res) => {
  res.sendFile("new_product.html", { root: "client/public" });
});

app.post("/products/new", (req, res) => {
  //perform a query
  $query = `insert into products (name, description) values ('${req.body.name}','${req.body.description}')`;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error occurred performing the query.");
      return res.redirect("/products/new");
    }

    return res.redirect("/products");
  });
});

app.get("/products/:id/edit", (req, res) => {
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) console.log("ERROR while editing - " + error);
      res.render("edit_product", {
        product: results[0],
      });
    }
  );
});

app.post("/products/:id/edit", (req, res) => {
  $query = `UPDATE products SET name = '${req.body.name}', 
    description = '${req.body.description}' WHERE ID = '${req.params.id}'`;

  connection.query($query, (err) => {
    if (err) {
      console.log("ERROR while editing - " + err);
    }
  });
  return res.redirect("/products");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

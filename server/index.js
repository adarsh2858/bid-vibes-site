// import helmet for securing app from xss attacks

// import express-rate-limit to prevent DoS attacks where repeated requests flood the server

// import body-parser middleware which looks at requests where content-type of header matches

const express = require("express");
const app = express();
const port = 3000;

const axios = require("axios");
const { response } = require("express");

app.use(express.static("public"));

// middleware to parse body for fetching form data
app.use(express.json());
app.use(express.urlencoded());

// get the mysql service
var mysql = require("mysql");

// add the credentials to access your database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "employee",
});

// connect to mysql
connection.connect(function (err) {
  // in case of error
  if (err) {
    console.log(err.code);
    console.log(err.fatal);
  }
});

// perform a query
// $query = "SELECT * from emp1 LIMIT 10";

// connection.query($query, function (err, rows, fields) {
//   if (err) {
//     console.log("An error occurred  performing the query.");
//     return;
//   }

//   console.log("Query successfully executed: ", rows);
// });

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.get("/campgrounds", (req, res) => {
  res.sendFile("campgrounds.html", { root: "public" });
});

app.get("/users", (req, res) => {
  axios.get("https://randomuser.me/api/?page=1&results=10").then((response) => {
    res.send(response.data);
  });
});

app.post("/register", (req, res) => {
  res.sendFile()
});

app.post("/login", (req, res) => {
  //perform a query
  $query = `INSERT INTO emp1 (first, last) values ('${req.body.username}','${req.body.password}')`;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error occurred  performing the query.");
      return;
    }

    console.log("Query successfully executed: ", rows);
  });
});

app.post("/close", () => {
  // Close the connection with database
  connection.end(function () {
    // the connection has been closed
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

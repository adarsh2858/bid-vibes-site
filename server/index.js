const express = require("express");
const app = express();
const port = 3000;

const axios = require("axios");
const { response } = require("express");

app.use(express.static('public'));


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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

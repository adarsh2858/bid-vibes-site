// var x = document.getElementById("view_campgrounds");

// x.addEventListener("click", () =>{
//     window.location="html/campgrounds.html"
// });

const express = require("express");
const app = express();
const port = 3000;

const axios = require('axios');
const { response } = require("express");

app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
  res.sendFile('index.html', { root: "public" })
});

app.get("/campgrounds", (req, res) => {
      res.sendFile('campgrounds.html', { root: "public" })
    });

app.get("/users",(req, res) => {
  axios.get('https://randomuser.me/api/?page=1&results=10').then(
    response => {
      res.send(response.data);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

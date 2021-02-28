var { app } = require("../server/index");

app.post("/add-comment", (req, res) => {
  const username = req.body.username;
  const comment = req.body.comment;
  res.json({ username, comment, success: true });
  // res.redirect('back');
});

app.get("/comments", (req, res) => {
  res.json([
    { username: "ash", comment: "Foo" },
    { username: "dishij", comment: "Bar" },
  ]);
});

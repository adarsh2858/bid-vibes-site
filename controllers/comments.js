// Write the routes related to the comments workflow which is associated to the respective product

const util = require("util");
var { app, connection, isAuthenticatedMiddleware } = require("../server/index");

const query = util.promisify(connection.query).bind(connection);

app.post("/add-comment", async (req, res) => {
  const username = req.body.username;
  const comment = req.body.comment;
  const productId = req.body.productId;

  try {
    const rows = await query(
      `INSERT INTO comments (username, comment, product_id) VALUES ("${username}", "${comment}", "${productId}")`
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }

  // res.redirect('back');
});

app.get("/product/:id/comments", async (req, res) => {
  try {
    const rows = await query(
      `SELECT * from comments WHERE product_id = "${req.params.id}"`
    );

    res.json(rows);
  } catch {
    res.json({ success: false });
  }
});

app.delete(
  "/delete-comment/:id",
  isAuthenticatedMiddleware,
  async (req, res) => {
    try {
      const rows = await query(
        `DELETE FROM comments WHERE id = "${req.params.id}"`
      );
      res.json({ success: true });
    } catch {
      res.json({ success: false });
    }
  }
);

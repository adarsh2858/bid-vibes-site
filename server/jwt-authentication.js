const njwt = require("njwt");
var { connection } = require("./index");

let users = [];

$query = `SELECT * FROM emp1`;

connection.query($query, function (err, results) {
  if (err) {
    console.log("An error occurred  performing the query.");
    return;
  }

  users = results;
  // console.log("Query successfully executed: ", users);
  // console.log("Query successfully executed: ", JSON.parse(JSON.stringify(results)));
});

const {
  APP_SECRET = "something really random",
  APP_BASE_URL = "http://localhost:3000",
} = process.env;

function encodeToken(tokenData) {
  return njwt.create(tokenData, APP_SECRET).compact();
}

function decodeToken(token) {
  return njwt.verify(token, APP_SECRET).body;
}

// This express middleware attaches `userId` to the `req` object if a user is
// authenticated. This middleware expects a JWT token to be stored in the
// `Access-Token` header.

let accessToken;

const setAccessToken = (newAccessToken) => {
  accessToken = newAccessToken;
};

const jwtAuthenticationMiddleware = (req, res, next) => {
  // const token = req.header("Access-Token");
  const token = accessToken;
  if (!token) {
    return next();
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;

    if (users.find((user) => user.id === userId)) {
      req.userId = userId;
    }
  } catch (e) {
    return next();
    // return "Please sign up"
  }

  next();
};

// This middleware stops the request if a user is not authenticated.
async function isAuthenticatedMiddleware(req, res, next) {
  if (req.userId) {
    return next();
  }

  // req.flash("error", "User not authenticated");
  // res.status(401);
  // res.json({ error: "User not authenticated" });
  res.redirect("/products");
}

// This endpoint generates and returns a JWT access token given authentication data.
const jwtLogin = async (req, res) => {
  const { username: email, password } = req.body;
  const user = users.find(
    (user) => user.first === email && user.last === password
  );

  if (!user) {
    res.status(401);
    return res.json({ error: "Invalid email or password" });
  }

  const accessToken = encodeToken({ userId: user.id });
  return { accessToken };
};

module.exports = {
  jwtAuthenticationMiddleware,
  isAuthenticatedMiddleware,
  jwtLogin,
  setAccessToken,
};

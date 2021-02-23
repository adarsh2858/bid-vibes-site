const njwt = require("njwt");

const users = [
  {
    id: "1",
    email: "adarsh",
    password: "ash",
  },
  {
    id: "2",
    email: "adarshagarwal",
    password: "adarsh",
  },
];

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
const jwtAuthenticationMiddleware = (req, res, next) => {
  const token = req.header("Access-Token");
  if (!token) {
    return next();
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;

    console.log("decoded", decoded);
    console.log("userId", userId);

    if (users.find((user) => user.id === userId)) {
      console.log("found user!");
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

  res.status(401);
  res.json({ error: "User not authenticated" });
}

// This endpoint generates and returns a JWT access token given authentication data.
const jwtLogin = async (req, res) => {
  const { username: email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.status(401);
    return res.json({ error: "Invalid email or password" });
  }

  console.log(user.id);
  const accessToken = encodeToken({ userId: user.id });
  return res.json({ accessToken });
};

module.exports = {
  jwtAuthenticationMiddleware,
  isAuthenticatedMiddleware,
  jwtLogin,
};

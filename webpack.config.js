const path = require("path");
module.exports = {
  entry: ["./client/src/app.js"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/client/public"),
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ],
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};

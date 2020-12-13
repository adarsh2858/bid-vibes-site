import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login";
import LikeButton from "./components/LikeButton";
import NewProduct from "./components/NewProduct";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Adarsh Products!</h1>
      </div>
    );
  }
}

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
if (document.getElementById("login_container")) {
  ReactDOM.render(<Login />, document.getElementById("login_container"));
}

if (document.getElementById("like_button_container")) {
  ReactDOM.render(
    <LikeButton />,
    document.getElementById("like_button_container")
  );
}

if (document.getElementById("new_product_container")) {
  ReactDOM.render(
    <NewProduct />,
    document.getElementById("new_product_container")
  );
}

import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login";
import LikeButton from "./components/LikeButton";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import AllProducts from "./components/AllProducts";
import "regenerator-runtime/runtime";

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

if (document.getElementById("like-button-container")) {
  ReactDOM.render(
    <LikeButton />,
    document.getElementById("like-button-container")
  );
}

if (document.getElementById("new-product-container")) {
  ReactDOM.render(
    <NewProduct />,
    document.getElementById("new-product-container")
  );
}

if (document.getElementById("edit-product-container")) {
  ReactDOM.render(
    // <EditProduct name={currentName} description={currentDescription} />,
    <EditProduct />,
    document.getElementById("edit-product-container")
  );
}

if (document.getElementById("all-products")) {
  ReactDOM.render(<AllProducts />, document.getElementById("all-products"));
}

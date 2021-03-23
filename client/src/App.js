import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login";
import LikeButton from "./components/LikeButton";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import AllProducts from "./components/AllProducts";
import AllUsers from "./components/AllUsers";
import Comments from "./components/Comments";
import TopNavBar from "./components/TopNavBar";
import "regenerator-runtime/runtime";

class App extends React.Component {
  render() {
    return (
      <div>
        <TopNavBar />
        {/* <h1>Welcome to Adarsh Products1!</h1> */}
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

if (document.getElementById("edit_product_container")) {
  ReactDOM.render(
    // <EditProduct name={currentName} description={currentDescription} />,
    <EditProduct />,
    document.getElementById("edit_product_container")
  );
}

if (document.getElementById("all_products")) {
  ReactDOM.render(<AllProducts />, document.getElementById("all_products"));
}

if (document.getElementById("comments")) {
  ReactDOM.render(<Comments />, document.getElementById("comments"));
}

if (document.getElementById("all-users")) {
  ReactDOM.render(<AllUsers />, document.getElementById("all-users"));
}

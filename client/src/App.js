import React from "react";
import ReactDOM from "react-dom";
import reducer from "./store/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Login from "./components/Login";
import LikeButton from "./components/LikeButton";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import AllProducts from "./components/AllProducts";
import AllUsers from "./components/AllUsers";
import Comments from "./components/Comments";
import TopNavBar from "./components/TopNavBar";
import "regenerator-runtime/runtime";
import axios from "axios";

const store = createStore(reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isUserLoggedIn: false };
  }

  componentDidMount() {
    axios.get("/user-logged-in").then((response) => {
      const { data } = response;
      this.setState({ isUserLoggedIn: data.loggedIn });
    });
  }

  render() {
    return (
      <div>
        <TopNavBar isUserLoggedIn={this.state.isUserLoggedIn} />
        {/* <h1>Welcome to Adarsh Products1!</h1> */}
      </div>
    );
  }
}

if (document.getElementById("root")) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}
if (document.getElementById("login_container")) {
  ReactDOM.render(
    <Provider {...{ store }}>
      <Login />
    </Provider>,
    document.getElementById("login_container")
  );
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

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import defaultImport from "./store/configureStore";
import Login from "./components/Login";
import LikeButton from "./components/LikeButton";
import NewProduct from "./components/Product/New";
import EditProduct from "./components/Product/Edit";
import AllProducts from "./components/AllProducts";
import AllUsers from "./components/AllUsers";
import Comments from "./components/Comments";
import TopNavBar from "./components/Shared/TopNavBar";
import ReduxComponent from "./components/ReduxComponent";
import "regenerator-runtime/runtime";

const { store, persistor: newPersistor } = defaultImport();

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
    <Provider {...{ store }}>
      <PersistGate loading={null} persistor={newPersistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById("root")
  );
}
if (document.getElementById("login_container")) {
  ReactDOM.render(
    <Provider {...{ store }}>
      <PersistGate loading={null} persistor={newPersistor}>
        <Login />
      </PersistGate>
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

if (document.getElementById("redux-container"))
  ReactDOM.render(
    <Provider {...{ store }}>
      <PersistGate loading={null} persistor={newPersistor}>
        <ReduxComponent />
      </PersistGate>
    </Provider>,
    document.getElementById("redux-container")
  );

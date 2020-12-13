import React from "react";
import ReactDOM from "react-dom";
import Register from "./Register";
import LikeButton from "./LikeButton";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to React!</h1>
        <Register />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";

const Login = () => {
  const firstVariable = "Hello World";

  return (
    <div>
      <form action="/login" method="POST">
        <h1 className="text-center">Sign in</h1>
        <div className="form-group">
          <label>Username</label>
          <input className="form-control" placeholder="Enter username" type="text" name="username" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Enter password"
            type="password"
            name="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import ReactDOM from "react-dom";

const Login = () => {
  const firstVariable = "Hello World";
  return (
    <div>
      <form action="/login" method="POST">
        <h1>Login</h1>
        <input placeholder="Username" type="text" name="username" required />
        <input
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

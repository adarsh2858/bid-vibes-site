import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const Login = () => {
  const firstVariable = "Hello World";

  const submitLoginForm = () => {};

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center">Sign in</h1>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          // await new Promise((r) => setTimeout(r, 2000));
          try {
            const response = await axios({
              method: "post",
              url: "/login",
              data: values,
            });

            toast.success(response.data.message);

            setTimeout(() => {
              window.location = response.data.redirectTo;
            }, 2000);
          } catch (err) {
            toast.error(err.response.data.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                type="text"
                required
              ></Field>
            </div>

            <div className="form-group">
              <Field
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
                required
              ></Field>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <form action="/login" method="POST">
        <h1 className="text-center">Sign in</h1>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            placeholder="Enter username"
            type="text"
            name="username"
            required
          />
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

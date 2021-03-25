import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";

const Login = (props) => {
  console.log(props.showLoggedInInfo);
  console.log(props.showCounterValue);
  const submitLoginForm = async (values) => {
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
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center pt-4">Sign in</h1>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={submitLoginForm}
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
              />
            </div>

            <div className="form-group">
              <Field
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
                required
              />
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
      <button onClick={props.onIncrementCounter}>Increment Counter</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showLoggedInInfo: state.isUserLoggedIn,
    showCounterValue: state.counter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React from "react";
import { Formik } from "formik";

export default class Comments extends React.Component {
  //   handleSubmit = () => {
  //     console.log("Submitting comment form");
  //   };

  render() {
    return (
      <div>
        <Formik
          initialValues={{ username: "", comment: "" }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values));
            setSubmitting(false);
          }}
        >
          {({ handleChange, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <input
                className="form-control m-2"
                placeholder="Enter your username"
                name="username"
                type="text"
                onChange={handleChange}
              />
              <input
                className="form-control m-2"
                placeholder="Enter your comment"
                name="comment"
                type="text"
                onChange={handleChange}
              />
              <button className="btn btn-success" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

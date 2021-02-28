import React from "react";
import { Formik } from "formik";

export default class Comments extends React.Component {
  async handleFormSubmission(values, { setSubmitting, resetForm }) {
    console.log(JSON.stringify(values));
    setSubmitting(false);
    resetForm({});
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{ username: "", comment: "" }}
          onSubmit={this.handleFormSubmission}
        >
          {({ values, handleChange, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <input
                className="form-control m-2"
                placeholder="Enter your username"
                name="username"
                type="text"
                value={values.username || ""}
                onChange={handleChange}
              />
              <input
                className="form-control m-2"
                placeholder="Enter your comment"
                name="comment"
                type="text"
                value={values.comment || ""}
                onChange={handleChange}
              />
              <button
                className="btn btn-success"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

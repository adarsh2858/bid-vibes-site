import React from "react";
import { Formik } from "formik";
import axios from "axios";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  componentDidMount() {
    this.fetchProductId().then(response => {
      this.setState({ productId: response.data.productId});
    })

    this.fetchComments().then((response) => {
      this.setState({ comments: response.data });
    });
  }

  async fetchProductId() {
    return await axios.get(window.location.href, {
      headers: {
        Accept: "application/json"
      }
    });
  }

  async fetchComments() {
    return await axios.get("http://localhost:3000/comments");
  }

  async handleFormSubmission(values, { setSubmitting, resetForm }) {
    // await new Promise((r) => setTimeout(r, 1000));
    values['productId'] = this.state.productId;

    try {
      const response = await axios.post(
        "http://localhost:3000/add-comment",
        values
      );

      this.setState((prevState) => ({
        comments: [...prevState.comments, response.data],
      }));

      setSubmitting(false);

      resetForm({});
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="text-left p-4">
        <h1>Comments</h1>

        {this.state.comments.length > 0 ? (
          <div>
            {this.state.comments.map(({ username, comment }, index) => (
              <div key={username + index}>
                <div className="font-bold">{username}</div>
                <div>{comment}</div>
              </div>
            ))}
          </div>
        ) : null}

        <Formik
          initialValues={{ username: "", comment: "" }}
          onSubmit={this.handleFormSubmission}
        >
          {({ values, handleChange, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                placeholder="Enter your username"
                name="username"
                type="text"
                value={values.username || ""}
                onChange={handleChange}
              />
              <label htmlFor="comment">Comment</label>
              <input
                className="form-control"
                placeholder="Enter your comment"
                name="comment"
                type="text"
                value={values.comment || ""}
                onChange={handleChange}
              />
              <button
                className="btn btn-success mt-4"
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

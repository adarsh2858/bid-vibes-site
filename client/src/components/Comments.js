import React from "react";
import classnames from "classnames";
import { Formik } from "formik";
import axios from "axios";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], showCommentForm: false };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleNewComment = this.handleNewComment.bind(this);
  }

  componentDidMount() {
    this.fetchProductId().then((response) => {
      this.setState({ productId: response.data.productId });

      this.fetchComments().then((response) => {
        this.setState({ comments: response.data });
      });
    });
  }

  async fetchProductId() {
    return await axios.get(window.location.href, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async fetchComments() {
    return await axios.get(
      `http://localhost:3000/product/${this.state.productId}/comments`
    );
  }

  async handleFormSubmission(values, { setSubmitting, resetForm }) {
    // await new Promise((r) => setTimeout(r, 1000));
    values["productId"] = this.state.productId;

    try {
      await axios.post("http://localhost:3000/add-comment", values);

      setSubmitting(false);

      this.fetchComments().then((response) => {
        this.setState({ comments: response.data });
      });

      resetForm({});
    } catch (error) {
      console.error(error);
    }
  }

  async handleNewComment() {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  }

  render() {
    return (
      <div className="text-left p-4 bg-info rounded mt-4">
        <div className="d-flex justify-content-between">
          <h3>Comments</h3>

          <button
            className={classnames("btn btn-success float-right", {
              active: this.state.showCommentForm,
            })}
            onClick={this.handleNewComment}
          >
            Add New Comment
          </button>
        </div>

        <hr />

        {this.state.comments.length > 0 ? (
          <div>
            {this.state.comments.map(({ username, comment }, index) => (
              <div key={username + index}>
                <h6>{username}</h6>
                <p>{comment}</p>
              </div>
            ))}
          </div>
        ) : null}

        {this.state.showCommentForm ? (
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
        ) : null}
      </div>
    );
  }
}

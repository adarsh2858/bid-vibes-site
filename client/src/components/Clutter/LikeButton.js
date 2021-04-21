import React from "react";

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return e(
      "button",
      { className: "btn btn-primary", onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}

export default LikeButton;

import React, { Component } from "react";
import classnames from "classnames";
import "../../../public/css/nav-items.css";

class ScrollBar extends Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
  }

  handleNav = (direction) => {
    if (direction === "left") {
      this.navRef ? (this.navRef.current.scrollLeft -= 200) : null;
    } else {
      this.navRef ? (this.navRef.current.scrollLeft += 200) : null;
    }
  };

  render() {
    return (
      <div className="menu-container container">
        <div>
          <button className="mr-2" onClick={() => this.handleNav("left")}>
            Prev
          </button>
        </div>
        <div
          className={classnames(
            `nav-items ${this.props.className ? this.props.className : ""}`
          )}
          ref={this.navRef}
        >
          {this.props.children}
        </div>
        <div>
          <button
            style={{ marginLeft: "0.5rem" }}
            onClick={() => this.handleNav("right")}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default ScrollBar;

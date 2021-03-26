import React, { Component } from "react";
import "../../public/css/nav-items.css";

class NavBar extends Component {
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
          <button onClick={() => this.handleNav("left")}>Prev</button>
        </div>
        <div className="nav-items" ref={this.navRef}>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#dropdown">Dropdown</a>
          <a href="#radio-button">Radio Button</a>
          <a href="#foo-bar">Foo Bar</a>
          <a href="#blog">Blog</a>
          <a href="#support">Support</a>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#dropdown">Dropdown</a>
          <a href="#radio-button">Radio Button</a>
          <a href="#foo-bar">Foo Bar</a>
          <a href="#blog">Blog</a>
          <a href="#support">Support</a>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#dropdown">Dropdown</a>
          <a href="#radio-button">Radio Button</a>
          <a href="#foo-bar">Foo Bar</a>
          <a href="#blog">Blog</a>
          <a href="#support">Support</a>
        </div>
        <div>
          <button onClick={() => this.handleNav("right")}>Next</button>
        </div>
      </div>
    );
  }
}

export default NavBar;

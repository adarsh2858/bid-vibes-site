import React from "react";

const TopNavBar = () => {
  return (
    <div>
      <nav class="navbar bg-light">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img
              width="100sp"
              class="img-fluid"
              src="images/yelp_camp_logo.jpg"
              alt="Site Logo"
            />
          </a>
          <div class="">
            <a class="m-3" href="/login">
              Login
            </a>
            <a class="m-3" href="/register">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavBar;

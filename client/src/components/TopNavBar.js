import React from "react";

const TopNavBar = ({ isUserLoggedIn }) => {
  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              width="100sp"
              className="img-fluid"
              src="images/yelp_camp_logo.jpg"
              alt="Site Logo"
            />
          </a>
          {!isUserLoggedIn ? (
            <div className="">
              <a className="m-3" href="/login">
                Login
              </a>
              <a className="m-3" href="/register">
                Sign Up
              </a>
            </div>
          ) : (
            <div>Signed in as John Doe</div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default TopNavBar;

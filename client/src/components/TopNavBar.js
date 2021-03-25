import React from "react";
import { connect } from "react-redux";

const TopNavBar = ({
  showLoggedInInfo,
  showCounterValue,
  onLoginButtonClick,
  onIncrementCounter,
  onDecrementCounter,
  onAddition,
  onSubtraction,
  isUserLoggedIn,
}) => {
  return (
    <div>
      {console.log("showLoggedInInfo")}
      {console.log(showLoggedInInfo)}
      {console.log(showCounterValue)}
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
              <button onClick={onLoginButtonClick}>LOG THE USER IN</button>
              <button onClick={onIncrementCounter}>Increment</button>
              <button onClick={onDecrementCounter}>Decrement</button>
              <button onClick={onAddition}>ADD</button>
              <button onClick={onSubtraction}>SUBTRACT</button>
            </div>
          ) : (
            <div>Signed in as John Doe</div>
          )}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showLoggedInInfo: state.isUserLoggedIn,
    showCounterValue: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginButtonClick: () => dispatch({ type: "SWITCH_LOGIN" }),
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCounter: () => dispatch({ type: "DECREMENT" }),
    onAddition: () => dispatch({ type: "ADD", value: 10 }),
    onSubtraction: () => dispatch({ type: "SUBTRACT", value: 5 }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);

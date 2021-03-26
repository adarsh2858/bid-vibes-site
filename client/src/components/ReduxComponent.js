import React from "react";
import { connect } from "react-redux";

const ReduxComponent = ({
  showLoggedInInfo,
  showCounterValue,
  onLoginButtonClick,
  onIncrementCounter,
  onDecrementCounter,
  onAddition,
  onSubtraction,
}) => {
  return (
    <div>
      {console.log("showLoggedInInfo")}
      {console.log(showLoggedInInfo)}
      {console.log(showCounterValue)}
      <h1>Redux Component</h1>
      <div>
        <button onClick={onLoginButtonClick}>LOG THE USER IN</button>
        <button onClick={onIncrementCounter}>Increment</button>
        <button onClick={onDecrementCounter}>Decrement</button>
        <button onClick={onAddition}>ADD</button>
        <button onClick={onSubtraction}>SUBTRACT</button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReduxComponent);

const initialState = {
  isUserLoggedIn: false,
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_LOGIN":
      return {
        ...state,
        isUserLoggedIn: !state.isUserLoggedIn,
      };

    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };

    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1,
      };

    case "ADD":
      return {
        ...state,
        counter: state.counter + action.value,
      };

    case "SUBTRACT":
      return {
        ...state,
        counter: state.counter - action.value,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;

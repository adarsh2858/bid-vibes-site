import * as actionTypes from "./actions";

const initialState = {
  productsList: [],
  filteredProductsList: [],
  isUserLoggedIn: false,
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_LOGIN:
      return {
        ...state,
        isUserLoggedIn: !state.isUserLoggedIn,
      };

    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.value,
      };

    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.value,
      };

    case actionTypes.LOAD_PRODUCTS:
      return {
        ...state,
        productsList: action.payload,
        filteredProductsList: action.payload,
      };

    case actionTypes.FILTER_PRODUCTS:
      return {
        ...state,
        filteredProductsList: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;

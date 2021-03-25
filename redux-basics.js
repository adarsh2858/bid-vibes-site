// import as per nodejs syntax
const redux = require("redux");

// initialize variables
const createStore = redux.createStore;

const initialState = {
  counter: 0,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  if (action.type === "INCREMENT_COUNTER") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  } else if (action.type === "ADD_TO_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  } else return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log("[SUBSCRIPTION] action is dispatched - ");
  console.log(store.getState());
});

// Dispatching Action - type is mandatory in the object
store.dispatch({ type: "INCREMENT_COUNTER" }); // Increment the counter by 1
store.dispatch({ type: "ADD_TO_COUNTER", value: 10 });
console.log(store.getState());

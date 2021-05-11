import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { FILTER_PRODUCTS } from "../../store/actions";

const SearchBar = ({ productsList, filterProucts }) => {
  const inputRef = useRef(null);

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
      handleChange();
    };
  })();

  // useEffect(() => {
  //   inputRef.current.addEventListener("keyup", function (event) {
  //     delay(function (event) {
  //       // alert("Hi, func called");
  // Event param is undefined - error with debouncing
  //       handleChange(event)
  //     }, 1000);
  //   });
  // }, []);

  const handleChange = (event) => {
    const filter = event.target.value.toUpperCase();
    const filteredProducts = productsList.filter((element) => {
      if (element.name.toUpperCase().indexOf(filter) > -1) return element;
    });

    filterProucts(filteredProducts);
  };

  return (
    <div className="container mt-4">
      <label className="m-2">Search for Products</label>
      <input
        type="text"
        className="p-1 m-2 rounded"
        placeholder="Enter product title"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({ productsList: state.productsList });

const mapDispatchToProps = (dispatch) => {
  return {
    // Todo - Change the action type of dispatch to FILTER_PRODUCTS
    filterProucts: (filteredProducts) =>
      dispatch({ type: FILTER_PRODUCTS, payload: filteredProducts }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

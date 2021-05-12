import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FILTER_PRODUCTS } from '../../store/actions';

const SearchBar = ({ productsList, filterProucts }) => {
  let timerId;
  let throttleTimerId;
  const inputRef = useRef(null);

  const handleChange = () => {
    const filter = inputRef.current.value.toUpperCase();
    const filteredProducts = productsList.filter((element) => {
      if (element.name.toUpperCase().indexOf(filter) > -1) return element;
      return '';
    });

    filterProucts(filteredProducts);
  };

  const debounceFunc = ((func, delay) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
  });

  /* eslint-disable */
  const throttleFunc = (func, delay) => {
    if (throttleTimerId) {
      return;
    }

    throttleTimerId = setTimeout(() => {
      func();
      throttleTimerId = undefined;
    }, delay);
  };

  return (
    <div className="container mt-4">
      <label className="m-2" htmlFor={inputRef.current}>
        Search for Products
        <input
          type="text"
          className="p-1 m-2 rounded"
          placeholder="Enter product title"
          onChange={() => {
            // throttleFunc(handleChange, 1000);
            debounceFunc(handleChange, 1000);
          }}
          ref={inputRef}
        />
      </label>
    </div>
  );
};

const mapStateToProps = (state) => ({ productsList: state.productsList });

const mapDispatchToProps = (dispatch) => ({
  filterProucts: (filteredProducts) => dispatch(
    { type: FILTER_PRODUCTS, payload: filteredProducts },
  ),
});

SearchBar.propTypes = () => ({
  productsList: PropTypes.array,
  filterProducts: PropTypes.func,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

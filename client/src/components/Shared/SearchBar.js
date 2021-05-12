import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FILTER_PRODUCTS } from '../../store/actions';

const SearchBar = ({ productsList, filterProucts }) => {
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const filter = event.target.value.toUpperCase();
    const filteredProducts = productsList.filter((element) => {
      if (element.name.toUpperCase().indexOf(filter) > -1) return element;
      return '';
    });

    filterProucts(filteredProducts);
  };

  const delay = (() => {
    let timer = 0;
    return (callback, ms) => {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  useEffect(() => {
    inputRef.current.addEventListener('keyup', () => {
      delay((event) => {
        /* eslint-disable no-console */
        console.log(event.target.value);
        // alert('Hi, func called');// Event param is undefined - error with debouncing
        // handleChange(event)
      }, 1000);
    });
  }, []);

  return (
    <div className="container mt-4">
      <label className="m-2" htmlFor={inputRef.current}>
        Search for Products
        <input
          type="text"
          className="p-1 m-2 rounded"
          placeholder="Enter product title"
          onChange={handleChange}
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

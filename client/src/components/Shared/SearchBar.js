import React, { useEffect, useRef } from "react";

const SearchBar = () => {
  const inputRef = useRef(null);

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
      handleChange();
    };
  })();

  useEffect(() => {
    inputRef.current.addEventListener("keyup", function () {
      delay(function () {
        alert("Hi, func called");
      }, 1000);
    });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="m-2">
      <label className="m-2"> Search Something </label>
      <input
        type="text"
        className="p-1 m-2"
        placeholder="Enter foo bar"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;

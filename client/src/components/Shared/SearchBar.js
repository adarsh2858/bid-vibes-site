import React, { useEffect, useRef } from "react";

const SearchBar = () => {
  const inputRef = useRef(null);
  const ulRef = useRef(null);

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
    // console.log(event.target.value);
    const liElements = ulRef.current.getElementsByTagName('li');

    for (let i = 0; i < liElements.length; i++) {
      const anchorTag = liElements[i].getElementsByTagName('a')[0];
      const textValue = anchorTag.innerText;
      console.log(textValue)
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        liElements[i].style.display = '';
      } else {
        liElements[i].style.display = 'none';
      }
    }
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
      <ul ref={ulRef}>
        <li>
          <a href="#">Adele</a>
        </li>
        <li>
          <a href="#">Agnes</a>
        </li>

        <li>
          <a href="#">Billy</a>
        </li>
        <li>
          <a href="#">Bob</a>
        </li>

        <li>
          <a href="#">Calvin</a>
        </li>
        <li>
          <a href="#">Christina</a>
        </li>
        <li>
          <a href="#">Cindy</a>
        </li>
      </ul>
    </div>
  );
};

export default SearchBar;

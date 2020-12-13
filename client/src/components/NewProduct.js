import React from "react";
import ReactDOM from "react-dom";

const NewProduct = () => {
  return (
    <div>
      <form method="post" action="/products/new">
        <label>Name</label>
        <input type="text" name="name" />
        <label>Description</label>
        <textarea rows="10" name="description" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewProduct;

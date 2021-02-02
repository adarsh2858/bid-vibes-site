import React from "react";

const NewProduct = () => {
  return (
    <div className="p-4">
      <h1 className="text-center">New Product</h1>
      <form method="post" action="/products/new">
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" name="name" required/>
        </div>
          <label>Description</label>
        <div className="form-group">
          <textarea className="form-control" rows="10" name="description" />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default NewProduct;

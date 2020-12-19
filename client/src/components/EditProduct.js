import React from "react";

const EditProduct = (props) => {

  console.log(props);

  return (
    <div className="p-4">
      <form action="/products/:id/edit" method="PUT">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={props.name} />
        </div>
          <label>Description</label>
        <div className="form-group">
          <textarea rows="10" name="description" value={props.description} />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default EditProduct;

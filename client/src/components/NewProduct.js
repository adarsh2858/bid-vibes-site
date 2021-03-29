import React from "react";
import Form from "./Product/Form";

const NewProduct = () => {
  return (
    <div>
      <h1 className="m-4 text-center">New Product Form</h1>
      <Form action="new" />
    </div>
  );
};

export default NewProduct;

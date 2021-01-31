import React, { useEffect, useState } from "react";

const EditProduct = () => {
  const [loadedProduct, setLoadedProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const productInfo = await fetch(window.location.href + "Info");
      const product = await productInfo.json();
      setLoadedProduct(product);
    };
    loadProduct();
  }, []);

  return (
    <div className="p-4">
      {loadedProduct && (
        <form action="edit" method="POST">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" defaultValue={loadedProduct.name} />
          </div>
          <label>Description</label>
          <div className="form-group">
            <textarea
              rows="10"
              name="description"
              defaultValue={loadedProduct.description}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;

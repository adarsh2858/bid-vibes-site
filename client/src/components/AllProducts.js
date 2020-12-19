import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-products")
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        setProductsList(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white rounded pt-4 row">
      {productsList.length > 0
        ? productsList.map((product) => (
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-4"
              key={product.id}
            >
              <div>
                <img
                  className="rounded mb-4"
                  width="300"
                  src="images/best_beach.jpg"
                  alt="Beach Pic"
                />
                <div className="mx-2">
                  <h4 id="header">{product.name}</h4>
                  <p>{product.description}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    (window.location = `/products/${product.id}/show`)
                  }
                >
                  More Info
                </button>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    (window.location = `/products/${product.id}/edit`)
                  }
                >
                  <img width="24" src="images/icon_edit.png" />
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() =>
                    confirm("Are you sure?") &&
                    (window.location = `/products/${product.id}/delete`)
                  }
                >
                  <img width="24" src="images/icon_delete.png" />
                </button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default AllProducts;

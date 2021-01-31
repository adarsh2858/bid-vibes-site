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
    <div className="d-lg-flex bg-white">
      {productsList.length > 0
        ? productsList.map((product) => (
            <div key={product.id}>
              <div className="m-3">
                <img width="300" src={product.image} alt="Product Image" />
                <h4 id="header">{product.name}</h4>
                <p>{product.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary m-2"
                  onClick={() =>
                    (window.location = `/products/${product.id}/show`)
                  }
                >
                  More Info
                </button>
                <button
                  className="m-2 btn btn-success"
                  onClick={() =>
                    (window.location = `/products/${product.id}/edit`)
                  }
                >
                  <img width="24" src="images/icon_edit.png" />
                </button>
                <button
                  className="m-2 btn btn-danger"
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

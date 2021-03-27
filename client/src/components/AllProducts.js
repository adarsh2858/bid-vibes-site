import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";

const AllProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const bannerRef = useRef(null);

  const handleAddNewProductButtonClick = async () => {
    try {
      // Confirm whether the status code return from the backend is not 4xx
      await axios.get("/products/new");

      window.location = "/products/new";
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleEditButtonClick = async (productId) => {
    try {
      const response = await axios.get(`/products/${productId}/edit`);

      if (response.status === 200)
        window.location = `/products/${productId}/edit`;
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleDeleteButtonClick = async (productId) => {
    try {
      if (confirm("Are you sure?")) {
        const response = await axios.get(`/products/${productId}/delete`);

        if (response.status === 200)
          window.location = `/products/${productId}/delete`;
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

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
    <div className="container">
      <ToastContainer />

      <div id="banner" ref={bannerRef} className="p-5 my-4">
        <h1>Welcome to Adarsh Products!</h1>
        <button
          className="btn btn-dark mt-3"
          onClick={handleAddNewProductButtonClick}
        >
          Add New Product
        </button>
      </div>

      <NavBar className="d-flex flex-row">
        {productsList.length > 0
          ? productsList.map((product) => (
              <div
                className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-4"
                key={product.id}
              >
                <div className="rounded p-4 bg-white">
                  <div>
                    <img
                      className="rounded mb-4 img-fluid"
                      width="300"
                      src={product.image}
                      alt="Product Image"
                    />
                    <div className="mx-2">
                      <h4 id="header">{product.name}</h4>
                      <p
                        style={{
                          whiteSpace: "normal",
                          // 'whiteSpace': 'nowrap',
                          overflow: "hidden",
                          "textOverflow": "ellipsis",
                          "maxWidth": "200px",
                          "maxHeight": "200px",
                        }}
                      >
                        {product.description}
                      </p>
                      {/* <p>{product.description}</p> */}
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-info form-control mb-2"
                      onClick={() =>
                        (window.location = `/products/${product.id}/show`)
                      }
                    >
                      More Info
                    </button>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-warning px-5"
                        onClick={() => handleEditButtonClick(product.id)}
                      >
                        <img width="24" src="images/icon_edit.png" />
                      </button>
                      <button
                        className="btn btn-danger px-5"
                        onClick={() => handleDeleteButtonClick(product.id)}
                      >
                        <img width="24" src="images/icon_delete.png" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </NavBar>
      <footer className="m-2 p-2 text-center">
        Copyright Adarsh Inc. 2021
      </footer>
    </div>
  );
};

export default AllProducts;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [productsList, setProductsList] = useState([]);

  const handleAddNewProductButtonClick = async () => {
    try {
      // Confirm whether the status code return from the backend is not 4xx
      await axios.get("/products/new");

      window.location = "/products/new";
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

      <div className="p-5 my-4">
        <h1>Welcome to Adarsh Products!</h1>
        <button
          className="btn btn-primary mt-3"
          onClick={handleAddNewProductButtonClick}
        >
          Add New Product
        </button>
      </div>

      <div className="row">
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
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary form-control mb-2"
                      onClick={() =>
                        (window.location = `/products/${product.id}/show`)
                      }
                    >
                      More Info
                    </button>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-success px-5"
                        onClick={() =>
                          (window.location = `/products/${product.id}/edit`)
                        }
                      >
                        <img width="24" src="images/icon_edit.png" />
                      </button>
                      <button
                        className="btn btn-danger px-5"
                        onClick={() =>
                          confirm("Are you sure?") &&
                          (window.location = `/products/${product.id}/delete`)
                        }
                      >
                        <img width="24" src="images/icon_delete.png" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AllProducts;

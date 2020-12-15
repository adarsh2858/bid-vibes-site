import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-products")
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        console.log(products);
        setProductsList(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-success">
      {productsList.length > 0
        ? productsList.map((product) => (
            <div key={product.id}>
              <img width="300" src="images/best_beach.jpg" alt="Beach Pic" />
              <h4 id="header">{product.name}</h4>
              <p>{product.description}</p>
              <button className="btn btn-primary">More Info</button>
            </div>
          ))
        : null}
    </div>
  );
};

export default AllProducts;

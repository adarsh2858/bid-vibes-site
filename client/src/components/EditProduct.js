import React, { useEffect, useState } from "react";

const EditProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loadedProduct, setLoadedProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const productInfo = await fetch(window.location.href + "Info");
      const product = await productInfo.json();
      setLoadedProduct(product);
    };
    loadProduct();
  }, []);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile);

    const imageInfo = await fetch("http://localhost:3000/image-upload", {
      method: "POST",
      body: formData,
    });

    const image = await imageInfo.json();
    setUploadedImage(image);
  };

  useEffect(() => {
    if (selectedFile) onFileUpload();
  }, [selectedFile]);

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
          <div className="form-group">
            <input name="image" type="file" onChange={onFileChange} />
            {uploadedImage && <img className="img-fluid" src={uploadedImage.secure_url} alt="Product Image" />}
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;

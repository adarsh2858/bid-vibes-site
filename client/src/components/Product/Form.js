import React, { useEffect, useRef, useState } from 'react';
import Spinner from 'react-bootstrap';

const ProductForm = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({ secure_url: '' });
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (props.action !== 'new') {
      const loadProduct = async () => {
        const productInfo = await fetch(`${window.location.href}Info`);
        const product = await productInfo.json();
        setLoadedProduct(product);

        const image = { secure_url: product.image || '' };
        setUploadedImage(image);
      };
      loadProduct();
    } else {
      setLoadedProduct({
        name: '',
        description: '',
        image: '',
      });
    }
  }, []);

  const onFileChange = (event) => {
    setIsButtonDisabled(true);
    setShowSpinner(true);
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('myFile', selectedFile);

    const imageInfo = await fetch('http://localhost:3000/image-upload', {
      method: 'POST',
      body: formData,
    });

    const image = await imageInfo.json();
    setUploadedImage(image);
    setIsButtonDisabled(false);
    setShowSpinner(false);
  };

  useEffect(() => {
    if (selectedFile) onFileUpload();
  }, [selectedFile]);

  const handleChange = (event) => {
    setUploadedImage({ secure_url: event.target.value });
  };

  useEffect(() => {
    if (submitButtonRef.current) {
      submitButtonRef.current.classList.add('btn');
      submitButtonRef.current.classList.add('btn-success');
    }
  }, [loadedProduct, submitButtonRef.current]);

  return (
    <div className="p-4 relative">
      {loadedProduct && (
        <form action={props.action} method="POST">
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              defaultValue={loadedProduct.name}
            />
          </div>
          <label>Description</label>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="10"
              name="description"
              defaultValue={loadedProduct.description}
            />
          </div>
          <div className="form-group">
            <input type="file" onChange={onFileChange} />

            {showSpinner ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Spinner animation="border" variant="success" />
              </div>
            ) : null}

            <input
              name="image"
              type="text"
              value={uploadedImage.secure_url}
              onChange={handleChange}
              placeholder="Image URL"
            />
            {uploadedImage.secure_url !== '' && (
              <img
                width="300"
                className="img-fluid block m-4"
                src={uploadedImage.secure_url}
                alt="Product"
              />
            )}
          </div>
          <button type="submit" ref={submitButtonRef} disabled={isButtonDisabled}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductForm;

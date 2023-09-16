import { useEffect, useState } from "react";
import "./App.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function App() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, []);

  const handleModalClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  return (
    <div className="App">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          handleModalClick={handleModalClick}
        />
      ))}

      {/* Render the modal outside the Product component */}
      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        products={products}
        id={selectedProductId}
        setShowModal={setShowModal}
      />
    </div>
  );
}

function Product({ product, handleModalClick }) {
  return (
    <div className="product-container">
      <div className="product-images">
        <img
          className="product-image"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="product-name">{product.title}</div>

      <div className="product-price">
        <p className="red">$ {(product.price * 1.5).toFixed(2)}</p>
        <p className="green">$ {product.price}</p>
      </div>

      <div className="btn-area">
        <Button onClick={() => handleModalClick(product.id)}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

function ProductModal(props) {
  let products=props.products;
  let id=props.id;
  let setShowModal=props.setShowModal;
  const [currentProduct] = products.filter((item) => item.id === id);
  console.log(currentProduct);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show
      onHide={() => setShowModal(false)}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Size and Quantity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-container">
          <div className="product-images">
            <img
              className="product-image"
              src={currentProduct.image}
              alt={currentProduct.title}
            />
          </div>

          <div className="product-name">{currentProduct.title}</div>

          <div className="product-price">
            <p className="red">$ {(currentProduct.price * 1.5).toFixed(2)}</p>
            <p className="green">$ {currentProduct.price}</p>
          </div>

          <div className="btn-area">
            <Button>Add to Cart</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function App() {
  const [products, setProducts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      {products?.map((product) => (
        <Product
          key={product.id}
          product={product}
          setShowModal={setShowModal}
          setSelectedProductId={setSelectedProductId}
          selectedProductId={selectedProductId}
        />
      ))}

      {/* Render the modal at the root level */}
      <MyVerticallyCenteredModal
        show={showModal}
        onHide={() => setShowModal(false)}
        products={products}
        id={selectedProductId}
      />
    </div>
  );
}

function Product({
  product,
  setShowModal,
  setSelectedProductId,
  selectedProductId,
}) {
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
        <Button
          onClick={() => {
            setShowModal(true);
            setSelectedProductId(product.id);
            console.log(selectedProductId);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const productArray = props.products || [];
  let productId = props.id; // id of the selected product
  let selectedProduct = productArray?.find(
    (product) => product.id === productId
  ); // find the selected product

  if (!selectedProduct) {
    return null;
  } else
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
                src={selectedProduct.image}
                alt={selectedProduct.title}
              />
            </div>

            <div className="product-name">{selectedProduct.title}</div>

            <div className="product-price">
              <p className="red">
                $ {(selectedProduct.price * 1.5).toFixed(2)}
              </p>
              <p className="green">$ {selectedProduct.price}</p>
            </div>

            
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
          <div className="btn-area">
              <Button onClick={props.onHide}>Add to Cart</Button>
            </div>
        </Modal.Footer>
      </Modal>
    );
}

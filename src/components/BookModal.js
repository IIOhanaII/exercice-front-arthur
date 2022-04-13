import React from "react";
import "./BookModal.css";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, addBookToCart } from "../features/cartSlice";

export const BookModal = ({ isModalOpen, toggle, modalBook }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  let isBookInCart = cart.find((bookInCart) => bookInCart.isbn === modalBook.isbn);

  const addToCart = () => {
    if (isBookInCart) alert('Ce livre est déjà dans votre panier')
    else {
      let quantityInCart = 1;
      dispatch(addBookToCart({ ...modalBook, quantityInCart }));
    }
  };

  const closeBtn = (
    <Button color="danger" size="sm" className="close" onClick={toggle}>
      <FontAwesomeIcon icon={["fas", "times"]} size="lg" />
    </Button>
  );
  return (
    <React.Fragment>
      {/* On Desktop, render this modal */}
      {window.screen.width > 1024 && (
        <Modal isOpen={isModalOpen} toggle={toggle} size="xl" centered>
          <ModalBody
            style={{
              height: "25rem",
            }}
            className="p-0 d-flex flex-column flex-lg-row"
          >
            <img
              src={modalBook.cover}
              alt={`Couverture du livre intitulé ${modalBook.title}`}
              className="book-cover"
            />
            <div
              className="p-3 d-flex flex-column"
              style={{
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-primary">{modalBook.title}</h2>
                <Button
                  color="success"
                  size="sm"
                  style={{ width: "39px", height: "31px" }}
                  onClick={() => addToCart()}
                >
                  <FontAwesomeIcon icon={["fas", "cart-plus"]} size="lg" />
                </Button>
              </div>
              <h5 className="text-secondary">{modalBook.price}€</h5>
              <p>{modalBook.synopsis}</p>
            </div>
          </ModalBody>
        </Modal>
      )}
      {/* On Mobile, render this modal */}
      {window.screen.width <= 1024 && (
        <Modal isOpen={isModalOpen} toggle={toggle} centered scrollable>
          <ModalHeader toggle={toggle} close={closeBtn}>
            {modalBook.title}
          </ModalHeader>
          <ModalBody className="p-0">
            <div className="d-flex flex-column">
              <img
                src={modalBook.cover}
                alt={`Couverture du livre intitulé ${modalBook.title}`}
                style={{ width: "8.16rem", height: "12rem" }}
                className="d-flex align-self-center"
              />
              <div className="d-flex justify-content-center align-items-center my-2">
                <h5 className="text-secondary mb-0 me-4">{modalBook.price}€</h5>
                <Button
                  color="success"
                  size="sm"
                  onClick={() => dispatch(addBookToCart(modalBook))}
                >
                  <FontAwesomeIcon icon={["fas", "cart-plus"]} size="lg" />
                </Button>
              </div>
              <p className="ms-3">{modalBook.synopsis}</p>
            </div>
          </ModalBody>
        </Modal>
      )}
    </React.Fragment>
  );
};

import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addBookToCart } from "../features/cart/cartSlice";

export const DesktopModal = ({ isModalOpen, toggle, modalBook }) => {
  const dispatch = useDispatch();
  return (
    <Modal isOpen={isModalOpen} toggle={toggle} size="xl" centered scrollable>
      <ModalBody
        style={{
          height: "25rem",
        }}
        className="p-0 d-flex flex-column flex-lg-row"
      >
        <img
          src={modalBook.cover}
          alt={`Couverture du livre intitulé ${modalBook.title}`}
          className="img-sizing"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary">{modalBook.title}</h2>
            <Button
              color="success"
              size="sm"
              style={{ width: "39px", height: "31px" }}
              onClick={() => dispatch(addBookToCart(modalBook))}
            >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} size="lg" />
            </Button>
          </div>
          <h5 className="text-secondary">{modalBook.price}€</h5>
          <p>{modalBook.synopsis}</p>
        </div>
      </ModalBody>
    </Modal>
  );
};

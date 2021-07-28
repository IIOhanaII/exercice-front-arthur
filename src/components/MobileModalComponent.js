import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addBookToCart } from "../features/cart/cartSlice";

export const MobileModal = ({ isModalOpen, toggle, modalBook }) => {
  const dispatch = useDispatch();
  const closeBtn = (
    <Button color="danger" size="sm" className="close" onClick={toggle}>
      <FontAwesomeIcon icon={["fas", "times"]} size="lg" />
    </Button>
  );
  return (
    <Modal isOpen={isModalOpen} toggle={toggle} size="xs" centered scrollable>
      <ModalHeader toggle={toggle} close={closeBtn}>
        {modalBook.title}
      </ModalHeader>
      <ModalBody style={{ padding: 0 }}>
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
  );
};

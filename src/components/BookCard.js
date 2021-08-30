import React from "react";
import "./BookCard.css";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { addBookToCart } from "../features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookModal } from "./BookModal";

export const BookCard = ({ book, modal, toggleModal, modalBook }) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ width: "17rem" }} className="border-0 me-sm-4">
      <CardImg
        src={book.cover}
        alt={`Couverture du livre intitulé ${book.title}`}
        style={{ height: "25rem" }}
        onClick={(e) => toggleModal(book)}
      />
      <CardBody className="px-0 pb-4">
        <CardTitle tag="h5" onClick={(e) => toggleModal(book)}>
          {book.title}{" "}
        </CardTitle>
        <CardSubtitle tag="h6">{book.price}€</CardSubtitle>
        <div className="d-flex justify-content-start mt-2">
          <Button
            color="primary"
            size="sm"
            className="me-2"
            onClick={(e) => toggleModal(book)}
          >
            <FontAwesomeIcon icon={["fas", "info"]} size="lg" />
          </Button>
          <BookModal
            isModalOpen={modal}
            toggle={toggleModal}
            modalBook={modalBook}
          />
          <Button
            color="success"
            size="sm"
            onClick={() => dispatch(addBookToCart(book))}
          >
            <FontAwesomeIcon icon={["fas", "cart-plus"]} size="lg" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

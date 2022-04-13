import React, { useState } from "react";
import "./BookCard.css";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, addBookToCart } from "../features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookModal } from "./BookModal";

export const BookCard = ({ book, modal, toggleModal, modalBook }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const [bookQuantity, setBookQuantity] = useState(0);

  let isBookInCart = cart.find((bookInCart) => bookInCart.isbn === book.isbn);
  let bookQuantityInStock = isBookInCart
    ? book.quantity - isBookInCart.quantityInCart
    : book.quantity;
  let bookQuantityInCart = isBookInCart ? isBookInCart.quantityInCart : null;

  const quantityMinus = () => {
    if (bookQuantity === 0) {
      return;
    } else {
      setBookQuantity(bookQuantity - 1);
    }
  };

  const quantityPlus = () => {
    console.log(book);
    if (bookQuantity >= bookQuantityInStock) {
      alert(
        "Désolé mais nous ne disposons que de " +
          book.quantity +
          " '" +
          book.title +
          "' en stock"
      );
    } else {
      setBookQuantity(bookQuantity + 1);
    }
  };

  const changeBookQuantity = (e) => {
    const inputValue = e.target.value; 
    if (inputValue < 0) {
      setBookQuantity("");
      e.target.blur();
      alert("Veuillez bien entrer un nombre positif");
    } else if (inputValue > bookQuantityInStock) {
      alert(
        "Désolé mais nous ne disposons que de " +
          book.quantity +
          " '" +
          book.title +
          "' en stock"
      );
      setBookQuantity(bookQuantityInStock);
    } else if (inputValue === "" || inputValue === "0") {
      setBookQuantity("");
    }
    else {
      setBookQuantity(Number(inputValue));
    }
  };

  const addToCart = () => {
    let quantityInCart = 0;
    if (isBookInCart) {
      if (bookQuantity === 0) {
        quantityInCart = bookQuantityInCart + 1;
      }
      else quantityInCart = bookQuantityInCart + bookQuantity;
    }
    else {
      if (bookQuantity === 0) {
        quantityInCart = 1;
      }
      else quantityInCart = bookQuantity;
    }
    dispatch(addBookToCart({ ...book, quantityInCart }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addToCart();
      setBookQuantity("");
    }
  };

  const handleClick = () => {
    if (bookQuantity === 0) setBookQuantity("");
  };

  const handleBlur = () => {
    if (bookQuantity === "") setBookQuantity(0);
  };

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
        {isBookInCart ? (
          <div className="d-flex justify-content-between">
            <CardSubtitle tag="h6">{book.price}€</CardSubtitle>
            <CardSubtitle tag="h6" className="me-3">
              Dans le panier : {bookQuantityInCart}
            </CardSubtitle>
          </div>
        ) : (
          <CardSubtitle tag="h6">{book.price}€</CardSubtitle>
        )}
        <div className="d-flex justify-content-between mt-2">
          <div>
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
              onClick={() => {
                addToCart();
                setBookQuantity(0);
              }}
            >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} size="lg" />
            </Button>
          </div>
          <div style={{ maxWidth: "40%" }} className="me-2">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button
                  onClick={(e) => quantityMinus()}
                  color="primary"
                  size="sm"
                >
                  <FontAwesomeIcon icon={["fas", "minus"]} />
                </Button>
              </InputGroupAddon>
              <Input
                id="quantityToCart"
                type="number"
                name="quantityToCart"
                value={bookQuantity}
                onChange={changeBookQuantity}
                onClick={handleClick}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                bsSize="sm"
                className="text-center"
              />
              <InputGroupAddon addonType="append">
                <Button
                  onClick={(e) => quantityPlus()}
                  color="primary"
                  size="sm"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={["fas", "plus"]} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

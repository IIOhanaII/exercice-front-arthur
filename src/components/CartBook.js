import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  quantityMinusInCart,
  quantityPlusInCart,
  setQuantityInCart,
} from "../features/cartSlice";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CartBook = ({ book, handleOnDelete }) => {
  const dispatch = useDispatch();

  const [bookQuantityInCart, setBookQuantityInCart] = useState(
    book.quantityInCart
  );

  const changeBookQuantity = (e) => {
    const inputValue = e.target.value;

    if (inputValue < 0) {
      setBookQuantityInCart("");
      e.target.blur();
      alert("Veuillez bien entrer un nombre positif");
    } else if (inputValue > book.quantity) {
      alert(
        "Désolé mais nous ne disposons que de " +
          book.quantity +
          " '" +
          book.title +
          "' en stock"
      );
      setBookQuantityInCart(book.quantity);
    } else if (inputValue === "") {
      setBookQuantityInCart("");
    } else if (inputValue === "0") {
        alert("Veuillez cliquer sur la corbeille afin de supprimer cet article de votres panier");
        setBookQuantityInCart(1);
    } else {
      setBookQuantityInCart(Number(inputValue));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(
        setQuantityInCart({ ...book, newQuantityInCart: bookQuantityInCart })
      );
      setBookQuantityInCart("");
    }
  };

  const handleClick = () => {
    if (bookQuantityInCart === 0) setBookQuantityInCart("");
  };

  const handleBlur = () => {
    dispatch(
      setQuantityInCart({ ...book, newQuantityInCart: bookQuantityInCart })
    );
  };

  return (
    <div style={{ height: "12rem" }} className="d-flex p-0 mt-4">
      <img
        src={book.cover}
        alt={`Couverture du livre intitulé ${book.title}`}
        style={{ width: "8.16rem", height: "12rem" }}
      />
      <div className="d-flex flex-column justify-content-evenly ms-2">
        <h3 className="text-primary">{book.title}</h3>
        <h4 className="text-secondary">{book.price}€</h4>
        <div style={{ maxWidth: "25%" }} className="me-2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                onClick={(e) => dispatch(quantityMinusInCart(book))}
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
              value={bookQuantityInCart}
              onChange={changeBookQuantity}
              onClick={handleClick}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              bsSize="sm"
              className="text-center"
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={(e) => dispatch(quantityPlusInCart(book))}
                color="primary"
                size="sm"
                className="me-2"
              >
                <FontAwesomeIcon icon={["fas", "plus"]} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <h5 className="text-success">En stock</h5>
        <div>
          <Button color="danger" size="sm" onClick={() => handleOnDelete(book)}>
            <FontAwesomeIcon icon={["fas", "trash-alt"]} size="lg" />
          </Button>
        </div>
      </div>
    </div>
  );
};

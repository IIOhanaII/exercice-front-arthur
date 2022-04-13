import React, { useState, useEffect } from "react";
import { CartBook } from "./CartBook";
import { Button, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, removeBookFromCart } from "../features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade } from "react-animation-components";
import { computeCartTotalValue } from "../utilities/cartUtilities";
import { v4 as uuidv4 } from "uuid";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const [cartTotalValue, setCartTotalValue] = useState(0);

  const handleOnDelete = (book) => {
    dispatch(removeBookFromCart(book));
    // Compute the new cart total value
    setCartTotalValue(computeCartTotalValue(cart));
  };

  useEffect(() => {
    // Compute the cart total value as soon as everything else have been loaded
    if (cart.length !== 0) {
      console.log(cart);
      setCartTotalValue(computeCartTotalValue(cart));
    }
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="mt-5 text-center">Votre panier est actuellement vide</div>
    );
  } else {
    return (
      <Container>
        {/* Display all the books which have been added to the cart */}
        {cart.map((book) => (
          <CartBook
            book={book}
            handleOnDelete={handleOnDelete}
            key={uuidv4()}
          />
        ))}
        {/* A table which displays the discounted cart total value */}
        <Fade in duration={700} timingFn="ease-in-out">
          <h3 className="mt-4 text-center text-primary">
            Total : {cartTotalValue}€
          </h3>
          <div className="text-center my-4">
            <Button color="primary" className="me-4" href="/bookstore">
              <FontAwesomeIcon icon={["fas", "book"]} size="lg" />
            </Button>
            <Button color="success" href="/purchases">
              <FontAwesomeIcon icon={["fas", "cash-register"]} size="lg" />
            </Button>
          </div>
        </Fade>
      </Container>
    );
  }
};

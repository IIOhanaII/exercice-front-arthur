import React, { useState, useEffect } from "react";
import { Button, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, removeBookFromCart } from "../features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade } from "react-animation-components";
import { v4 as uuidv4 } from "uuid";
import { computeCartTotalValue } from "../utilities/cartUtilities";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const [cartTotalValue, setCartTotalValue] = useState(null);

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
          <Fade in duration={500} timingFn="ease-in-out" key={uuidv4()}>
            <div style={{ height: "12rem" }} className="d-flex p-0 mt-4">
              <img
                src={book.cover}
                alt={`Couverture du livre intitulé ${book.title}`}
                style={{ width: "8.16rem", height: "12rem" }}
              />
              <div className="d-flex flex-column justify-content-evenly ms-2">
                <h3 className="text-primary">{book.title}</h3>
                <h4 className="text-secondary">{book.price}€</h4>
                <h5 className="text-success">En stock</h5>
                <div>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleOnDelete(book)}
                  >
                    <FontAwesomeIcon icon={["fas", "trash-alt"]} size="lg" />
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
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

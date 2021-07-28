import React, { useState, useEffect } from "react";
import { Button, Table, Spinner } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, removeBookFromCart } from "../features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade } from "react-animation-components";
import { v4 as uuidv4 } from "uuid";
import {
  computeDiscountedCartTotalValue,
  computeCartTotalValue,
  getBestOffer,
} from "../utilities/cartUtilities";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const [error, setError] = useState(false);
  const [isBestOfferLoaded, setIsBestOfferLoaded] = useState(false);
  const [bestOffer, setBestOffer] = useState(null);
  const [cartTotalValue, setCartTotalValue] = useState(null);
  const [discountedCartTotalValue, setDiscountedCartTotalValue] =
    useState(null);

  const loadBestOffer = () => {
    // Chain each book isbn
    const offersUrlParameter = cart.map((book) => book.isbn).join(",");
    console.log(offersUrlParameter);
    fetch(
      "https://henri-potier.techx.fr/books/" +
        offersUrlParameter +
        "/commercialOffers"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setBestOffer(getBestOffer(cartTotalValue, result));
          setIsBestOfferLoaded(true);
        },
        (error) => {
          setIsBestOfferLoaded(true);
          setError(true);
        }
      );
  };

  const handleOnDelete = (book) => {
    dispatch(removeBookFromCart(book));

    // Compute the new discounted cart total value
    if (cart.length >= 2) {
      setCartTotalValue(computeCartTotalValue(cart));
      loadBestOffer();
      setDiscountedCartTotalValue(
        computeDiscountedCartTotalValue(cartTotalValue, bestOffer)
      );
    }
  };

  useEffect(() => {
    // Compute the discounted cart total value as soon as everything else have been loaded
    if (cart.length !== 0) {
      console.log(cart);
      setCartTotalValue(computeCartTotalValue(cart));
      loadBestOffer();
      setDiscountedCartTotalValue(
        computeDiscountedCartTotalValue(cartTotalValue, bestOffer)
      );
    }
  });

  if (cart.length === 0) {
    return (
      <div className="mt-5 text-center">Votre panier est actuellement vide</div>
    );
  } else if (error) {
    return (
      <div className="mt-5 text-center">
        Un problème est survenu et nous en sommes désolés, veuillez bien s'il
        vous plaît rafraîchir la page ou revenir plus tard
      </div>
    );
  } else if (!isBestOfferLoaded) {
    return (
      <div className="mt-5 text-center">
        <Spinner
          style={{ animationDuration: "1.25s" }}
          type="grow"
          color="primary"
        />
      </div>
    );
  } else {
    return (
      <div className="container">
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
          <Table borderless responsive className="mt-4" style={{ width: 250 }}>
            <tbody className="text-end">
              <tr className="text-dark">
                <td>Total sans remise :</td>
                <td>{cartTotalValue}€</td>
              </tr>
              <tr className="text-primary">
                <td>Remise :</td>
                <td>-{bestOffer}€</td>
              </tr>
              <tr className="text-primary">
                <td>Total :</td>
                <td>{discountedCartTotalValue}€</td>
              </tr>
            </tbody>
          </Table>
        </Fade>
      </div>
    );
  }
};

export default Cart;

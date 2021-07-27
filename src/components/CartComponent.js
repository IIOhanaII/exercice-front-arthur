import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, deleteBookFromCart } from "../features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          const highestValueFromOffers = Math.max.apply(
            Math,
            result.offers.map((offer) => offer.value)
          );
          setBestOffer(highestValueFromOffers);
          setIsBestOfferLoaded(true);
        },
        (error) => {
          setIsBestOfferLoaded(true);
          setError(true);
        }
      );
  };

  const computeCartTotalValue = () => {
    const cartTotalValueResult = cart
      .map((book) => book.price)
      .reduce((a, b) => a + b, 0);
    setCartTotalValue(cartTotalValueResult);
  };

  const computeDiscountedCartTotalValue = () => {
    const discountedCartTotalValueResult = cartTotalValue - bestOffer;
    setDiscountedCartTotalValue(discountedCartTotalValueResult);
  };

  const handleOnDelete = (book) => {
    dispatch(deleteBookFromCart(book));

    // Compute the new discounted cart total value
    if (cart.length >= 2) {
      loadBestOffer();
      computeCartTotalValue();
      computeDiscountedCartTotalValue();
    }
  };

  useEffect(() => {
    // Compute the discounted cart total value as soon as everything else have been loaded
    if (cart.length !== 0) {
      loadBestOffer();
      computeCartTotalValue();
      computeDiscountedCartTotalValue();
    }
  });

  if (cart.length === 0) {
    return <div>Votre panier est actuellement vide</div>;
  } else if (error) {
    return (
      <div>
        Un problème est survenu et nous en sommes désolés, veuillez bien s'il
        vous plaît rafraîchir la page ou revenir plus tard
      </div>
    );
  } else if (!isBestOfferLoaded) {
    return <div>Chargement…</div>;
  } else {
    return (
      <div className="container">
        {cart.map((book) => (
          <div
            key={book.isbn}
            style={{
              padding: "0",
              height: "12rem",
              display: "flex",
            }}
            className="mt-4"
          >
            <img
              src={book.cover}
              alt={`Couverture du livre intitulé ${book.title}`}
              style={{ width: "8.16rem", height: "12rem" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
              className="ms-2"
            >
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
        ))}
        <div>Coût total de votre panier: {cartTotalValue}€</div>
        <div>Avec notre meilleure offre commerciale de {bestOffer}€</div>
        <div>
          Le coût total de votre panier est désormais de{" "}
          {discountedCartTotalValue}€
        </div>
      </div>
    );
  }
};

export default Cart;

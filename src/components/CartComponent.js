import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, deleteBookFromCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const [offerUrlParameter, setofferUrlParameter] = useState(
    cart.map((book) => book.isbn).join(",")
  );
  const [error, setError] = useState(false);
  const [isOfferLoaded, setIsOfferLoaded] = useState(false);
  const [offer, setOffer] = useState({});

  const loadOffer = () => {
    console.log(offerUrlParameter);
    fetch(
      "https://henri-potier.techx.fr/books/" +
        offerUrlParameter +
        "/commercialOffers"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsOfferLoaded(true);
          setOffer(result);
        },
        (error) => {
          setIsOfferLoaded(true);
          setError(true);
        }
      );
  };

  useEffect(() => {
    // Get the offer on books added to the cart as soon as everything else have been loaded
    if (cart.length !== 0) loadOffer();
  }, []);

  if (cart.length === 0) {
    return <div>Votre panier est actuellement vide</div>;
  } else if (error) {
    return (
      <div>
        Un problème est survenu et nous en sommes désolés, veuillez bien s'il
        vous plaît rafraîchir la page ou revenir plus tard
      </div>
    );
  } else if (!isOfferLoaded) {
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
                  color="link"
                  size="sm"
                  style={{ fontSize: "1rem" }}
                  className="ps-0"
                  onClick={() => dispatch(deleteBookFromCart(book))}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Cart;

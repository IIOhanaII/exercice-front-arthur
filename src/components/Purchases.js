import React from "react";
import { Button, Container, Table } from "reactstrap";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cartSlice";
import { computeCartTotalValue } from "../utilities/cartUtilities";

export const Purchases = () => {
  const cart = useSelector(selectCart);
  const booksInCart = cart.map((book) => (
    <tr>
      <th scope="row">{book.title}</th>
      <td>{book.price}€</td>
    </tr>
  ));
  const totalPrice = computeCartTotalValue(cart);
  return (
    <Container>
      <h1 className="text-primary text-center my-3">Votre commande</h1>

      <h3 className="my-4 py-3 text-primary text-center">
        Récapitulatif de vos achats
      </h3>
      <Table responsive hover>
        <tbody>
          {booksInCart}
          {totalPrice >= 50 ? (
            <React.Fragment>
              <tr>
                <th scope="row">Frais de livraison</th>
                <td className="text-info">Offerts</td>
              </tr>
              <tr>
                <th scope="row">Total avec les frais de livraison</th>
                <td className="text-info">{totalPrice}€</td>
              </tr>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <tr>
                <th scope="row">
                  Frais de livraison (offerts à partir de 50€ d'achats)
                </th>
                <td>2.99€</td>
              </tr>
              <tr>
                <th scope="row">Total avec les frais de livraison</th>
                <td className="text-info">{totalPrice + 2.99}€</td>
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </Table>

      <div className="text-center my-4">
        <Button color="primary" size="lg" className="me-4" href="/bookstore">
          Reprendre mes achats
        </Button>
        <Button color="warning" size="lg" className="me-4" href="/cart">
          Revenir au panier
        </Button>
        <Button color="success" size="lg" className="me-4" href="/delivery">
          Continuer ma commande
        </Button>
      </div>
    </Container>
  );
};

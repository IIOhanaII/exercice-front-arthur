import React from "react";
import { Button, Container, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <h4 className="my-3 text-primary text-center">Vos achats</h4>
      <Table responsive>
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
        <Button color="primary" className="me-4" href="/bookstore">
          <FontAwesomeIcon icon={["fas", "book"]} size="lg" />
        </Button>
        <Button
          style={{ backgroundColor: "#fb8500" }}
          className="me-4 text-light"
          href="/cart"
        >
          <FontAwesomeIcon icon={["fas", "shopping-cart"]} size="lg" />
        </Button>
        <Button color="success" className="me-4" href="/delivery">
          <FontAwesomeIcon icon={["fas", "check"]} size="lg" />
        </Button>
      </div>
    </Container>
  );
};

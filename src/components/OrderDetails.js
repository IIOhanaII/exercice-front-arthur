import React from "react";
import { Button, Container, Table } from "reactstrap";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cartSlice";
import { selectDelivery } from "../features/deliverySlice";
import { computeCartTotalValue } from "../utilities/cartUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OrderDetails = () => {
  const cart = useSelector(selectCart);
  const totalPrice = computeCartTotalValue(cart);
  const booksInCart = cart.map((book) => (
    <tr>
      <th scope="row">{book.title}</th>
      <td>{book.price}€</td>
    </tr>
  ));
  const deliveryInformation = useSelector(selectDelivery);
  return (
    <Container>
      <h3 className="text-primary text-center my-4">Votre commande</h3>

      <h4 className="mt-3 mb-2 text-primary text-center">Achats</h4>
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
      <h4 className="my-3 text-primary text-center">
        Informations de livraison
      </h4>
      <Table responsive>
        <tbody>
          <tr>
            <th scope="row">Nom</th>
            <td>
              {deliveryInformation.firstName} {deliveryInformation.lastName}
            </td>
          </tr>
          <tr>
            <th scope="row">Adresse de livraison</th>
            <td>
              {deliveryInformation.street}, {deliveryInformation.postalCode}{" "}
              {deliveryInformation.city}
            </td>
          </tr>
          <tr>
            <th scope="row">Téléphone</th>
            <td>{deliveryInformation.phone}</td>
          </tr>
          <tr>
            <th scope="row">Vos remarques à notre attention</th>
            <td>{deliveryInformation.remarks}</td>
          </tr>
        </tbody>
      </Table>
      <div className="text-center my-4">
        <Button
          className="me-5"
          style={{ backgroundColor: "#fb8500" }}
          href="/cart"
        >
          <FontAwesomeIcon icon={["fas", "shopping-cart"]} size="lg" />
        </Button>
        <Button color="success" className="me-4" href="/payment">
          <FontAwesomeIcon icon={["fas", "cash-register"]} size="lg" />
        </Button>
      </div>
    </Container>
  );
};

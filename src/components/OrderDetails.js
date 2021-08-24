import React from "react";
import { Button, Container, Table } from "reactstrap";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cartSlice";
import { selectDelivery } from "../features/deliverySlice";
import { computeCartTotalValue } from "../utilities/cartUtilities";

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
      <h1 className="text-primary text-center my-3">
        Confirmation de votre commande
      </h1>

      <h3 className="my-4 py-3 text-primary text-center">
        Récapitulatif de vos achats
      </h3>
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
      <h3 className="my-4 py-3 text-primary text-center">
        Vos informations de livraison
      </h3>
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
        <Button color="success" size="lg" className="me-4" href="/payment">
          Confirmer ma commande
        </Button>
      </div>
    </Container>
  );
};

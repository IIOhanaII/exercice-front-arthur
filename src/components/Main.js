import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./Header";
import { Bookstore } from "./Bookstore";
import { Cart } from "./Cart";
import { Purchases } from "./Purchases";
import { Delivery } from "./Delivery";
import { OrderDetails } from "./OrderDetails";
import { Payment } from "./Payment";

export const Main = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/bookstore" component={Bookstore} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/purchases" component={Purchases} />
        <Route exact path="/delivery" component={Delivery} />
        <Route exact path="/order-details" component={OrderDetails} />
        <Route exact path="/payment" component={Payment} />
        <Redirect to="/bookstore" />
      </Switch>
    </div>
  );
};

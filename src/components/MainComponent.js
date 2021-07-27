import React from "react";
import Bookstore from "./BookstoreComponent";
import Cart from "./CartComponent";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/bookstore" component={Bookstore} />
        <Route exact path="/cart" component={Cart} />
        <Redirect to="/bookstore" />
      </Switch>
    </div>
  );
};

export default Main;

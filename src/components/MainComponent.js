import React, { Component } from "react";
import Bookstore from "./BookstoreComponent";
import Cart from "./CartComponent";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
  }
}

export default Main;

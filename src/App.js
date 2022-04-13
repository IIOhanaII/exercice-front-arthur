import React from "react";
import "./App.css";
import { Main } from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faInfo,
  faCartPlus,
  faTrashAlt,
  faTimes,
  faShoppingCart,
  faCashRegister,
  faCheck,
  faBook,
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fas,
  faInfo,
  faCartPlus,
  faTrashAlt,
  faTimes,
  faShoppingCart,
  faCashRegister,
  faCheck,
  faBook,
  faMinus,
  faPlus
);

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  );
};

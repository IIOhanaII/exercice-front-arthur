import React, { Component } from "react";
import Main from "./components/MainComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faInfo,
  faCartPlus,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(fas, faInfo, faCartPlus, faTrashAlt, faTimes);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

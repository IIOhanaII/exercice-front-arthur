import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cartSlice";

const Header = () => {
  const cart = useSelector(selectCart);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Navbar color="dark" dark expand="sm">
        <NavbarBrand href="/bookstore" className="ms-3">
          La bibliothèque d'Henri Potier
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="nav-link" to="/bookstore">
                Livres
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/cart">
                Panier ({cart.length})
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

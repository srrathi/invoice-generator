import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

const NavbarComponent = () => {

  return (
    <>
      <Navbar color="dark" className="p-4" dark>
        <Nav className="mr-lg-auto mr-auto" navbar>
          <NavItem>
            <Link style={{ textDecoration: "none" }} to="/">
              <h3 className="text-white">Invoice Generator</h3>
            </Link>
          </NavItem>
        </Nav>
        <Nav className="mx auto" navbar>
          <NavItem>
            <Link className="btn btn-light" to="/invoice">
              + Generate New Invoice
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavbarComponent;

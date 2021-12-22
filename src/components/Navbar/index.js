import React from "react";
import NavbarBS from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./navbar.css";

const Navbar = ({ children }) => {
  return (
    <NavbarBS variant="dark">
      <Container fluid>{children}</Container>
    </NavbarBS>
  );
};

export default Navbar;

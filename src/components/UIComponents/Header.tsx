import * as React from "react";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

//UI garbage
export function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Hybrid Proof Visualizer</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Visualize</Nav.Link>
          <Nav.Link href="#features">About</Nav.Link>
          <Nav.Link href="#pricing">Help</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}



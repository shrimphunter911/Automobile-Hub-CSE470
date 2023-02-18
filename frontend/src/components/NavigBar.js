import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavigBar.css";

function NavigBar() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/FrontPage" style={{color: 'white', textDecoration: 'none'}}>Automobile Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/AddCar" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Add Car For Sale</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
          <Nav.Link href="/CreateAccount" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Create Account</Nav.Link>
          <Nav.Link href="/SignIn" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Sign in</Nav.Link>
            {/* <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigBar;
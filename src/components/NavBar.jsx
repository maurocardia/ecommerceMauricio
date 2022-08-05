import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import "../styles/navBar.css"
import {AiOutlineHome,AiOutlineShoppingCart,AiOutlineUser} from "react-icons/ai"
const NavBar = () => {
    return (
        <div className='navBarHome'>

          <Navbar bg="light" variant="light" >
            <Container>
              <Navbar.Brand href="#/" className="text-danger ecommerce" > e-commerce</Navbar.Brand>
              <Nav className="me-auto menuBar">
                <Nav.Link className="homeBar" href="#/"><AiOutlineHome/></Nav.Link>
                <Nav.Link className="purchasesBar" href="#/purchases"><AiOutlineShoppingCart/></Nav.Link>
                <Nav.Link className="loginBar" href="#/login"><AiOutlineUser/></Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      
    );
};

export default NavBar;
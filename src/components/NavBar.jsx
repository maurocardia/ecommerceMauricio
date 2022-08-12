import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import "../styles/navBar.css"
import {AiOutlineHome,AiOutlineShoppingCart,AiOutlineUser,AiFillShopping} from "react-icons/ai"
import {useNavigate} from "react-router-dom"
import CartModal from './CartModal'
import { Button, Offcanvas} from 'react-bootstrap';
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/exports';

const NavBar = () => {

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const token=localStorage.getItem("token","")
  const [show, setShow] = useState(false);
 

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if(token !== ""){
      setShow(true);

    }else{
      dispatch("/login")
    }
  }

  const navigate = useNavigate()
  const logOut=()=>{
    localStorage.setItem("token","")
    navigate("/login")
    
  }
  
   

    return (
        <div className='navBarHome container'>

          <Navbar bg="light" variant="light" >
            <Container>
              <Navbar.Brand href="#/" className="text-danger ecommerce" > e-commerce</Navbar.Brand>
              <Nav className="me-auto menuBar">
                <Nav.Link className="homeBar" href="#/"><AiOutlineHome/></Nav.Link>
                <Nav.Link className="purchasesBar" href="#/purchases" ><AiFillShopping/></Nav.Link>
                <Nav.Link variant="light" onClick={handleShow}>
                <AiOutlineShoppingCart/>
            </Nav.Link>
                
                {token?  (<Nav.Link onClick={logOut} className="logOut"> <div>Log Out</div></Nav.Link>
                ):(<Nav.Link className="loginBar" href="#/login"><AiOutlineUser/></Nav.Link>)}
              </Nav>
            </Container>
          </Navbar>
          <CartModal show={show}
                      handleClose={handleClose}/>
        </div>
      
    );
};

export default NavBar;
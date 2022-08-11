import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Offcanvas} from 'react-bootstrap';
import getConfig from '../utils/getConfig';
import { useDispatch} from 'react-redux';
import { buyThunk, getCartThunk } from '../store/slices/cart.slice';
import { useSelector } from 'react-redux/es/exports';
import {useNavigate} from 'react-router-dom';
import {AiTwotoneDelete} from "react-icons/ai"
import "../styles/cartModal.css"

const CartModal = ({show,handleClose}) => {
    const navigate=useNavigate()
    const cart = useSelector(state => state.cart)
    const [cartProducts, setCartProducts] = useState([])
    const dispatch = useDispatch()
    let totalPrice = 0

useEffect(()=>{
    dispatch(getCartThunk())

},[])

const buyProduts = ()=>{
    dispatch(buyThunk())
    
}
cart.forEach(element => {
    totalPrice = totalPrice + ((Number(element.price))*(Number(element.productsInCart.quantity)))
  });
  console.log(cart)


const deleteProduct=(id)=>{
    axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,getConfig())
    .then(()=> dispatch(getCartThunk()))
}
  

 

    return (
        <div>
            

            <Offcanvas show={show} onHide={handleClose}  placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='containerBuy'>
                        <div className="containerBuyTotal">
                            <button className='buyBotton' onClick={buyProduts}>Buy</button>
                            <div>Total: $ {totalPrice}</div>

                        </div>
                    </div>
                  {cart.map(product=>(
                    <div className='containercartArticles'>

                        <div className="deleteBrand">
                           
                            <small>{product.brand}</small>
                            <button className="deleteCart" onClick={()=>deleteProduct(product.id)}><AiTwotoneDelete/></button>
                        </div>
                        <h5 onClick={()=>{navigate(`/product/${product.id}`)}}>{product.title}</h5>
                        <div className='quantity'>{product.productsInCart.quantity}</div>
                        <div className='containerPriceCart'>
                            <h5 className="priceCart">Total: ${(product.price)*product.productsInCart.quantity}</h5>
                        </div>
                    </div>
                
                  ))}
                   
                </Offcanvas.Body>
            </Offcanvas>
         
        </div>
    );
};

export default CartModal;
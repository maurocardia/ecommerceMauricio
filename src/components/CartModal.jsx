import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getConfig from '../utils/getConfig';

const CartModal = () => {
    const[cartProducts, setCartProducts]=useState([])

    useEffect(()=>{
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res=> setCartProducts(res.data.data.cart.products))
    },[])

    console.log(cartProducts)

    return (
        <div>
            <div className='modalContainer'>
                <h3>Cart</h3>
                <ul>
                    {cartProducts.map(cartProduct=>(
                        <li>{cartProduct.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CartModal;
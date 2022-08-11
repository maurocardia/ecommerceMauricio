import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector  } from 'react-redux';
import { getFavoritesThunk } from '../store/slices/favorites.slice';
import "../styles/purchases.css"
const Favorites = () => {
    const purchases = useSelector(state=>state.favorites) 
    const dispatch = useDispatch()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }


    useEffect(()=>{
        dispatch(getFavoritesThunk())
    },[])
 console.log(purchases)
    return (
        <div>
            {
                purchases.map(purchase=>(
                        
                    purchase.cart.products.map(product=>(
                    <div className='containerPurchases'>

                        <small>{new Date(Date.UTC(product.createdAt)).toLocaleDateString(undefined, options)}</small>
                        <div className='descriptionBuy'></div>
                            <li>{product.title}</li>
                            <div className='quantity'>{product.productsInCart.quantity}</div>
                            <h5 className='PriceArticle'>$ {product.price}</h5>
                    </div>
                    ))
                 
                ))
            }
        </div>
    );
};

export default Favorites;
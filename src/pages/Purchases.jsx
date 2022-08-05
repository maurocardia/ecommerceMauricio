import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector  } from 'react-redux';
import { getFavoritesThunk } from '../store/slices/favorites.slice';

const Favorites = () => {
    const purchases = useSelector(state=>state.favorites.data?.purchase.cart.products) 
    const dispatch = useDispatch()
   


    useEffect(()=>{
        dispatch(getFavoritesThunk())
    },[])
 
    return (
        <div>
            {
                purchases?.map(purchase=>(
                  <li>
                    {purchase.title}
                  </li>  
                ))
            }
        </div>
    );
};

export default Favorites;
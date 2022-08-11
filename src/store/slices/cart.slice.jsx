import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import { setLoading } from './Loading.slice';
import axios from 'axios';
import { getFavoritesThunk } from './favorites.slice';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
       setCart:(state, action)=>{
            const cart = action.payload
            return cart
       }
    }
})
export const getCartThunk = () => (dispatch) => {
    dispatch(setLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setLoading(false)));

}
export const addToCartThunk = (item) => (dispatch) => {
    dispatch(setLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart",item,getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setLoading(false)));
}

export const buyThunk = () => (dispatch) => {
    dispatch(setLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases",{},getConfig())
        .then(() => {dispatch(setCart([]))})
                    
        .finally(() => dispatch(setLoading(false)));
}

export const {  setCart} = cartSlice.actions;

export default cartSlice.reducer;

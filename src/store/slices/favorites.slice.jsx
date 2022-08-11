import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from './Loading.slice';
import getConfig from '../../utils/getConfig';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        setFavorites:(state, action)=>{
            const favorites = action.payload
            return favorites
        }
    }
})

export const getFavoritesThunk = () => (dispatch) => {
    dispatch(setLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then((res) => dispatch(setFavorites(res.data.data.purchases)))
        .finally(() => dispatch(setLoading(false)));
}
export const getCartsThunk = () => (dispatch) => {
    dispatch(setLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then((res) => dispatch(setFavorites(res.data.data.cart.products)))
        .finally(() => dispatch(setLoading(false)));
}

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

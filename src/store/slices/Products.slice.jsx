import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from './Loading.slice';


export const ProductsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts:(state, action)=>{
           const product = action.payload
           return product
        }
    }
})
export const getProductsThunk = () => (dispatch) => {
    dispatch(setLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setLoading(false)));
}

export const getInputSearchThunk = (inputValue) => (dispatch) => {
    dispatch(setLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${inputValue}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setLoading(false)));
}

export const filterProductsThunk = (id) => (dispatch) => {
    dispatch(setLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setLoading(false)));
}

export const { setProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;

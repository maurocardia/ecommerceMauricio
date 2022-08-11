import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './slices/cart.slice'
import  favoritesSlice  from './slices/favorites.slice'
import LoadingSlice from './slices/Loading.slice'
import ProductsSlice from "./slices/Products.slice"


export default configureStore({
    reducer: {
        loading: LoadingSlice,
        products: ProductsSlice,
        favorites: favoritesSlice,
        cart:cartSlice
    }
})

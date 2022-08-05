import { configureStore } from '@reduxjs/toolkit'
import  favoritesSlice  from './slices/favorites.slice'
import LoadingSlice from './slices/Loading.slice'
import ProductsSlice from "./slices/Products.slice"


export default configureStore({
    reducer: {
        loading: LoadingSlice,
        products: ProductsSlice,
        favorites: favoritesSlice
    }
})

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../slices/cartslice'

const store=configureStore({
    reducer:{
        cart:cartReducer
        }
})
export default store
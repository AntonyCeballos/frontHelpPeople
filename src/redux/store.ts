import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import productSlice from './slice/productSlice';
import categorySlice from './slice/categorySlice';
import userSlice from './slice/userSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productSlice,
        categories: categorySlice,
        users: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
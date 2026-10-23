import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./store/cartSlice";

// Load cart from localStorage
const savedCart = localStorage.getItem("cart");

const initialCart = savedCart ? JSON.parse(savedCart) : [];

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: initialCart,
  },
});

// Save cart whenever Redux state changes
store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});
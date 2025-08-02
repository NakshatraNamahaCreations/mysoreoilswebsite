import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';
import cartReducer from "./cartSlice";

const loadFromLocalStorage = () => {
  try {
    if (typeof window === "undefined") return undefined;  // SSR Safe Check
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    if (typeof window === "undefined") return;  // SSR Safe Check
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem("cartState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const preloadedState = {
  cart: loadFromLocalStorage() || { cartItems: [] }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer  // <-- Include wishlist if used
  },
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;

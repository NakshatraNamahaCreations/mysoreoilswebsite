{/*import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(i => i.id !== id);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;*/}

{/*import { createSlice } from "@reduxjs/toolkit";

// Load initial cart from localStorage
const initialCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: initialCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((x) => x.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedWeight === action.payload.selectedWeight
          )
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((x) => x.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;*/}


// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const lineKey = (it) => `${it.id}__${it.variantId ?? ""}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const incoming = action.payload;
      // Expect: { id, name, variantId, quantity, image, weight, unit, discountedPrice, originalPrice, ... }
      const keyIn = lineKey(incoming);

      const existing = state.cartItems.find((ci) => lineKey(ci) === keyIn);

      if (existing) {
        // same product + same variant -> bump quantity
        existing.quantity = Number(existing.quantity || 0) + Number(incoming.quantity || 1);
        // keep latest pricing just in case
        existing.discountedPrice = incoming.discountedPrice ?? existing.discountedPrice;
        existing.originalPrice   = incoming.originalPrice   ?? existing.originalPrice;
        existing.price           = incoming.price           ?? existing.price;
        existing.image           = incoming.image           ?? existing.image;
        existing.weight          = incoming.weight          ?? existing.weight;
        existing.unit            = incoming.unit            ?? existing.unit;
      } else {
        state.cartItems.push({
          ...incoming,
          quantity: Number(incoming.quantity || 1),
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, variantId, quantity } = action.payload;
      const q = Math.max(1, Number(quantity || 1));
      const item = state.cartItems.find(
        (ci) => ci.id === id && (ci.variantId ?? "") === (variantId ?? "")
      );
      if (item) item.quantity = q;
    },

    removeFromCart: (state, action) => {
      const { id, variantId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (ci) => !(ci.id === id && (ci.variantId ?? "") === (variantId ?? ""))
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



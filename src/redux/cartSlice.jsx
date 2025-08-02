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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (i) =>
          i.id === newItem.id &&
          i.selectedWeight === newItem.selectedWeight // distinguish by variant
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity, selectedWeight } = action.payload;
      const item = state.cartItems.find(
        (i) => i.id === id && i.selectedWeight === selectedWeight
      );
      if (item) {
        item.quantity = quantity;
      }
    },

    removeFromCart: (state, action) => {
      const { id, selectedWeight } = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) => !(i.id === id && i.selectedWeight === selectedWeight)
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

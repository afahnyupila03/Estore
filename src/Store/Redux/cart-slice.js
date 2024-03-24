import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.amount = action.payload.amount;
      state.products = action.payload.products;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.products.findIndex(
        (item) => item.id === newItem.id
      );
      state.totalAmount += newItem.price;
      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.products.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.price;
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.products = state.products.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    clearCart(state) {
      state.products = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export default cartSlice;
export const cartAction = cartSlice.actions;

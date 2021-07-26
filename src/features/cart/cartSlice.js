import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addBookToCart: (state, action) => {
      // Check first if the book has already been added to the cart
      if (state.value.find((book) => book.isbn === action.payload.isbn)) {
        alert("Ce livre est déjà dans votre panier");
      } else {
        state.value = [...state.value, action.payload];
      }
    },
    deleteBookFromCart: (state, action) => {
      state.value = state.value.filter(
        (bookToKeep) => bookToKeep.isbn !== action.payload.isbn
      );
    },
  },
});

export const { addBookToCart, deleteBookFromCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.value;

export default cartSlice.reducer;

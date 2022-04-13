import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addBookToCart: (state, action) => {
      console.log(action.payload);
      // Check first if the book has already been added to the cart
      const isBookInCart = state.value.find(
        (book) => book.isbn === action.payload.isbn
      );
      if (isBookInCart) {
        isBookInCart.quantityInCart = action.payload.quantityInCart;
      } else {
        state.value = [...state.value, action.payload];
      }
    },
    removeBookFromCart: (state, action) => {
      state.value = state.value.filter(
        (bookToKeep) => bookToKeep.isbn !== action.payload.isbn
      );
    },
    quantityMinusInCart: (state, action) => {
      // Find the book for which we want to decrement its quantity in cart
      const bookInCart = state.value.find(
        (book) => book.isbn === action.payload.isbn
      );
      if (bookInCart.quantityInCart === 0) {
        return;
      } else {
        bookInCart.quantityInCart -= 1;
      }
    },
    quantityPlusInCart: (state, action) => {
      // Find the book for which we want to increment its quantity in cart
      const bookInCart = state.value.find(
        (book) => book.isbn === action.payload.isbn
      );
      if (bookInCart.quantityInCart >= bookInCart.quantity) {
        alert(
          "Désolé mais nous ne disposons que de " +
            bookInCart.quantity +
            " '" +
            bookInCart.title +
            "' en stock"
        );
      } else {
        bookInCart.quantityInCart += 1;
      }
    },
    setQuantityInCart: (state, action) => {
      // Find the book for which we want to set its quantity in cart
      const bookInCart = state.value.find(
        (book) => book.isbn === action.payload.isbn
      );
      bookInCart.quantityInCart = action.payload.newQuantityInCart;
    },
  },
});

export const {
  addBookToCart,
  removeBookFromCart,
  quantityMinusInCart,
  quantityPlusInCart,
  setQuantityInCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart.value;

export default cartSlice.reducer;

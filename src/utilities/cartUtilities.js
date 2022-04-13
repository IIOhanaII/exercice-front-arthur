export const computeCartTotalValue = (cart) =>
  cart.map((book) => book.price * book.quantityInCart).reduce((a, b) => a + b, 0);

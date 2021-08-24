export const computeCartTotalValue = (cart) =>
  cart.map((book) => book.price).reduce((a, b) => a + b, 0);

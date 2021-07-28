import { render, screen } from "@testing-library/react";
import App from "./App";
import {
  computeDiscountedCartTotalValue,
  computeCartTotalValue,
  getBestOffer,
} from "./utilities/cartUtilities";
import { cartSlice } from "../src/features/cartSlice";
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("computes the cart total value", () => {
  const cart1 = [
    { id: 1, price: 30 },
    { id: 2, price: 50 },
  ];
  expect(computeCartTotalValue(cart1)).toEqual(80);

  const cart2 = [
    { id: 1, price: 99 },
    { id: 2, price: 101 },
  ];
  expect(computeCartTotalValue(cart2)).toEqual(200);
});

it("gets the best offer from applicable offers for the cart", () => {
  const cartTotalValue1 = 200;
  const cartOffers1 = {
    offers: [{ type: "percentage", value: 5 }],
  };
  expect(getBestOffer(cartTotalValue1, cartOffers1)).toEqual(5);

  const cartTotalValue2 = 180;
  const cartOffers2 = {
    offers: [{ type: "minus", value: 15 }],
  };
  expect(getBestOffer(cartTotalValue2, cartOffers2)).toEqual(15);

  const cartTotalValue3 = 299;
  const cartOffers3 = {
    offers: [{ type: "slice", sliceValue: 100, value: 12 }],
  };
  expect(getBestOffer(cartTotalValue3, cartOffers3)).toEqual(24);

  const cartTotalValue4 = 170;
  const cartOffers4 = {
    offers: [
      { type: "percentage", value: 5 },
      { type: "minus", value: 15 },
    ],
  };
  expect(getBestOffer(cartTotalValue4, cartOffers4)).toEqual(15);

  const cartTotalValue5 = 200;
  const cartOffers5 = {
    offers: [
      { type: "minus", value: 15 },
      { type: "slice", sliceValue: 100, value: 12 },
    ],
  };
  expect(getBestOffer(cartTotalValue5, cartOffers5)).toEqual(24);

  const cartTotalValue6 = 99;
  const cartOffers6 = {
    offers: [
      { type: "percentage", value: 5 },
      { type: "slice", sliceValue: 100, value: 12 },
    ],
  };
  expect(getBestOffer(cartTotalValue6, cartOffers6)).toEqual(5);

  const cartTotalValue7 = 199;
  const cartOffers7 = {
    offers: [
      { type: "percentage", value: 5 },
      { type: "minus", value: 15 },
      { type: "slice", sliceValue: 100, value: 12 },
    ],
  };
  expect(getBestOffer(cartTotalValue7, cartOffers7)).toEqual(15);

  const cartTotalValue8 = 201;
  const cartOffers8 = {
    offers: [
      { type: "percentage", value: 5 },
      { type: "minus", value: 15 },
      { type: "slice", sliceValue: 100, value: 12 },
    ],
  };
  expect(getBestOffer(cartTotalValue8, cartOffers8)).toEqual(24);

  const cartTotalValue9 = 99;
  const cartOffers9 = {
    offers: [{ type: "slice", sliceValue: 100, value: 12 }],
  };
  expect(getBestOffer(cartTotalValue9, cartOffers9)).toEqual(0);
});

it("applies discount to the cart total value", () => {
  const cartTotalValue1 = 200;
  const bestOffer1 = 20;
  expect(computeDiscountedCartTotalValue(cartTotalValue1, bestOffer1)).toEqual(
    180
  );

  const cartTotalValue2 = 180;
  const bestOffer2 = 50;
  expect(computeDiscountedCartTotalValue(cartTotalValue2, bestOffer2)).toEqual(
    130
  );
});

describe('cartSlice', () => {
  describe('reducers', () => {
    const initialState = { value: [] }
    
    it('adds one book to the cart', () => {
      const action = { type: cartSlice.actions.addBookToCart, payload: {"isbn":"c8fabf68-8374-48fe-a7ea-a00ccd07afff","title":"Henri Potier à l'école des sorciers","price":35,"cover":"https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media","synopsis":["Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an."]}};
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({ value: [{"isbn":"c8fabf68-8374-48fe-a7ea-a00ccd07afff","title":"Henri Potier à l'école des sorciers","price":35,"cover":"https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media","synopsis":["Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an."]}]});
    });

    it('does not add a same book to the cart', () => {
      const action = { type: cartSlice.actions.addBookToCart, payload: {"isbn":"c8fabf68-8374-48fe-a7ea-a00ccd07afff","title":"Henri Potier à l'école des sorciers","price":35,"cover":"https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media","synopsis":["Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an."]}};
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({ value: [{"isbn":"c8fabf68-8374-48fe-a7ea-a00ccd07afff","title":"Henri Potier à l'école des sorciers","price":35,"cover":"https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media","synopsis":["Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an."]}]});
    });

    it('removes one book from the cart', () => {
      const action = { type: cartSlice.actions.removeBookFromCart, payload: {"isbn":"c8fabf68-8374-48fe-a7ea-a00ccd07afff","title":"Henri Potier à l'école des sorciers","price":35,"cover":"https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media","synopsis":["Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an."]}};
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({ value: [] });
    });

  });
});

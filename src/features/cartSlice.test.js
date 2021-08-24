import { cartSlice } from "../src/features/cartSlice";

describe("cartSlice", () => {
  describe("reducers", () => {
    const initialState = { value: [] };

    it("adds one book to the cart", () => {
      const action = {
        type: cartSlice.actions.addBookToCart,
        payload: {
          isbn: "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          title: "Henri Potier à l'école des sorciers",
          price: 35,
          cover:
            "https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media",
          synopsis: [
            "Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an.",
          ],
        },
      };
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({
        value: [
          {
            isbn: "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
            title: "Henri Potier à l'école des sorciers",
            price: 35,
            cover:
              "https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media",
            synopsis: [
              "Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an.",
            ],
          },
        ],
      });
    });

    it("does not add a same book to the cart", () => {
      const action = {
        type: cartSlice.actions.addBookToCart,
        payload: {
          isbn: "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          title: "Henri Potier à l'école des sorciers",
          price: 35,
          cover:
            "https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media",
          synopsis: [
            "Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an.",
          ],
        },
      };
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({
        value: [
          {
            isbn: "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
            title: "Henri Potier à l'école des sorciers",
            price: 35,
            cover:
              "https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media",
            synopsis: [
              "Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an.",
            ],
          },
        ],
      });
    });

    it("removes one book from the cart", () => {
      const action = {
        type: cartSlice.actions.removeBookFromCart,
        payload: {
          isbn: "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          title: "Henri Potier à l'école des sorciers",
          price: 35,
          cover:
            "https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media",
          synopsis: [
            "Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an.",
          ],
        },
      };
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({ value: [] });
    });
  });
});

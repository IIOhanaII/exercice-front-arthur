import { computeCartTotalValue } from "./cartUtilities";

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

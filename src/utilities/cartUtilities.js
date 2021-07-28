export const computeDiscountedCartTotalValue = (cartTotalValue, bestOffer) =>
  cartTotalValue - bestOffer;

export const computeCartTotalValue = (cart) =>
  cart.map((book) => book.price).reduce((a, b) => a + b, 0);

export const getBestOffer = (cartTotalValue, cartOffers) => {
  let highestValueFromOffers = 0;

  // Return directly the offer if there is only one applicable offer for the cart
  if (cartOffers.offers.length === 1 && cartOffers.offers[0].type !== "slice") {
    highestValueFromOffers = cartOffers.offers[0].value;

    return highestValueFromOffers;
  } else {
    const sliceOffer = cartOffers.offers.find(
      (offer) => offer.type === "slice"
    );

    // Execute this only if an offer of type slice exists
    if (sliceOffer) {
      const numberOfSlicesComputedFromCartTotalValue = Math.floor(
        cartTotalValue / sliceOffer.sliceValue
      );

      const totalValueOfSliceOffer =
        sliceOffer.value * numberOfSlicesComputedFromCartTotalValue;

      // Replace value of slice offer with its total value for comparison purpose
      sliceOffer.value = totalValueOfSliceOffer;
    }

    // Get the highest value from offers by comparing their values
    highestValueFromOffers = Math.max.apply(
      Math,
      cartOffers.offers.map((offer) => offer.value)
    );

    return highestValueFromOffers;
  }
};

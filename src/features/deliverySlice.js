import { createSlice } from "@reduxjs/toolkit";

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    value: {},
  },
  reducers: {
    storeFormData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { storeFormData } = deliverySlice.actions;

export const selectDelivery = (state) => state.delivery.value;

export default deliverySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getCommerce, getCommerces } from "./commerceThunks";

const commerceSlice = createSlice({
  name: "commerce",
  initialState: {
    commerces: [],
    commerce: {},
    status: "idle",
    error: false,
  },
  reducers: {
    resetCommerces: (state) => {
      state.commerces = [];
      state.status = "idle";
      state.error = false;
      state.commerce = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCommerce.pending, (state) => {
      state.status = "loading";
      state.error = false;
    });
    builder.addCase(getCommerce.fulfilled, (state, action) => {
      state.status = "success";
      state.commerce = action.payload;
    });
    builder.addCase(getCommerce.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
    builder.addCase(getCommerces.pending, (state) => {
      state.status = "loading";
      state.error = false;
    });
    builder.addCase(getCommerces.fulfilled, (state, action) => {
      state.status = "success";
      state.commerces = action.payload;
    });
    builder.addCase(getCommerces.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
  },
});

export default commerceSlice.reducer;
export const { resetCommerces } = commerceSlice.actions;

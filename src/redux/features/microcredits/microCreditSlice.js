import { createSlice } from "@reduxjs/toolkit";
import { getMicroCredits, createMicroCredit } from "./microCreditThunks";

const microCreditSlice = createSlice({
  name: "microcredit",
  initialState: {
    credits: [],
    credit: {},
    status: "idle",
    error: false,
    isAuth: false,
  },
  reducers: {
    updateCredits: (state, action) => {
      state.credits = action.payload;
    },
    resetCredits: (state) => {
      state.credits = [];
      state.status = "idle";
      state.error = false;
      state.credit = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMicroCredits.pending, (state) => {
      state.status = "loading";
      state.error = false;
    });
    builder.addCase(getMicroCredits.fulfilled, (state, action) => {
      state.status = "success";
      state.credits = action.payload;
    });
    builder.addCase(getMicroCredits.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
    builder.addCase(createMicroCredit.pending, (state) => {
      state.status = "loading";
      state.error = false;
    });
    builder.addCase(createMicroCredit.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "success";
      state.credits = [action.payload, ...state.credits];
    });
    builder.addCase(createMicroCredit.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
  },
});

export default microCreditSlice.reducer;
export const { updateCredits, resetCredits } = microCreditSlice.actions;

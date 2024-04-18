import { createSlice } from "@reduxjs/toolkit";
import { login, createUserAccount } from "./userThunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    status: "idle",
    error: false,
    isAuth: false,
  },
  reducers: {
    logout: (state) => {
      state.user = [];
      state.isAuth = false;
      state.status = "idle";
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
    builder.addCase(createUserAccount.pending, (state) => {
      state.status = "loading";
      state.error = false;
    });
    builder.addCase(createUserAccount.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(createUserAccount.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;

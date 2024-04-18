import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("/user/login", async (data) => {
  const response = await axios.post("/api/login", data);
  return response.data;
});

export const getCommerce = createAsyncThunk("/commerce/get", async (id) => {
  const response = await axios.get(`/api/trade/commerces/${id}`);
  return response.data;
});

export const createUserAccount = createAsyncThunk(
  "/user/create",
  async (data) => {
    const response = await axios.post("/api/client/create-account", data);
    return response.data;
  }
);

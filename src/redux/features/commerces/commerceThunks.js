import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCommerce = createAsyncThunk("/commerce/get", async (id) => {
  const response = await axios.get(`/api/trade/commerces/${id}`);
  return response.data;
});

export const getCommerces = createAsyncThunk("/commerces/get", async () => {
  const response = await axios.get("/api/trade/commerces");
  return response.data;
});

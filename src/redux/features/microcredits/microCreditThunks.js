import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMicroCredits = createAsyncThunk(
  "microCredits/getMicroCredits",
  async (id) => {
    const response = await axios.get(`/api/micro-credit/${id}`);
    return response.data;
  }
);

export const createMicroCredit = createAsyncThunk(
  "microCredits/createMicroCredit",
  async (data) => {
    const response = await axios.post("/api/micro-credit", data);
    return response.data;
  }
);

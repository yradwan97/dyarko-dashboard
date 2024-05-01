import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "services/axiosInstance";

export const getInstallmentContracts = createAsyncThunk(
  "contracts/getInstallmentContracts",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(`/installments?page=${args.page}`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const getRentContracts = createAsyncThunk(
  "contracts/getRentContracts",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(`/rents?page=${args.page}`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const requestEndContract = createAsyncThunk(
  "contracts/requestEndContract",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstance.post("/end_contract", args);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const requestDisclaimer = createAsyncThunk(
  "contracts/requestDisclaimer",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(`/disclaimer/${args.property}`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
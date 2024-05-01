import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "services/axiosInstance";

export const getInstallment = createAsyncThunk(
  "installments/getInstallment",
  async (args: any, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(`/installments?page=${args.page}`);
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateInstallmentStatus = createAsyncThunk(
  "installments/updateInstallmentStatus",
  async (args: any, thunkApi: any) => {
    try {
      const { data } = await axiosInstance.put(
        `/installments/${args.installmentId}/owner`,
        args
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
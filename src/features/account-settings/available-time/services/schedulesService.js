import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "services/axiosInstance";

export const getSchedules = createAsyncThunk(
  "schedules/getSchedules",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(
        `/Schedules/${thunkApi.getState().auth.user?._id}`,
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);
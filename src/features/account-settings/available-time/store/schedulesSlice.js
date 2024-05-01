import { createSlice } from "@reduxjs/toolkit";
import { getSchedules } from "../services/schedulesService";

let initialState = {
  isLoading: false,
  itemsCount: 0,
  data: [],
  pages: 0,
  errors: []
};

const authSlice = createSlice({
  name: "schedules",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSchedules.pending, (state, { payload }) => {
      state.isLoading = true;
      state.errors = [];
    })
      .addCase(getSchedules.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = [];
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getSchedules.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })
  }
});

export default authSlice.reducer;
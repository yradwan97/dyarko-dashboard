import { createSlice } from "@reduxjs/toolkit";
import { getInstallment, updateInstallmentStatus } from "../services/installmentsService";

let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  errors: []
}

export const installmentsSlice = createSlice({
  name: "installments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getInstallment.pending, (state, { payload }) => {
      state.isLoading = true;
      state.errors = [];
    })
      .addCase(getInstallment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = [];
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getInstallment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(updateInstallmentStatus.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(updateInstallmentStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexAt = state.data.findIndex(el => el._id === payload.data._id);
        state.data[indexAt] = payload.data;
        state.errors = [];
      })
      .addCase(updateInstallmentStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })
  }
});

export default installmentsSlice.reducer;
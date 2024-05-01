import { createSlice } from "@reduxjs/toolkit";
import {
  getInstallmentContracts,
  getRentContracts,
  requestEndContract,
  requestDisclaimer
} from "../services/contractsService";

let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  errors: []
}

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getInstallmentContracts.pending, (state, { payload }) => {
      state.isLoading = true;
      state.errors = [];
    })
      .addCase(getInstallmentContracts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = [];
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getInstallmentContracts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(getRentContracts.pending, (state, { payload }) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getRentContracts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = [];
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getRentContracts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(requestEndContract.pending, (state, { payload }) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(requestEndContract.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = [];
      })
      .addCase(requestEndContract.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(requestDisclaimer.pending, (state, { payload }) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(requestDisclaimer.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = [];
      })
      .addCase(requestDisclaimer.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })
  }
});

export default contractsSlice.reducer;
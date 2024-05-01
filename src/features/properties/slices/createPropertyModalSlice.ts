import { createSlice } from "@reduxjs/toolkit";
import { Nullable } from "types";
import { Property } from "../types";

interface InitialState {
  isActive: boolean
  paymentOption: string
  editProperty: Nullable<Property>
  isEditActive: boolean
}
const initialState: InitialState = { isActive: false, paymentOption: "points", editProperty: null, isEditActive: false };

const createPropertyModalSlice = createSlice({
  name: "createPropertyModal",
  initialState,
  reducers: {
    toggleActiveCreatePropertyModal: (state) => {
      state.isActive = !state.isActive;
    },
    toggleActiveEditPropertyModal: (state) => {
      state.isEditActive = !state.isEditActive
    },
    setEditProperty: (state, {payload}) => {
      state.editProperty = payload
    },
    setSelectedPaymentOption: (state, { payload }) => {
      state.paymentOption = payload
    }
  },
});

export const { toggleActiveCreatePropertyModal, setSelectedPaymentOption, toggleActiveEditPropertyModal, setEditProperty } = createPropertyModalSlice.actions;

export default createPropertyModalSlice.reducer

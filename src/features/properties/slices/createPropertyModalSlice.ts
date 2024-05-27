import { createSlice } from "@reduxjs/toolkit";
import { Nullable } from "types";
import { EditablePropertyWithExtraPropertiesAndFlatStructure } from "../types";

interface InitialState {
  isActive: boolean;
  paymentOption: string;
  editProperty: any;
  isEditActive: boolean;
  isUpdating: boolean;
}
const initialState: InitialState = {
  isActive: false,
  paymentOption: "points",
  editProperty: null,
  isEditActive: false,
  isUpdating: false,
};

const createPropertyModalSlice = createSlice({
  name: "createPropertyModal",
  initialState,
  reducers: {
    toggleActiveCreatePropertyModal: (state) => {
      state.isActive = !state.isActive;
    },
    toggleActiveEditPropertyModal: (state) => {
      state.isEditActive = !state.isEditActive;
    },
    setEditProperty: (state, { payload }) => {
      state.editProperty = payload;
    },
    toggleIsUpdating: (state) => {
      state.isUpdating = !state.isUpdating;
    },
    setSelectedPaymentOption: (state, { payload }) => {
      state.paymentOption = payload;
    },
  },
});

export const {
  toggleActiveCreatePropertyModal,
  setSelectedPaymentOption,
  toggleActiveEditPropertyModal,
  toggleIsUpdating,
  setEditProperty,
} = createPropertyModalSlice.actions;

export default createPropertyModalSlice.reducer;

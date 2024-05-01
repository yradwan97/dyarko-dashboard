import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

const initialState = {
  isShown: false,
  propertyId: null
};

const ITEM_KEY = "promotionModal";

const promotionModalSlice = createSlice({
  name: ITEM_KEY,
  initialState,
  reducers: {
    setPropertyId : (state,{payload})=>{
      state.propertyId = payload;
    },
    hide: (state) => {
      state.isShown = false;
    },
    show: (state) => {
      state.isShown = true;
    },
  },
});

export const promotionModalReducer = promotionModalSlice.reducer;
export const promotionModalActions = promotionModalSlice.actions;

export const selectModalState = (state: RootState) =>
  state.promotionModal.isShown;

export const selectPropertyId = (state: RootState)=>
  state.promotionModal.propertyId;
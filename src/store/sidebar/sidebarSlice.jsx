import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      state.isActive = payload;
    },
    openSidebar: (state) => {
      state.isActive = true;
    },
    closeSidebar: (state) => {
      state.isActive = false
    }
  },
});

export const { openSidebar, closeSidebar, setState } = sidebarSlice.actions;

export default sidebarSlice.reducer;

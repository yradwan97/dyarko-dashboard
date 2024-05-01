import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
};

export const initSidebar = createAsyncThunk(
  "sidebar/initSidebar",
  (_, thunkAPI) => {
    const sidebarIsActive = localStorage.getItem("sidebar");
    if (sidebarIsActive === null)
      localStorage.setItem("sidebar", initialState.isActive);
    const convertedSidebarIsActive = sidebarIsActive === "true";
    thunkAPI.dispatch(setState(convertedSidebarIsActive));
  }
);

export const closeSidebar = createAsyncThunk(
  "sidebar/closeSidebar",
  (_, thunkAPI) => {
    localStorage.setItem("sidebar", "false");
    thunkAPI.dispatch(setState(false));
  }
);

export const openSidebar = createAsyncThunk(
  "sidebar/openSidebar",
  (_, thunkAPI) => {
    localStorage.setItem("sidebar", "true");
    thunkAPI.dispatch(setState(true));
  }
);

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      state.isActive = payload;
    },
    toggleSidebar: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggleSidebar, setState } = sidebarSlice.actions;

export default sidebarSlice.reducer;

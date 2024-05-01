import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

const initialState = {
  isShown: false,
};

const ITEM_KEY = "addVideoModal";

export const initAddVideoModal = createAsyncThunk(
  `${ITEM_KEY}/init`,
  (_, thunkAPI) => {
    const modalIsShown = localStorage.getItem(ITEM_KEY);
    if (modalIsShown === null)
      localStorage.setItem(ITEM_KEY, String(initialState.isShown));
    const convertedModalIsShown = modalIsShown === "true";
    thunkAPI.dispatch(
      addVideoModalSlice.actions.setState(convertedModalIsShown)
    );
  }
);

export const showAddVideoModal = createAsyncThunk(
  `${ITEM_KEY}/show`,
  (_, thunkAPI) => {
    const value = true;
    localStorage.setItem(ITEM_KEY, String(value));
    thunkAPI.dispatch(addVideoModalSlice.actions.setState(value));
  }
);

export const hideAddVideoModal = createAsyncThunk(
  `${ITEM_KEY}/hide`,
  (_, thunkAPI) => {
    const value = false;
    localStorage.setItem(ITEM_KEY, String(value));
    thunkAPI.dispatch(addVideoModalSlice.actions.setState(value));
  }
);

const addVideoModalSlice = createSlice({
  name: ITEM_KEY,
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      state.isShown = payload;
    },
    toggleSidebar: (state) => {
      state.isShown = !state.isShown;
    },
  },
});

export const addVideoModalReducer = addVideoModalSlice.reducer;

export const selectModalState = (state: RootState) =>
  state.addVideoModal.isShown;

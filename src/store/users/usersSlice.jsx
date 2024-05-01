import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  data: {},
  user: null,
  errors: [],
}

const usersSlice = createSlice({
  name: "users",
  initialState,
});

export default usersSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const registerSclice = createSlice({
  name: "register",
  initialState: {
    user:[],
    isFetching: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSucess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});




export const { registerStart, registerSucess, registerFailure } = registerSclice.actions;
export default registerSclice.reducer;

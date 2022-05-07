import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  isPending: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action) => {
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ ...action.payload.data })
      );
      state.userInfo = { ...action.payload.data };
    },
    signUp: (state, action) => {},
    logoutUser: (state) => {
      state.userInfo = {};
      localStorage.clear();
    },
    userStart: (state) => {
      state.isPending = true;
      state.isError = false;
    },
    userSuccess: (state, action) => {
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ ...action.payload })
      );
      state.userInfo = { ...action.payload };
      state.isPending = false;
    },
    userError: (state) => {
      state.isPending = null;
      state.isError = true;
    },
  },
});
export const { authUser, logoutUser, userStart, userSuccess, userError } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
  profiles: [],
  recomendProfiles: [],
  isError: false,
  isLoading: false,
  currentPage: 0,
  numberOfPages: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileStart: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    profileSuccess: (state, action) => {
      state.currentPage = action.payload.page;
      state.numberOfPages = action.payload.numberOfPages;
      state.profiles = action.payload.data;
      state.recomendProfiles = [action.payload.data];
      state.isLoading = false;
    },
    profileError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    singleProfile: (state, action) => {
      state.profile = null;
      state.profile = action.payload.data;
      state.isLoading = false;
    },
  },
});

export const { profileSuccess, profileError, profileStart, singleProfile } =
  profileSlice.actions;
export default profileSlice.reducer;

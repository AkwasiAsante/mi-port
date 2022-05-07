import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postInfo: {},
  currentPage: 0,
  numberOfPages: 0,
  isPending: false,
  isError: false,
  post: {},
  posts: [],
  creatorPost: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postStart: (state) => {
      state.isPending = true;
      state.isError = false;
    },
    postSuccess: (state, action) => {
      state.currentPage = action.payload.page;
      state.numberOfPages = action.payload.numberOfPages;
      state.postInfo = action.payload.data;
      state.posts = [action.payload.data];
      state.creatorPost = action.payload.data;
      state.isPending = false;
    },
    postError: (state) => {
      state.isPending = false;
      state.isError = true;
    },
    postSinglePost: (state, action) => {
      state.post = null;
      state.post = action.payload;
      state.isPending = false;
    },
  },
});

export const { postStart, postSuccess, postError, postSinglePost } =
  postSlice.actions;
export default postSlice.reducer;

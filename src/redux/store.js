import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postReducer,
    profiles: profileReducer,
  },
});

import * as api from "./index";
import { userSuccess, userStart, userError } from "../userReducer";

export const signUp = async (userData, dispatch, navigate) => {
  dispatch(userStart);
  try {
    const { data } = await api.signUp(userData);

    dispatch(userSuccess(data));
    navigate("/");
  } catch (error) {
    dispatch(userError);
    console.log(error);
  }
};

export const signIn = async (userData, dispatch, navigate) => {
  dispatch(userStart());

  try {
    const { data } = await api.signIn(userData);

    dispatch(userSuccess(data));
    navigate("/");
  } catch (error) {
    dispatch(userError());
    console.log(error);
  }
};

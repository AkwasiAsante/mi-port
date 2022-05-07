import * as api from "./index";
import {
  profileError,
  profileStart,
  profileSuccess,
  singleProfile,
} from "../profileReducer";

export const createProfile = async (userData, dispatch, navigate) => {
  dispatch(profileStart());
  console.log(userData);
  try {
    const { data } = await api.createProfile(userData);
    console.log(data);
    dispatch(profileSuccess(data));
    navigate(`/profile/${data.userId}`);
  } catch (error) {
    console.log(error);
    dispatch(profileError());
  }
};

export const getProfiles = async (page, dispatch) => {
  dispatch(profileStart(page, dispatch));

  try {
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchProfiles(page);

    dispatch(profileSuccess({ data, currentPage, numberOfPages }));
  } catch (error) {
    console.log(error);
    dispatch(profileError());
  }
};

export const getProfileBySearch = async (searchQuery, dispatch) => {
  try {
    dispatch(profileStart());

    const { data } = await api.fetchProfileBySearch(searchQuery);

    dispatch(profileSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(profileError());
  }
};

export const getProfile = async (profileId, dispatch) => {
  try {
    dispatch(profileStart());

    const { data } = await api.fetchProfile(profileId);

    dispatch(singleProfile(data));
  } catch (error) {
    console.log(error);
    dispatch(profileError());
  }
};

export const updateProfile = async (id, userData, dispatch, navigate) => {
  dispatch(profileStart());
  try {
    const { data } = await api.updateProfile(id, userData);

    dispatch(profileSuccess(data));
    navigate(`/profile/${userData.userId}`);
  } catch (error) {
    console.log(error);
    dispatch(profileError());
  }
};

export const deleteProfile = async (id) => {
  try {
    await api.deleteProfile(id);
  } catch (error) {
    console.log(error);
  }
};

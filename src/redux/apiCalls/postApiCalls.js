import * as api from "./index";
import {
  postStart,
  postSuccess,
  postError,
  postSinglePost,
} from "../postReducer";

export const createPost = async (postData, dispatch, navigate) => {
  dispatch(postStart());

  try {
    const { data } = await api.createPost(postData);

    dispatch(postSuccess(data));
    navigate(`/posts/${data._id}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const getPosts = async (page, dispatch) => {
  dispatch(postStart(page, dispatch));

  try {
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);

    dispatch(postSuccess({ data, currentPage, numberOfPages }));
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const getPostsBySearch = async (searchQuery, dispatch) => {
  try {
    dispatch(postStart());

    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch(postSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const getPostsByCreator = async (creator, dispatch) => {
  try {
    dispatch(postStart());

    const { data } = await api.fetchPostsByCreator(creator);

    dispatch(postSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const getPost = async (id, dispatch) => {
  try {
    dispatch(postStart());

    const { data } = await api.fetchPost(id);

    dispatch(postSinglePost(data));
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const updatePost = async (id, post, dispatch, navigate) => {
  dispatch(postStart());
  try {
    const { data } = await api.updatePost(id, post);

    dispatch(postSuccess(data));

    navigate(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const likePost = async (id, dispatch) => {
  const user = JSON.parse(localStorage.getItem("userProfile"));

  try {
    const { data } = await api.likePost(id, user?.token);
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const commentPost = async (value, id, dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch(postSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(postError());
  }
};

export const deletePost = async (id, navigate) => {
  try {
    await api.deletePost(id);

    // dispatch(postSuccess(data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

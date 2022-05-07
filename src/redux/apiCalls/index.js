import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({
  baseURL: "https://arcane-brushlands-41356.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userProfile")).token
    }`;
  }

  return req;
});

//POST CALLS
export const getAllPosts = () => API.get("/posts/getall");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (creator) =>
  API.get(`/posts/creator?name=${creator}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//USER AUTHENTICATIONS
export const signIn = (userData) => API.post("/user/signin", userData);
export const signUp = (userData) => API.post("/user/signup", userData);

//PROFILE CALLS
export const getAllProfiles = () => API.get("/profile/view-profile");
export const fetchProfile = (id) => API.get(`/profile/${id}`);
export const fetchProfiles = (page) =>
  API.get(`/profile/view-profile?page=${page}`);
export const fetchProfileByCreator = (name) =>
  API.get(`/profile/creator?name=${name}`);
export const fetchProfileBySearch = (searchQuery) =>
  API.get(
    `/profile/search?searchQuery=${searchQuery.search || "none"}&skills=${
      searchQuery.skills
    }`
  );

export const createProfile = (newProfile) => API.post("/profile", newProfile);
export const updateProfile = (id, userData) =>
  API.patch(`/profile/${id}`, userData);
export const deleteProfile = (id) => API.delete(`/profile/${id}`);

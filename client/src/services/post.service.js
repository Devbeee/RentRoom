import axiosConfig from "../config/axiosConfig";
import axios from "axios";
export const apiGetPosts = async () => {
  try {
    const response = await axiosConfig.get("/post/all");
    return response;
  } catch (error) {
    return error;
  }
};
export const apiGetPostsLimit = async (query) => {
  try {
    const response = await axiosConfig.get(`/post/limit`, { params: query });
    return response;
  } catch (error) {
    return error;
  }
};

export const apiGetNewPosts = async (query) => {
  try {
    const response = await axiosConfig.get(`/post/new-posts`, {
      params: query,
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const apiUploadImages = async (images) => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
      images
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const apiCreatePost = async (payload) => {
  try {
    const response = await axiosConfig.post("/post/create",payload);
    return response;
  } catch (error) {
    return error;
  }
};

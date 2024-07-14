import axiosConfig from "../config/axiosConfig";

export const apiGetPosts = async () => {
  try {
    const response = await axiosConfig.get("/post/all");
    return response;
  } catch (error) {
    return error;
  }
};
export const apiGetPostsLimit = async (page) => {
  try {
    const response = await axiosConfig.get(`/post/limit?page=${page}`);
    return response;
  } catch (error) {
    return error;
  }
};

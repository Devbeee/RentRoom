import axiosConfig from "../config/axiosConfig";

// GET ALL CATEGORY
export const apiGetCategories = async () => {
  try {
    const response = await axiosConfig.get("/category/all");
    return response;
  } catch (error) {
    return error;
  }
};

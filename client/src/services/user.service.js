import axiosConfig from "../config/axiosConfig";
export const apiGetCurrentUser = async () => {
  try {
    const response = await axiosConfig.get("/user/get-current");
    return response;
  } catch (error) {
    return error;
  }
};

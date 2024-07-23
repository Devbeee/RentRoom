import axiosConfig from "../config/axiosConfig";
export const apiGetCurrentUser = async () => {
  try {
    const response = await axiosConfig.get("/user/get-current");
    return response;
  } catch (error) {
    return error;
  }
};
export const apiUpdateUser = async (payload) => {
  try {
    const response = await axiosConfig.put("/user/update", payload);
    return response;
  } catch (error) {
    return error;
  }
};

import axiosConfig from "../config/axiosConfig";

export const apiRegister = async (payload) => {
  try {
    const response = await axiosConfig.post("/auth/register", payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const apiLogin = async (payload) => {
  try {
    const response = await axiosConfig.post("/auth/login", payload);
    return response;
  } catch (error) {
    return error;
  }
};

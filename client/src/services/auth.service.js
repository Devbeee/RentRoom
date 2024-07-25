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

export const apiSendOTP = async (payload) => {
  try {
    const response = await axiosConfig.post("/auth/send-otp", payload);
    return response;
  } catch (error) {
    return error;
  }
};
export const apiVerifyOTP = async (payload) => {
  try {
    const response = await axiosConfig.post("/auth/verify-otp", payload);
    return response;
  } catch (error) {
    return error;
  }
};

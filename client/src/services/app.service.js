import axiosConfig from "../config/axiosConfig";
export const apiGetPrices = async () => {
  try {
    const response = await axiosConfig.get("/price/all");
    return response;
  } catch (error) {
    return error;
  }
};

export const apiGetAreas = async () => {
  try {
    const response = await axiosConfig.get("/area/all");
    return response;
  } catch (error) {
    return error;
  }
};

export const apiGetProvinces = async () => {
  try {
    const response = await axiosConfig.get("/province/all");
    return response;
  } catch (error) {
    return error;
  }
};

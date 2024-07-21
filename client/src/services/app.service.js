import axiosConfig from "../config/axiosConfig";
import axios from "axios";
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
export const apiGetPublicProvinces = async () => {
  try {
    const response = await axios.get("https://vapi.vnappmob.com/api/province/");
    return response;
  } catch (error) {
    return error;
  }
};
export const apiGetPublicDistrict = async (provinceId) => {
  try {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${provinceId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

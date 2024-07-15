import actionType from "./actionType";
import { apiGetCategories, apiGetPrices, apiGetAreas } from "../../services";

export const GetCategories = () => async (dispatch) => {
  try {
    const response = await apiGetCategories();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CATEGORIES,
        categories: response?.data.response,
        msg: response?.data.msg,
      });
    } else {
      dispatch({
        type: actionType.GET_CATEGORIES,
        categories: null,
        msg: response?.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CATEGORIES,
      categories: null,
      msg: "",
    });
  }
};
export const GetPrices = () => async (dispatch) => {
  try {
    const response = await apiGetPrices();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRICES,
        prices: response.data.response.sort((a, b) => {
          return +a.order - +b.order;
        }),
        msg: response?.data.msg,
      });
    } else {
      dispatch({
        type: actionType.GET_PRICES,
        prices: null,
        msg: response?.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRICES,
      prices: null,
      msg: "",
    });
  }
};
export const GetAreas = () => async (dispatch) => {
  try {
    const response = await apiGetAreas();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_AREAS,
        areas: response.data.response.sort((a, b) => {
          return +a.order - +b.order;
        }),
        msg: response?.data.msg,
      });
    } else {
      dispatch({
        type: actionType.GET_AREAS,
        areas: null,
        msg: response?.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_AREAS,
      areas: null,
      msg: "",
    });
  }
};

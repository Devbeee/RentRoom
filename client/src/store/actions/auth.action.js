import actionType from "./actionType";
import {
  apiRegister,
  apiLogin,
  apiVerifyOTP,
} from "../../services/auth.service";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.REGISTER_SUCCESS,
      });
    } else {
      dispatch({
        type: actionType.REGISTER_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.REGISTER_FAIL,
      data: null,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionType.LOGIN_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.LOGIN_FAIL,
      data: null,
    });
  }
};
export const logout = (dispatch) => {
  dispatch({
    type: actionType.LOGOUT,
  });
};

export const verifyOTP = (payload) => async (dispatch) => {
  try {
    const response = await apiVerifyOTP(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.VERIFY_SUCCESS,
        data: response.data.token,
        msg: "",
      });
    } else {
    }
  } catch (error) {
    return error;
  }
};

import actionType from "./actionType";
import { apiGetCurrentUser } from "../../services";

export const GetCurrentUser = () => async (dispatch) => {
  try {
    const response = await apiGetCurrentUser();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CURRENT_USER,
        userData: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CURRENT_USER,
        msg: response.data.msg,
        userData: null,
      });
      dispatch({
        type: actionType.LOGOUT,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CURRENT_USER,
      msg: error,
      userData: null,
    });
    dispatch({
      type: actionType.LOGOUT,
    });
  }
};

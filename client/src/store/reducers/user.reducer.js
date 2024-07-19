import actionType from "../actions/actionType";
const initState = {
  userData: {},
  msg: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENT_USER:
      return {
        ...state,
        userData: action.userData,
        msg: action.msg,
      };
    case actionType.LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default userReducer;

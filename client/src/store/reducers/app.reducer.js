import actionType from "../actions/actionType";
const initState = {
  msg: "",
  categories: [],
  prices: [],
  areas: [],
  provinces: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    case actionType.GET_PRICES:
      return {
        ...state,
        prices: action.prices || [],
        msg: action.msg || "",
      };
    case actionType.GET_AREAS:
      return {
        ...state,
        areas: action.areas || [],
        msg: action.msg || "",
      };
    case actionType.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default appReducer;

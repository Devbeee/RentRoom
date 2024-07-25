import actionType from "../actions/actionType";

const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
  outStandingPosts: [],
  postsOfAdmin: [],
  dataEdit: {},
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
    case actionType.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionType.GET_NEW_POST:
      return {
        ...state,
        newPosts: action.newPosts || [],
        msg: action.msg || "",
      };
    case actionType.GET_OUTSTANDING_POSTS:
      return {
        ...state,
        outStandingPosts: action.outStandingPosts || [],
        msg: action.msg || "",
      };
    case actionType.GET_POSTS_LIMIT_ADMIN:
      return {
        ...state,
        postsOfAdmin: action.postsOfAdmin || [],
        msg: action.msg || "",
      };
    case actionType.EDIT_POST:
      return {
        ...state,
        dataEdit: action.dataEdit || {},
      };
    case actionType.RESET_POST:
      return {
        ...state,
        dataEdit: {},
      };
    default:
      return state;
  }
};

export default postReducer;

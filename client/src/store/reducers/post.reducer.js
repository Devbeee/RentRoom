import actionType from "../actions/actionType";

const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
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
    default:
      return state;
  }
};

export default postReducer;

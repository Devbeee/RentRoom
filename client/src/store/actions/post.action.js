import actionType from "./actionType";
import {
  apiGetNewPosts,
  apiGetPosts,
  apiGetPostsLimit,
  apiGetPostsLimitAdmin,
} from "../../services/post.service";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POSTS,
      posts: null,
    });
  }
};

export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POSTS_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionType.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};

export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await apiGetNewPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_NEW_POST,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_NEW_POST,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_NEW_POST,
      newPosts: null,
    });
  }
};
export const getPostsLimitAdmin = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimitAdmin(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POSTS_LIMIT_ADMIN,
        postsOfAdmin: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionType.GET_POSTS_LIMIT_ADMIN,
        msg: response.data.msg,
        postsOfAdmin: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POSTS_LIMIT_ADMIN,
      postsOfAdmin: null,
    });
  }
};
export const editPost = (dataEdit) => (dispatch) => {
  dispatch({
    type: actionType.EDIT_POST,
    dataEdit,
  });
};
export const resetPost = (dispatch) => {
  dispatch({
    type: actionType.RESET_POST,
  });
};
export const getOutStandingPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit({
      limitPost: 5,
      order: ["star", "DESC"],
    });
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_OUTSTANDING_POSTS,
        outStandingPosts: response?.data?.response?.rows,
      });
    } else {
      dispatch({
        type: actionType.GET_OUTSTANDING_POSTS,
        msg: response.data.msg,
        outStandingPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_OUTSTANDING_POSTS,
      outStandingPosts: null,
    });
  }
};

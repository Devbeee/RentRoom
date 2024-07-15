import actionType from "./actionType";
import {
  apiGetNewPosts,
  apiGetPosts,
  apiGetPostsLimit,
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

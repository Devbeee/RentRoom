import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import appReducer from "./app.reducer";

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

// Common configuration for redux-persist
const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

// Specific configuration for the auth reducer
const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"], // Specify which parts of the state to persist
};

// Combine reducers, applying persistence to the auth reducer
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
  app: appReducer,
});

// Export the combined root reducer
export default rootReducer;

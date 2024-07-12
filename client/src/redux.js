import rootReducer from "./store/reducers/root.reducer";
import { persistStore } from "redux-persist";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
const reduxStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
export default reduxStore;

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "../reducers";

const middlewares = [thunk];

const initialState = {};

const Store = createStore(
  RootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

export default Store;

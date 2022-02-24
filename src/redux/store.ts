import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "./reducers/index";
import thunk from "redux-thunk";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "{}")
  : [];
const INITIAL_STATE = {
  cart: {
    cart: cartFromLocalStorage,
  },
};

const store = createStore(
  reducers,
  INITIAL_STATE as any,
  composeEnhancers(applyMiddleware(thunk))
);

export const cartState: any = store.getState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

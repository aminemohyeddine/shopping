import { combineReducers } from "redux";
import { getAllProducts } from "./productReducers/ProductReducers";
import { cartReducer } from "./cartReducer/cart.reducers";

export const reducers = combineReducers({
  allProducts: getAllProducts,
  cart: cartReducer,
});

export type AppState = ReturnType<typeof reducers>;

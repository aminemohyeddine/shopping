import { Dispatch } from "react";
import { actionConstants } from "../../constants/actionConstants";
import { ProductI } from "../../interfaces/ProductTypes";
import {
  addToCartActionI,
  AdjustQtyActionI,
  removeCartActionI,
  removeAllProductsFromCartInterface,
} from "../../interfaces/CarteTypes";

export const addToCart = (id: string, data: ProductI[], itemNumber: number) => {
  return (dispatch: Dispatch<addToCartActionI>) =>
    dispatch({
      type: actionConstants.ADD_TO_CART,
      payload: {
        id: id,
        data: data,
        itemNumber: itemNumber,
      },
    });
};

export const minusToCart = (
  id: string,
  data: ProductI[],
  itemNumber: number
) => {
  return (dispatch: Dispatch<addToCartActionI>) =>
    dispatch({
      type: "minusToCart",
      payload: {
        id: id,
        data: data,
        itemNumber: itemNumber,
      },
    });
};

export const addToCartFromProductPage = (
  id: string,
  data: ProductI[],
  itemNumber: number
) => {
  return (dispatch: Dispatch<addToCartActionI>) =>
    dispatch({
      type: actionConstants.ADD_TO_CART_FROM_PRODUCT_PAGE,
      payload: {
        id: id,
        data: data,
        itemNumber: itemNumber,
      },
    });
};

export const removeFromCart = (itemID: string) => {
  return (dispatch: Dispatch<removeCartActionI>) =>
    dispatch({
      type: actionConstants.REMOVE_FROM_CART,
      payload: {
        id: itemID,
      },
    });
  // localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};

export const adjustQty = (itemID: string, qty: number, data: ProductI[]) => {
  return (dispatch: Dispatch<AdjustQtyActionI>) =>
    dispatch({
      type: actionConstants.ADJUST_QTY,
      payload: {
        id: itemID,
        qty: qty,
        data: data,
      },
    });
  // localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};

export const loadCurrentItem = (item: number) => {
  return {
    type: actionConstants.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export const removeAllProductsFromCart = () => {
  return (dispatch: Dispatch<removeAllProductsFromCartInterface>) =>
    dispatch({
      type: actionConstants.REMOVE_ALL_PRODUCTS_FROM_CART,
    });
  // localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};

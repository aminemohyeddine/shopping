import { actionConstants } from "../constants/actionConstants";
import { ProductI } from "./ProductTypes";

export interface CartActionI {
  type:
    | actionConstants.REMOVE_FROM_CART
    | actionConstants.LOAD_CURRENT_ITEM
    | actionConstants.ADJUST_QTY
    | actionConstants.ADD_TO_CART
    | actionConstants.CLEAR_LOCAL_STORAGE;
  payload: {
    id: string;
    data: Array<ProductI>;
    qty: number;
    item: ProductI;
  };
}

export interface initialCartStateI {
  data: [];
  cart: Array<ProductI>;
  currentItem: null;
}

export interface PayloadCartI {
  id: string;
  data: ProductI[];
  itemNumber: number;
  product: ProductI;
  cartItem: ProductI;
  qty: number;
}

export interface getAllProductActionI {
  type:
    | actionConstants.ADD_TO_CART
    | actionConstants.ADD_TO_CART_FROM_PRODUCT_PAGE
    | actionConstants.REMOVE_FROM_CART
    | actionConstants.ADJUST_QTY
    | actionConstants.LOAD_CURRENT_ITEM
    | actionConstants.REMOVE_ALL_PRODUCTS_FROM_CART;
  payload: PayloadCartI;
}

export interface addToCartActionI {
  type:
    | actionConstants.ADD_TO_CART
    | actionConstants.ADD_TO_CART_FROM_PRODUCT_PAGE;

  payload: {
    id: string;
    data: ProductI[];
    itemNumber: number;
  };
}

export interface AdjustQtyActionI {
  type: actionConstants.ADJUST_QTY;
  payload: {
    id: string;
    data: ProductI[];
    qty: number;
  };
}

export interface removeCartActionI {
  type: actionConstants.REMOVE_FROM_CART;
  payload: {
    id: string;
  };
}

export interface removeAllProductsFromCartInterface {
  type: actionConstants.REMOVE_ALL_PRODUCTS_FROM_CART;
}

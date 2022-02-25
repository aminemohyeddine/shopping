import { getAllProductActionI } from "../../interfaces/CarteTypes";
import { actionConstants as ActionTypes } from "../../constants/actionConstants";
import { ProductInterface } from "../../../interfaces/productsInterfaces";

const INITIAL_STATE = {
  data: [],
  cart: [],
  currentItem: null,
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: getAllProductActionI
) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const allProducts = action.payload.data;
      //get item from data
      const item = allProducts.find(
        (prod: ProductInterface) => prod._id === action.payload.id
      );
      //number of product to add
      const itemNumber = action.payload.itemNumber;
      //check if the item is already in cart
      const inCart = state.cart.find((cartItem: ProductInterface) =>
        cartItem._id === action.payload.id ? true : false
      );

      return {
        ...state,
        data: allProducts,
        cart: inCart
          ? state.cart.map((cartItem: ProductInterface, key) =>
              cartItem._id === action.payload.id &&
              cartItem.qty + itemNumber <= cartItem.countInStock
                ? { ...cartItem, qty: cartItem.qty + itemNumber }
                : cartItem._id === action.payload.id &&
                  cartItem.qty + itemNumber > cartItem.countInStock
                ? { ...cartItem, qty: cartItem.countInStock }
                : { ...cartItem }
            )
          : [...state.cart, { ...item, qty: itemNumber }],
      };

    case ActionTypes.ADD_TO_CART_FROM_PRODUCT_PAGE:
      const data = action.payload.data;
      //get item from data
      const product = data.find(
        (prod: ProductInterface) => prod._id === action.payload.id
      );
      //number of product to add
      const itemNum = action.payload.itemNumber;
      //check if the item is already in cart
      const inCart2 = state.cart.find((cartItem: ProductInterface) =>
        cartItem._id === action.payload.id ? true : false
      );

      return {
        ...state,
        data: action.payload.data,

        cart: inCart2
          ? state.cart.map((cartItem: ProductInterface, key) =>
              cartItem._id === action.payload.id
                ? { ...cartItem, qty: itemNum }
                : { ...cartItem }
            )
          : [...state.cart, { ...product, qty: itemNum }],
      };

    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item: ProductInterface) => item._id !== action.payload.id
        ),
      };
    case ActionTypes.REMOVE_ALL_PRODUCTS_FROM_CART:
      return {
        ...state,
        cart: [],
      };
    case ActionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item: ProductInterface, key) =>
          item._id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case ActionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    default:
      return state;
  }
};

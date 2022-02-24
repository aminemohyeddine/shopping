import { actionConstants } from "../../constants/actionConstants";
import { Dispatch } from "redux";
import { ProductI } from "../../interfaces/ProductTypes";

export const setProducts = (products: []) => {
  return (dispatch: Dispatch<any>) =>
    dispatch({
      type: actionConstants.GetSelectedProduct,
      payload: products,
    });
};

export const selectedProduct = (product: {}) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionConstants.SELECTED_PRODUCT,
      payload: product,
    });
  };
};

export const removeSelectedProduct = () => {
  return (dispatch: Dispatch<any>) =>
    dispatch({
      type: actionConstants.REMOVE_SELECTED_PRODUCT,
    });
};

export const getSearchProduct = (products: ProductI[], searchName: string) => {
  return (dispatch: Dispatch<any>) =>
    dispatch({
      type: actionConstants.GET_SEARCH_PRODUCT,
      payload: {
        products: products,
        searchName: searchName,
      },
    });
};

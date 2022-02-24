import { actionConstants } from "../../constants/actionConstants";
import { getAllProductActionI } from "../../interfaces/ProductTypes";

export const getAllProducts = (
  state = {
    test: [],
    products: [],
    product: {},
    productSearched: [],
  },
  action: getAllProductActionI
) => {
  switch (action.type) {
    case actionConstants.GetSelectedProduct:
      return { ...state, products: action.payload };
    case actionConstants.SELECTED_PRODUCT:
      return { ...state, product: action.payload };
    case actionConstants.REMOVE_SELECTED_PRODUCT:
      return { ...state, product: {} };
    case actionConstants.GET_SEARCH_PRODUCT:
      return {
        ...state,
        productSearched: action.payload.products.filter((data) => {
          return data.title
            .toString()
            .toLocaleLowerCase()
            .includes(action.payload.searchName.toLocaleLowerCase());
        }),
      };
    default:
      return state;
  }
};

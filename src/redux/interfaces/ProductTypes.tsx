import { actionConstants } from "../constants/actionConstants";

export interface ProductI {
  _id: string;
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  qty: number;
  __v: number;
  comments: [
    {
      rating: number;
      _id: string;
      userName: string;
      description: string;
    }
  ];
}

export interface PayloadI {
  products: ProductI[];
  searchName: string;
  product: ProductI;
}

export interface getAllProductActionI {
  type:
    | actionConstants.SELECTED_PRODUCT
    | actionConstants.GetSelectedProduct
    | actionConstants.GET_SEARCH_PRODUCT
    | actionConstants.REMOVE_SELECTED_PRODUCT
    | actionConstants.GetSelectedProduct;
  payload: PayloadI;
}

export interface getAllProductInitialState {
  test: [];
  products: [];
  product: {};
  productSearched: [];
}

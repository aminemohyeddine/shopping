import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchProduct } from "../../redux/actions/productActions/productActions";
import "./SearchBar.css";
import { ProductInterface } from "../../interfaces/productsInterfaces";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  searchItem: boolean;
  setSearchItem: Dispatch<SetStateAction<boolean>>;
}

export const SearchBar: React.FC<Props> = ({ searchItem, setSearchItem }) => {
  const cartHolder: { cart: ProductInterface[] } = useAppSelector(
    (state) => state.cart
  );
  const cart = cartHolder.cart;
  const allProduct: {
    test: [];
    products: ProductInterface[];
    product: ProductInterface;
    productSearched: ProductInterface;
  } = useAppSelector((state) => state.allProducts);

  const productsALL: ProductInterface[] = allProduct.products;

  const [cartCount, setCartCount] = useState<number>(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>("");

  const run = () => {
    dispatch(getSearchProduct(productsALL, search));
    setSearchItem(true);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let count = 0;
    cart.forEach((element: ProductInterface) => {
      count = count + element.qty;
    });
    setCartCount(count);
  }, [cart, cartCount]);

  useEffect(() => {
    if (search !== "") {
      run();
    } else if (search === "") {
      setSearchItem(false);
    }
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* <div className="form">
        <input onChange={changeHandler} type="text" name="text" />
        <label htmlFor="text" className="label-name">
          <span className="content-name">Your Text</span>
        </label>
        
      </div> */}
      <div className="searchBarContainer">
        <input
          style={{ color: "#000000" }}
          onChange={(e) => {
            changeHandler(e);
          }}
          type="text"
          name="text"
          autoComplete="off"
          required
          className="inp"
        />
        <label htmlFor="text" className="searchBarLabel">
          <span style={{ color: "#289381" }} className="searchBarContent">
            search for a product
          </span>
        </label>
      </div>
    </>
  );
};

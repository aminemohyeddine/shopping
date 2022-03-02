import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchProduct } from "../../redux/actions/productActions/productActions";
import "./SearchBar.css";
import { ProductInterface } from "../../interfaces/productsInterfaces";
import { useAppSelector } from "../../redux/hooks";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

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

  const changeHandler = (e: any) => {
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
      <Grid item xs={4} sm={4}>
        <TextField
          style={{ color: "red" }}
          id="searchInput"
          name="searchInput"
          label="search for a product"
          fullWidth
          onChange={(e) => {
            changeHandler(e);
          }}
          autoComplete="given-name"
          variant="standard"
        />
      </Grid>
    </>
  );
};

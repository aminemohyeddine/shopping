import React, { useState, useEffect } from "react";
import { HomePageHeader } from "../homePage/homePageHeader/HomePageHeader";
import { CategoriesBar } from "./categoriesBar/CategoriesBar";
import { Categories } from "./categories/Categories";
import { setProducts } from "../../redux/actions/productActions/productActions";
import { useDispatch } from "react-redux";
import { ProductInterface } from "../../interfaces/productsInterfaces";

import axios from "axios";

export const HomePagee = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);

  const fetchProducts = async () => {
    const getAllLink: string = process.env.REACT_APP_GET_ALL_PRODUCTS as string;
    const products = await axios.get(getAllLink);
    dispatch(setProducts(products.data));
    const allCat: string[] = products.data.reduce(
      (acc: any, val: ProductInterface) => {
        let cat: string = val.category;
        let categoryExist: boolean = acc.includes(cat);
        if (!categoryExist) {
          acc.push(val.category);
        }
        return acc;
      },
      []
    );
    setCategories(allCat);
  };

  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <HomePageHeader />
      <CategoriesBar />
      <Categories categories={categories} />
    </>
  );
};

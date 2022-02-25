import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ProductComponent } from "./components/ProductComponent";
import { setProducts } from "../../redux/actions/productActions/productActions";
import { SearchBar } from "../../components/navBar/SearchBar";
import "./productPage.css";

interface Props {
  searchItem: boolean;
  setSearchItem: Dispatch<SetStateAction<boolean>>;
}

export const ProductListing: React.FC<Props> = ({
  searchItem,
  setSearchItem,
}) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    const getAllLink: string = process.env.REACT_APP_GET_ALL_PRODUCTS as string;
    const products = await axios.get(getAllLink);

    const result = products.data.reduce(function (r: any, a: any) {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));

    setCategories(result);
    dispatch(setProducts(products.data));
  };
  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div className="products-container">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <h1
            style={{
              height: "7vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            our products{" "}
          </h1>
          <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
          <div></div>
        </div>
        <div className={!searchItem ? "products" : "productSearch"}>
          <ProductComponent
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

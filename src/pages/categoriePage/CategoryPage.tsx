import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./CategoryPage.css";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { ProductInterface } from "../../interfaces/productsInterfaces";
import { SingleProduct } from "../productsPage/components/SingleProduct";
import { setProducts } from "../../redux/actions/productActions/productActions";
import { SearchBar } from "../../components/navBar/SearchBar";

import "react-multi-carousel/lib/styles.css";

interface Props {
  searchItem: boolean;
  setSearchItem: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoryPagee: React.FC<Props> = ({
  searchItem,
  setSearchItem,
}) => {
  const dispatch = useDispatch();
  let { categoryName }: any = useParams();

  const allProduct: {
    test: [];
    products: ProductInterface[];
    product: ProductInterface;
    productSearched: ProductInterface[];
  } = useAppSelector((state) => state.allProducts);
  const products: ProductInterface[] = allProduct.products;
  const searchProducts: ProductInterface[] = allProduct.productSearched;

  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const getAllLink: string = (process.env
        .REACT_APP_GET_PRODUCT_BY_CATEGORY + categoryName) as string;
      const products = await axios.get(getAllLink);
      setCategoryData(products.data);
      dispatch(setProducts(products.data));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {!loading ? (
        <>
          {searchItem ? (
            <div className="categoryPageContainer">
              <div className="categoryPageTitleSearchSectionContainer">
                <div className="categoryPageTitle">
                  {categoryName} products :
                </div>
                <SearchBar
                  searchItem={searchItem}
                  setSearchItem={setSearchItem}
                />
                <div></div>
              </div>
              <div className="categoryDataContaine">
                <div className="itemContainer">
                  {searchProducts.length === 0 ? (
                    <div className="emptySearchPageContainer">
                      <div className="emptySearchText">
                        no data available with that name
                      </div>
                    </div>
                  ) : (
                    <>
                      {searchProducts.map((item, index) => (
                        <div key={index} style={{ marginBottom: "80px" }}>
                          <SingleProduct item={item} products={products} />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="categoryPageContainer">
              <div className="categoryPageTitleSearchSectionContainer">
                <div className="categoryPageTitle">{categoryName} products</div>
                <SearchBar
                  searchItem={searchItem}
                  setSearchItem={setSearchItem}
                />
                <div></div>
              </div>
              <div className="categoryDataContaine">
                <div className="itemContainer">
                  {categoryData.map((item, index) => (
                    <div key={index} style={{ marginBottom: "80px" }}>
                      <SingleProduct item={item} products={products} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="productsPageLoadingContainer">
          <div>
            <ReactLoading
              color="#289381"
              type="spin"
              height={100}
              width={100}
            />
          </div>
        </div>
      )}
    </>
  );
};

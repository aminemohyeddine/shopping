import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import ReactLoading from "react-loading";
import { ProductInterface } from "../../../interfaces/productsInterfaces";
import { SingleProduct } from "./SingleProduct";

import "./productComponent.css";

interface Props {
  searchItem: boolean;
  setSearchItem: React.Dispatch<React.SetStateAction<boolean>>;
  categories: any;
}

export const ProductComponent: React.FC<Props> = ({
  searchItem,
  setSearchItem,
  categories,
}) => {
  const allProduct: {
    test: [];
    products: ProductInterface[];
    product: ProductInterface;
    productSearched: ProductInterface[];
  } = useAppSelector((state) => state.allProducts);
  const products: ProductInterface[] = allProduct.products;
  const searchProducts: ProductInterface[] = allProduct.productSearched;

  return (
    <>
      {searchItem ? (
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            flexWrap: "wrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#deedea",
            width: "100%",
          }}
          className="div"
        >
          {searchProducts.length === 0 ? (
            <div
              style={{
                height: "56.9vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              no product with this name available
            </div>
          ) : (
            <>
              {searchProducts.map((product: ProductInterface, key: number) => {
                return (
                  <SingleProduct key={key} products={products} item={product} />
                );
              })}
            </>
          )}
        </div>
      ) : (
        <>
          {Object.keys(categories).length !== 0 ? (
            <div className="categoriesPageContainer">
              {Object.keys(categories).map((keyName, key) => (
                <div
                  key={key}
                  className="CategoryContainer"
                  style={{
                    backgroundColor:
                      key === 0
                        ? "#deedea"
                        : key === 1
                        ? "#f5e5d5"
                        : key === 2
                        ? "#e8dbe5"
                        : key === 3
                        ? "#e8dbe5"
                        : "black",
                  }}
                >
                  <div className="categoryName">{keyName} :</div>
                  <div className="categoriesListContainer">
                    {categories[keyName].map(
                      (item: ProductInterface, key: number) => (
                        <div key={key} className="a">
                          <SingleProduct products={products} item={item} />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
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
      )}
    </>
  );
};

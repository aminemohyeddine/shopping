import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import ReactLoading from "react-loading";
import { ProductInterface } from "../../../interfaces/productsInterfaces";
import { SingleProduct } from "./SingleProduct";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./productComponent.css";

interface Props {
  searchItem: boolean;
  setSearchItem: React.Dispatch<React.SetStateAction<boolean>>;
  categories: any;
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 840 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 840, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
            <>
              {Object.keys(categories).map((keyName, key) => (
                <div
                  key={key}
                  style={{ height: "75vh", width: "100%" }}
                  className=""
                >
                  <h1 className="categoryName">{keyName}</h1>
                  <Carousel
                    ssr
                    partialVisible
                    swipeable={true}
                    autoPlay={false}
                    draggable={false}
                    responsive={responsive}
                    containerClass="carousel-container"
                    itemClass="carousel-item-padding-40-px"
                  >
                    {categories[keyName].map(
                      (item: ProductInterface, key: number) => (
                        <SingleProduct
                          key={key}
                          products={products}
                          item={item}
                        />
                      )
                    )}
                  </Carousel>
                </div>
              ))}
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
      )}
    </>
  );
};

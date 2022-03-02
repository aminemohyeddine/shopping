import React, { useState } from "react";
import "./productComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductInterface } from "../../../interfaces/productsInterfaces";

import { addToCart } from "../../../redux/actions/cartActions/shoping.action";

interface Props {
  item: any;
  products: ProductInterface[];
}

export const SingleProduct: React.FC<Props> = ({ item, products }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  return (
    <div className="categoryProductContainer">
      <Link
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
        to={`/product/${item._id}`}
      >
        <img
          onMouseEnter={() => setImageIndex(1)}
          onMouseLeave={() => setImageIndex(0)}
          className={
            imageIndex === 0 ? "categoryProductImage" : "categoryProductImage1"
          }
          src={item.imageUrl[imageIndex]}
          alt=""
        />
      </Link>
      <Link to={`/product/${item._id}`}>
        <div className="categoryProductTitle">{item.title}</div>
      </Link>

      <div className="description">{item.description.substring(0, 30)} ...</div>
      <div className="categoryProductStockContainer">
        <div className="categoryProductStockItem">
          stock : {item.countInStock}
        </div>
      </div>
      <div className="categoryProductPriceAddCart">
        <div className="categoryProductPrice">{item.price.toFixed(1)} $</div>
        <div className="addToCart">
          <FontAwesomeIcon
            onClick={() => {
              dispatch(addToCart(item._id, products, 1));
            }}
            className="addToCart"
            icon={faCartPlus}
          />
        </div>
      </div>
    </div>
  );
};

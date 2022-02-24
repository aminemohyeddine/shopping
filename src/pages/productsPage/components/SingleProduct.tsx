import React from "react";
import "./productComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductInterface } from "../../../interfaces/productsInterfaces";

import { addToCart } from "../../../redux/actions/cartActions/shoping.action";

interface Props {
  item: ProductInterface;
  products: ProductInterface[];
}

export const SingleProduct: React.FC<Props> = ({ item, products }) => {
  const dispatch = useDispatch();
  return (
    <div className="categoryProductContainer">
      <Link to={`/product/${item._id}`}>
        <img className="categoryProductImage" src={item.imageUrl} alt="" />
      </Link>
      <Link to={`/product/${item._id}`}>
        <div className="categoryProductTitle">{item.title}</div>
      </Link>

      <div className="description">{item.description.substring(0, 40)} ...</div>
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

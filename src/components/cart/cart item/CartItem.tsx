import React, { useEffect, useState } from "react";
import "./CartItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeFromCart } from "../../../redux/actions/cartActions/shoping.action";
import { faCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface Props {
  item: {
    category: string;
    countInStock: number;
    description: string;
    id: number;
    imageUrl: string;
    price: number;
    qty: number;
    title: string;
    __v: number;
    _id: string;
  };
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const [totalPrice, setTotalPrice] = useState(item.price);
  const total = () => {
    const total = item.price * item.qty;
    setTotalPrice(total);
  };
  useEffect(() => {
    total();
  }, [item.qty]); // eslint-disable-line react-hooks/exhaustive-deps
  const dispatch = useDispatch();

  return (
    <div className="cartItemContainer">
      <div className="topCartItemContainer">
        <div className="cartItemImageContainer">
          <Link className="titleSection" to={`/product/${item.id}`}>
            <img
              className="cartItemImage"
              alt="productImage"
              src={item.imageUrl}
            />
          </Link>
        </div>
        <div className="cartItemInfos">
          <div className="cartItemTitleDeleteSection">
            <div className="titleSection">
              <Link className="titleLink" to={`/product/${item.id}`}>
                {item.title}
              </Link>
            </div>
            <div className="deleteButtonSection">
              <FontAwesomeIcon
                onClick={() => {
                  dispatch(removeFromCart(item._id));
                }}
                className="cartItemDeleteButton"
                icon={faTrashCan}
              />
            </div>
          </div>
          <div className="availableContainer">
            {item.qty > 0 ? (
              <>
                <div style={{ marginRight: "10px" }} className="availableDiv">
                  <div className="availableIcon">
                    <FontAwesomeIcon
                      className="cartItemAvailableIcon"
                      icon={faCircle}
                    />
                  </div>
                  <div className="availableText">available</div>
                </div>

                <div
                  style={{ width: "100px", backgroundColor: "#ffe15e" }}
                  className="availableDiv"
                >
                  <div className="availableIcon">
                    <FontAwesomeIcon
                      className="cartItemAvailableIcon"
                      icon={faCircle}
                      style={{
                        color: "#ff4800",
                      }}
                    />
                  </div>
                  <div style={{ color: "#ff4800" }} className="availableText">
                    {item.countInStock} in stock
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{ backgroundColor: "#fa4984", marginRight: "10px" }}
                className="availableDiv"
              >
                <div className="availableIcon">
                  <FontAwesomeIcon
                    className="cartItemAvailableIcon"
                    icon={faCircle}
                    style={{ color: "red" }}
                  />
                </div>
                <div style={{ color: "black" }} className="availableText">
                  empty
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bottomCartItemContainer">
        <div className="cartItemPrice">
          <span>price:</span>
          <p> {item.price} $</p>
        </div>
        <div className="cartItemPrice">
          <span>qty:</span>
          <p> {item.qty}</p>
        </div>
        <div className="cartItemPrice">
          <span>total:</span>
          <p> {totalPrice.toFixed(2)} $</p>
        </div>
      </div>
    </div>
  );
};

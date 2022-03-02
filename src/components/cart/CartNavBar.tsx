import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//interfaces
import { ProductInterface } from "../../interfaces/productsInterfaces";
import { useAppSelector } from "../../redux/hooks";
import { IRender } from "../../App";
import "./CartNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "./cart item/CartItem";

interface Props {
  itemsShow: {
    cartNavBar: string;
    userUnderSection: boolean;
  };
  setItemsShow: Dispatch<SetStateAction<IRender>>;
}

export const CartNavBar: React.FC<Props> = ({ itemsShow, setItemsShow }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const cartHolder: { cart: ProductInterface[] } = useAppSelector(
    (state) => state.cart
  );
  const cart: ProductInterface[] = cartHolder.cart;
  useEffect(() => {
    let items = 0;
    let price = 0;
    cart.forEach((item: ProductInterface) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <>
      {(() => {
        if (itemsShow.cartNavBar === "inActive") {
          return (
            <>
              <div className="CartNavBarContainerOff">
                <div className="cartNavBarHeader">
                  <p>shopping cart</p>
                  <FontAwesomeIcon
                    onClick={() => {
                      setItemsShow((prevState) => ({
                        ...prevState,
                        cartNavBar: "inActive",
                      }));
                    }}
                    className="closeCartBarIcon"
                    icon={faXmark}
                  />
                </div>
                <div className="cartItemsContainer">
                  {cart.length === 0 ? (
                    <div className="emptyCartContainer">
                      <div className="emptyCartIconContainer">
                        <FontAwesomeIcon
                          className="emptyCartIcon"
                          icon={faCartPlus}
                        />
                      </div>
                      <div className="emptyCartText">
                        <p>
                          You do not have any products in your shopping cart
                        </p>
                      </div>
                      <div className="emptyCartContinueButton">
                        <button
                          onClick={() => {
                            setItemsShow((prevState) => ({
                              ...prevState,
                              cartNavBar: "inActive",
                            }));
                          }}
                          className="continueButton"
                        >
                          CONTINUE SHOPPING
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="CartItemsContainer">
                      {cart.map((item: any, key: number) => {
                        return (
                          <CartItem
                            setItemsShow={setItemsShow}
                            key={key}
                            item={item}
                          />
                        );
                      })}
                      <div className="totalPriceContainer">
                        <div className="totalPriceLine"></div>
                        <div className="totalPriceItems">
                          <div className="totalPriceText">total</div>
                          <div className="totalPrice">
                            {totalPrice.toFixed(2)} $
                          </div>
                        </div>
                      </div>
                      <div className="confirmSection">
                        <Link
                          onClick={() => {
                            setItemsShow((prevState) => ({
                              ...prevState,
                              cartNavBar: "inActive",
                            }));
                          }}
                          to="/confirm"
                          className="purchase"
                        >
                          Confirm
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        } else if (itemsShow.cartNavBar === "active") {
          return (
            <>
              <div className="CartNavBarContainer">
                <div className="cartNavBarHeader">
                  <p>shopping cart</p>
                  <FontAwesomeIcon
                    onClick={() => {
                      setItemsShow((prevState) => ({
                        ...prevState,
                        cartNavBar: "inActive",
                      }));
                    }}
                    className="closeCartBarIcon"
                    icon={faXmark}
                  />
                </div>
                <div className="cartItemsContainer">
                  {cart.length === 0 ? (
                    <div className="emptyCartContainer">
                      <div className="emptyCartIconContainer">
                        <FontAwesomeIcon
                          className="emptyCartIcon"
                          icon={faCartPlus}
                        />
                      </div>
                      <div className="emptyCartText">
                        <p>
                          You do not have any products in your shopping cart
                        </p>
                      </div>
                      <div className="emptyCartContinueButton">
                        <button
                          onClick={() => {
                            setItemsShow((prevState) => ({
                              ...prevState,
                              cartNavBar: "inActive",
                            }));
                          }}
                          className="continueButton"
                        >
                          CONTINUE SHOPPING
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="CartItemsContainer">
                      {cart.map((item: any, key: number) => {
                        return (
                          <CartItem
                            setItemsShow={setItemsShow}
                            key={key}
                            item={item}
                          />
                        );
                      })}
                      <div className="totalPriceContainer">
                        <div className="totalPriceLine"></div>
                        <div className="totalPriceItems">
                          <div className="totalPriceText">total</div>
                          <div className="totalPrice">
                            {totalPrice.toFixed(2)} $
                          </div>
                        </div>
                      </div>
                      <div className="confirmSection">
                        <Link
                          onClick={() => {
                            setItemsShow((prevState) => ({
                              ...prevState,
                              cartNavBar: "inActive",
                            }));
                          }}
                          to="/confirm"
                          className="purchase"
                        >
                          Confirm
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                onClick={() => {
                  setItemsShow((prevState) => ({
                    ...prevState,
                    cartNavBar: "inActive",
                  }));
                }}
                className="greyHeader"
              ></div>
            </>
          );
        } else {
          return null;
        }
      })()}
    </>
  );
};

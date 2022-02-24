import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartItem } from "../../components/cart/cart item/CartItem";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { faStore } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../loginPage/TextField";

//interfaces
import { ProductInterface } from "../../interfaces/productsInterfaces";

import "./ConfirmaPage.scss";

export const ConfirmPage = () => {
  const history = useHistory();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

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
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(cart);

  const sendConfirmedData = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
    email: string
  ) => {
    const sendConfirmedItemsLink: string = process.env
      .REACT_APP_SEND_CONFIRMED_DATA as string;

    try {
      const resp = await axios.post(sendConfirmedItemsLink, {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
        totalPrice: totalPrice,
        selectedItems: cart,
      });
      if (resp) {
        setConfirmed(true);

        setInterval(() => {
          history.push("/products");
        }, 5000);
      }
    } catch (err: any) {
      setMessage(err.response.data);
    }
  };

  return (
    <>
      {confirmed ? (
        <div>
          your request is successfully sent you will be redirected to products
          page after 5sec
        </div>
      ) : (
        <>
          {cart.length === 0 ? (
            <div className="confirmPageEmptyContainer">
              <p>
                <Link to="/products" className="confirmEmptyCartText">
                  your cart is empty click here to shop items
                </Link>
              </p>
            </div>
          ) : (
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .max(40, "email Must be 15 characters or less")
                  .min(5, "email Must be 5 characters or more")
                  .required("* email is Required")
                  .email(),
                firstName: Yup.string()
                  .max(40, "first name Must be 15 characters or less")
                  .min(5, "first name Must be 5 characters or more")
                  .required("* first name is Required"),
                lastName: Yup.string()
                  .max(40, "last name Must be 15 characters or less")
                  .min(5, "last name Must be 5 characters or more")
                  .required("* last name is Required"),
                address: Yup.string()
                  .max(40, "address Must be 15 characters or less")
                  .min(5, "address Must be 5 characters or more")
                  .required("* address is Required"),
                phoneNumber: Yup.string()
                  .max(40, "phone number Must be 15 characters or less")
                  .min(5, "phone number Must be 5 characters or more")
                  .required("* email is Required")
                  .matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    "Phone number is not valid"
                  ),
              })}
              onSubmit={(values) => {
                sendConfirmedData(
                  values.firstName,
                  values.lastName,
                  values.phoneNumber,
                  values.address,
                  values.email
                );
              }}
            >
              {(formik) => (
                <div className="formPageContainer">
                  <div className="confirmPageInputContainer">
                    <div>
                      <div className="messageError">{message}</div>
                      <div className="confirmContainer">
                        <p>
                          <FontAwesomeIcon
                            icon={faStore}
                            style={{
                              color: "#289381",
                              fontSize: "1.5rem",
                              cursor: "pointer",
                            }}
                          />{" "}
                          confirm page
                        </p>
                      </div>
                      <Form>
                        <div className="formContainer">
                          <div className="formFirst">
                            <TextField type="text" name="firstName" />
                            <TextField type="text" name="lastName" />
                            <TextField type="text" name="phoneNumber" />
                          </div>
                          <div className="formTwo">
                            <TextField type="text" name="email" />
                            <TextField type="text" name="address" />
                          </div>
                        </div>
                        <div className="confirmButtonContainer">
                          <button className="confirmButton" type="submit">
                            Confirm Achat
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className="confirmCartItemsContainer">
                    <div className="cartItemsContainer">
                      <div className="CartItemsContainer">
                        {cart.map((item: any, key: number) => {
                          return (
                            <>
                              <CartItem key={key} item={item} />
                            </>
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
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          )}
        </>
      )}
    </>
  );
};

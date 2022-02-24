import React, { SetStateAction, useEffect, Dispatch, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ProductInterface } from "../../../interfaces/productsInterfaces";
import { useAppSelector } from "../../../redux/hooks";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { informationsInterface } from "../ConfirmPage";

interface Props {
  informations: informationsInterface;
  setInformations: Dispatch<SetStateAction<informationsInterface>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

export const Review: React.FC<Props> = ({
  informations,
  setInformations,
  activeStep,
  setActiveStep,
}) => {
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
    console.log("====================================");
    console.log(cart);
    console.log("====================================");
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]); // eslint-disable-line react-hooks/exhaustive-deps

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
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product, key) => (
          <ListItem key={key} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.qty} />
            <Typography variant="body2">$ {product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{informations.firstName}</Typography>
          <Typography gutterBottom>
            {informations.address1}, {informations.address2},{" "}
            {informations.city}, {informations.country} ,{informations.state},
            {informations.zip}
          </Typography>
          <Typography gutterBottom>{informations.phoneNumber}</Typography>
          <Typography gutterBottom>{informations.email}</Typography>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            onClick={() => {
              const address: string =
                informations.address1 +
                " ," +
                informations.address2 +
                " ," +
                informations.city +
                " ," +
                informations.country +
                " ," +
                informations.state +
                " ," +
                informations.zip;
              console.log(address);

              sendConfirmedData(
                informations.firstName,
                informations.lastName,
                informations.phoneNumber,
                address,
                informations.email
              );
              setActiveStep(activeStep + 1);
            }}
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            next
          </Button>
          <Button
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Back
          </Button>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

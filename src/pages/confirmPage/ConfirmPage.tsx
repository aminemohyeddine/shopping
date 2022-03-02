import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useDispatch } from "react-redux";
import { removeAllProductsFromCart } from "../../redux/actions/cartActions/shoping.action";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddressForm } from "./components/AdressForm";
import { ProductInterface } from "../../interfaces/productsInterfaces";
import { useAppSelector } from "../../redux/hooks";

import { Review } from "./components/Review";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        ShopMe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Review your order", "success"];

const theme = createTheme();

export interface informationsInterface {
  address1: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  state: string;
  zip: string;
  phoneNumber: string;
}

export const ConfirmPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartHolder: { cart: ProductInterface[] } = useAppSelector(
    (state) => state.cart
  );
  const cart: ProductInterface[] = cartHolder.cart;

  const [informations, setInformations] = useState<informationsInterface>({
    address1: "",
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    if (activeStep === 2) {
      setTimeout(() => {
        dispatch(removeAllProductsFromCart());
        history.push("/");
      }, 5000);
    }
  }, [activeStep]); // eslint-disable-line react-hooks/exhaustive-deps

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            informations={informations}
            setInformations={setInformations}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );

      case 1:
        return (
          <Review
            informations={informations}
            setInformations={setInformations}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      {cart.length === 0 ? (
        <Typography component="h1" variant="h4" align="center">
          shop items first
        </Typography>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: "relative",
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          ></AppBar>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label, key) => (
                  <Step key={key}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length - 1 ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      we will call as soon as possible to confirm the order ,
                      you will be redirected to the home page after 5 sec.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
                )}
              </React.Fragment>
            </Paper>
            <Copyright />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

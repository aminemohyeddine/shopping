import React, { SetStateAction, Dispatch } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { informationsInterface } from "../ConfirmPage";

import Checkbox from "@mui/material/Checkbox";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
interface Props {
  informations: informationsInterface;
  setInformations: Dispatch<SetStateAction<informationsInterface>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}
export const AddressForm: React.FC<Props> = ({
  informations,
  setInformations,
  activeStep,
  setActiveStep,
}) => {
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("Firstname is required")
      .min(3, "Firstname should be of minimum 3 characters length")
      .max(20, "Firstname should be less than 20 characters"),
    lastName: yup
      .string()
      .min(3, "Lastname should be of minimum 5 characters length")
      .max(20, "Lastname should be less than 20 characters")
      .required("Lastname is required"),
    address1: yup
      .string()
      .min(10, "address 1 should be of minimum 10 characters length")
      .required("address 1 is required"),
    address2: yup
      .string()
      .min(10, "address 2 should be of minimum 10 characters length")
      .required("address 2 is required"),
    city: yup
      .string()
      .min(5, "city should be of minimum 5 characters length")
      .required("city is required"),
    state: yup
      .string()
      .min(3, "state should be of minimum 3 characters length")
      .required("state is required"),
    zip: yup
      .string()
      .min(3, "zip should be of minimum 3 characters length")
      .required("zip is required"),
    country: yup
      .string()
      .min(2, "country should be of minimum 3 characters length")
      .required("country is required"),
    email: yup
      .string()
      .email()
      .min(3, "email should be of minimum 3 characters length")
      .required("email is required"),
    phoneNumber: yup
      .string()
      .min(3, "phone number should be of minimum 3 characters length")
      .required("email is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setInformations(values);
      setActiveStep(activeStep + 1);
    },
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="email"
              fullWidth
              autoComplete="email"
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="phone number"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={formik.values.address1}
              onChange={formik.handleChange}
              error={formik.touched.address1 && Boolean(formik.errors.address1)}
              helperText={formik.touched.address1 && formik.errors.address1}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={formik.values.address2}
              onChange={formik.handleChange}
              error={formik.touched.address2 && Boolean(formik.errors.address2)}
              helperText={formik.touched.address2 && formik.errors.address2}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
              next
            </Button>
          </Box>
        </Grid>
      </form>
    </React.Fragment>
  );
};

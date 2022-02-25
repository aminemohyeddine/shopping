import { SetStateAction, Dispatch, useState } from "react";
//material ui
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
//interfaces
import { UserInterface } from "../../interfaces/userIntarfaces";

interface Props {
  tokenExpired: boolean;
  setTokenExpired: Dispatch<SetStateAction<boolean>>;
  user: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface>>;
  isUserAuth: boolean;
  setIsUserAuth: Dispatch<SetStateAction<boolean>>;
  // setIsUserAuth: Dispatch<SetStateAction<boolean>>;
}

export const LoginPage: React.FC<Props> = ({
  tokenExpired,
  setTokenExpired,
  setUser,
  isUserAuth,
  setIsUserAuth,
}) => {
  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/login">
          SHOPME
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();
  const history = useHistory();
  const [message, setMessage] = useState<string>("");
  const cookies = new Cookies();

  const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const verifyUser = async (token: string) => {
    const verifyTokenLink: string = process.env
      .REACT_APP_GET_VERIFY_TOKEN as string;

    const getUserLink: string = process.env.REACT_APP_GET_GET_USER as string;

    try {
      const resp = await axios.post(verifyTokenLink, {
        method: "POST",
        token: token,
      });
      if (resp) {
        const currentUser = await axios.post(getUserLink, {
          method: "POST",
          id: resp.data._id,
        });
        setUser(currentUser.data);
        cookies.set("userId", resp.data._id, { path: "/" });
        setTokenExpired(true);
        setIsUserAuth(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendLoginData = async (email: string, password: string) => {
    const getLogin: string = process.env.REACT_APP_GET_LOGIN as string;

    try {
      const user = await axios.post(getLogin, {
        email: email,
        password: password,
      });
      if (user) setMessage("");
      cookies.set("userToken", user.data, { path: "/" });
      verifyUser(user.data);
      setIsUserAuth(true);

      history.push("/products");
    } catch (err: any) {
      setMessage(err.response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendLoginData(values.email, values.password);
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Typography color="common.Red" component="h1" variant="h5">
                {message}
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

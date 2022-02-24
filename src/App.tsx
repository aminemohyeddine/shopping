import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";
// import { Navbar } from "./components/navBar/navBar";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//interfaces
import { UserInterface } from "./interfaces/userIntarfaces";

//components
import { CartBar, NavBar, TopHeaderBar } from "./components";

//pages
import {
  LoginAuth,
  AlreadyLogin,
  SignUpAuth,
  ProductsPage,
  ProductDetails,
  ConfirmPagee,
} from "./pages";

export interface IRender {
  cartNavBar: string;
  userUnderSection: boolean;
}
function App() {
  const cookies = new Cookies();
  //handle resizing state to show hamburger menu
  const [normalMenu, setNormalMenu] = useState<boolean>(true);
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [user, setUser] = useState<UserInterface>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userName: "",
    email: "",
    password: "",
    address: "",
    _id: "",
  });

  const [itemsShow, setItemsShow] = useState<IRender>({
    cartNavBar: "",
    userUnderSection: false,
  });
  const [isUserAuth, setIsUserAuth] = useState<boolean>(false);
  const [tokenExpired, setTokenExpired] = useState<boolean>(true);
  const token = cookies.get("userToken");

  const verifyUser = async () => {
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
        setIsUserAuth(true);
        console.log("user is valid");
      }
    } catch (err: any) {
      setIsUserAuth(false);
      if (err.response.data.message === "jwt expired") {
        setTokenExpired(true);
        cookies.set("userId", "", { path: "/" });
        setUser({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          userName: "",
          email: "",
          password: "",
          address: "",
          _id: "",
        });
        cookies.set("userToken", "", { path: "/" });
        console.log("token expired");
      }
    }
  };

  //searchForItem
  const [searchItem, setSearchItem] = useState(false);

  useEffect(() => {
    updateDimensions();
  }, []);

  useEffect(() => {
    const userToken = cookies.get("userToken");
    if (userToken !== "" && userToken !== undefined) {
      console.log("we're verifying the user");
      verifyUser();
    } else {
      setIsUserAuth(false);
      console.log("no user to verify");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateDimensions = () => {
    if (window.innerWidth < 900) {
      setNormalMenu(false);
    } else {
      setNormalMenu(true);
      setShowSideBar(true);
    }
  };

  window.addEventListener("resize", updateDimensions);

  return (
    <Router>
      <TopHeaderBar normalMenu={normalMenu} />
      <NavBar
        tokenExpired={tokenExpired}
        setTokenExpired={setTokenExpired}
        normalMenu={normalMenu}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        itemsShow={itemsShow}
        setItemsShow={setItemsShow}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        user={user}
        setUser={setUser}
        isUserAuth={isUserAuth}
        setIsUserAuth={setIsUserAuth}
      />
      <CartBar itemsShow={itemsShow} setItemsShow={setItemsShow} />

      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <div>
              <Redirect to="/products" />
            </div>
          )}
        />

        <Route
          path="/products"
          exact
          //         LoginAuth,
          // AlreadyLogin,
          // SignUpAuth,
          render={(props) => (
            <div>
              <ProductsPage
                {...props}
                searchItem={searchItem}
                setSearchItem={setSearchItem}
              />
            </div>
          )}
        />

        <Route
          path="/confirm"
          exact
          render={(props) => (
            <div>
              <ConfirmPagee />
            </div>
          )}
        />

        <Route
          path="/product/:productId"
          exact
          render={(props) => (
            <div>
              <ProductDetails user={user} isUserAuth={isUserAuth} />
            </div>
          )}
        />
        <Route
          path="/login"
          exact
          render={(props) => (
            <div>
              {isUserAuth && <AlreadyLogin />}
              {!isUserAuth && (
                <LoginAuth
                  tokenExpired={tokenExpired}
                  setTokenExpired={setTokenExpired}
                  user={user}
                  setUser={setUser}
                  isUserAuth={isUserAuth}
                  setIsUserAuth={setIsUserAuth}
                />
              )}
            </div>
          )}
        />
        <Route path="/signup" exact component={SignUpAuth} />

        <Route>ERROR 4044</Route>
      </Switch>
    </Router>
  );
}

export default App;

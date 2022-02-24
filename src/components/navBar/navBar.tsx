import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUserPlus,
  faAngleDown,
  faAngleUp,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

//interfaces
//interfaces
import { UserInterface } from "../../interfaces/userIntarfaces";
import { ProductInterface } from "../../interfaces/productsInterfaces";

import { IRender } from "../../App";
import { useAppSelector } from "../../redux/hooks";
import { SearchBar } from "./SearchBar";
import Cookies from "universal-cookie";
import "./navBar.css";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";

interface Props {
  normalMenu: boolean;
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
  itemsShow: {
    cartNavBar: string;
    userUnderSection: boolean;
  };
  setItemsShow: Dispatch<SetStateAction<IRender>>;
  searchItem: boolean;
  setSearchItem: Dispatch<SetStateAction<boolean>>;
  tokenExpired: boolean;
  setTokenExpired: Dispatch<SetStateAction<boolean>>;
  user: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface>>;
  isUserAuth: boolean;
  setIsUserAuth: Dispatch<SetStateAction<boolean>>;
}

export const Navbar: React.FC<Props> = ({
  normalMenu,
  showSideBar,
  setShowSideBar,
  itemsShow,
  setItemsShow,
  searchItem,
  setSearchItem,
  tokenExpired,
  isUserAuth,
  setIsUserAuth,
  user,
  setUser,
  setTokenExpired,
}) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [bottomBarDisplay, setBottomBarDisplay] = useState({
    multimedia: false,
    cars: false,
    home: false,
  });
  const cookies = new Cookies();

  const cartHolder: { cart: ProductInterface[] } = useAppSelector(
    (state) => state.cart
  );
  const cart: ProductInterface[] = cartHolder.cart;

  useEffect(() => {
    let count = 0;
    cart.forEach((element: ProductInterface) => {
      count = count + element.qty;
    });
    setCartCount(count);
  }, [cart, cartCount]);

  return (
    <div className="navBarContainer">
      <div className="navbar">
        <Link className="logoLinkContainer" to="/">
          <div className="logoContainer">
            <div className="navbar__logo">ShopMe</div>
            <div className="navBarUnderLogoText">shopping store you admire</div>
          </div>
        </Link>

        <div className="navBarIconsContainer">
          <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
          <div
            className="userIconContainer"
            onMouseLeave={() => {
              setItemsShow({ ...itemsShow, userUnderSection: false });
            }}
            onMouseEnter={() => {
              setItemsShow({ ...itemsShow, userUnderSection: true });
            }}
          >
            <FontAwesomeIcon className="userIcon" icon={faUser} />
            {itemsShow.userUnderSection && tokenExpired && (
              <div
                onMouseLeave={() => {
                  setItemsShow({ ...itemsShow, userUnderSection: false });
                }}
                onMouseEnter={() => {
                  setItemsShow({ ...itemsShow, userUnderSection: true });
                }}
                className="userLinks"
              >
                {}
                <div className="userLinksContainer">
                  <div className="userLogin">
                    <FontAwesomeIcon className="signInIcon" icon={faUser} />
                    <Link className="logino" to="/login">
                      Login
                    </Link>
                  </div>
                  <div className="userSignUp">
                    <FontAwesomeIcon className="signUpIcon" icon={faUserPlus} />
                    <Link className="signIno" to="/signup">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {itemsShow.userUnderSection && isUserAuth && (
              <div
                onMouseLeave={() => {
                  setItemsShow({ ...itemsShow, userUnderSection: false });
                }}
                onMouseEnter={() => {
                  setItemsShow({ ...itemsShow, userUnderSection: true });
                }}
                className="userLinks"
              >
                {}
                <div className="userLinksContainer">
                  <div className="userLogin">
                    <FontAwesomeIcon className="signInIcon" icon={faUser} />
                    <Link className="logino" to="/">
                      {user.firstName}
                    </Link>
                  </div>
                  <div className="userSignUp">
                    <FontAwesomeIcon
                      className="signUpIcon"
                      icon={faArrowRightFromBracket}
                    />
                    <Link
                      onClick={() => {
                        setTokenExpired(true);
                        setIsUserAuth(false);
                        cookies.set("userId", "", { path: "/" });
                        setUser({
                          _id: "",
                          firstName: "",
                          lastName: "",
                          phoneNumber: "",
                          userName: "",
                          email: "",
                          password: "",
                          address: "",
                        });
                        cookies.set("userToken", "", { path: "/" });
                      }}
                      className="signIno"
                      to="/"
                    >
                      logout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="heartIconContainer">
            <FontAwesomeIcon
              onClick={() => {
                // setItemsShow((prevState) => ({
                //   ...prevState,
                //   wishList:
                //     prevState.wishList === "" ||
                //     prevState.wishList === "inActive"
                //       ? "active"
                //       : "inActive",
                // }));
              }}
              className="heartIcon"
              icon={faHeart}
            />
          </div>
          <div className="shoppingIconContainer">
            <FontAwesomeIcon
              onClick={() => {
                setItemsShow((prevState) => ({
                  ...prevState,
                  cartNavBar:
                    prevState.cartNavBar === "" ||
                    prevState.cartNavBar === "inActive"
                      ? "active"
                      : "inActive",
                }));
              }}
              className="cartIcon"
              icon={faCartShopping}
            />
            <div className="cartCount">{cartCount}</div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "white" }} className="bottomBarContainer">
        <div className="optionsContainer">
          <div
            onMouseEnter={() => {
              setBottomBarDisplay({
                ...bottomBarDisplay,
                multimedia: true,
                home: false,
                cars: false,
              });
            }}
            onMouseLeave={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, multimedia: false });
            }}
            className="categoriess"
          >
            <p>multimedia</p>
            <FontAwesomeIcon
              onClick={() => {}}
              className="downIcon"
              icon={bottomBarDisplay.multimedia ? faAngleUp : faAngleDown}
            />
          </div>
          <div
            onMouseEnter={() => {
              setBottomBarDisplay({
                ...bottomBarDisplay,
                multimedia: false,
                home: true,
                cars: false,
              });
            }}
            onMouseLeave={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, home: false });
            }}
            className="categoriess"
          >
            <p>home</p>
            <FontAwesomeIcon
              onClick={() => {}}
              className="downIcon"
              icon={bottomBarDisplay.home ? faAngleUp : faAngleDown}
            />
          </div>
          {/* bottomBarDisplay, setBottomBarDisplay */}
          <div
            className="categoriess"
            onMouseEnter={() => {
              setBottomBarDisplay({
                ...bottomBarDisplay,
                multimedia: false,
                home: false,
                cars: true,
              });
            }}
            onMouseLeave={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, cars: false });
            }}
          >
            <p>cars</p>
            <FontAwesomeIcon
              onClick={() => {}}
              className="downIcon"
              icon={bottomBarDisplay.cars ? faAngleUp : faAngleDown}
            />
          </div>
        </div>
        {bottomBarDisplay.cars ? (
          <div
            onMouseEnter={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, cars: true });
            }}
            onMouseLeave={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, cars: false });
            }}
            className="categoriesDisplay"
          >
            cars categories here
          </div>
        ) : (
          <div className="categoriesDisplayOff">cars categories here</div>
        )}
        {bottomBarDisplay.home ? (
          <div
            onMouseEnter={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, home: true });
            }}
            onMouseLeave={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, home: false });
            }}
            className="categoriesDisplay"
          >
            home categories here
          </div>
        ) : (
          <div className="categoriesDisplayOff">home categories here</div>
        )}
        {bottomBarDisplay.multimedia ? (
          <div
            onMouseEnter={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, multimedia: true });
            }}
            onMouseLeave={() => {
              setBottomBarDisplay({ ...bottomBarDisplay, multimedia: false });
            }}
            className="categoriesDisplay"
          >
            multimedia categories here
          </div>
        ) : (
          <div className="categoriesDisplayOff">multimedia categories here</div>
        )}
      </div>
    </div>
  );
};

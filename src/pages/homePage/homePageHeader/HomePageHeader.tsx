import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import "./HomePageHeader.css";
import shopImage from "../../../assets/Online Shopping - Copy.png";
import shippingImage from "../../../assets/blog-header-shipping-boxes-keyboard.jpg";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import SportsRugbyOutlinedIcon from "@mui/icons-material/SportsRugbyOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ToysIcon from "@mui/icons-material/Toys";
import FemaleIcon from "@mui/icons-material/Female";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";

var items = [
  {
    image: shopImage,
  },
  {
    image: shippingImage,
  },
];

const categories = [
  { category: "supermarket", icon: <StorefrontOutlinedIcon /> },
  { category: "accessories", icon: <HeadphonesIcon /> },
  { category: "kitchen", icon: <SoupKitchenOutlinedIcon /> },
  { category: "sport", icon: <SportsRugbyOutlinedIcon /> },
  { category: "tv", icon: <DesktopWindowsOutlinedIcon /> },
  { category: "phone / tablette", icon: <PhoneIphoneOutlinedIcon /> },
  { category: "kids toys", icon: <ToysIcon /> },
  { category: "beauty", icon: <FemaleIcon /> },
];

function Item(props: any) {
  return (
    <Paper style={{ height: "50vh" }}>
      <img className="carouselImage" src={props.item.image} alt="" />
    </Paper>
  );
}

export const HomePageHeader = () => {
  return (
    <div className="homePageHeaderContainer">
      <div className="categoriesListHPH">
        {categories.map((category, key) => (
          <div key={category.category} className="categoryHPH">
            <div className="categoryHPHIcon">{category.icon}</div>
            <div className="categoryHPHName">{category.category}</div>
          </div>
        ))}
      </div>
      <div className="homePageCarousel">
        <Carousel
          fullHeightHover={false}
          autoPlay={true}
          stopAutoPlayOnHover={true}
          interval={5000}
          animation="slide"
          duration={500}
          navButtonsAlwaysVisible={true}
        >
          {items.map((item: any, index: number) => (
            <div key={index}>
              <Item item={item} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="assistanceList">
        <div className="supportCenter">
          <div className="supportCenterIcon">
            <SupportAgentIcon fontSize="large" />
          </div>
          <div className="supportCenterText">
            <p className="rightBarTitle">Support Center</p>
            <div> guide to customer service</div>
          </div>
        </div>

        <div className="supportCenter">
          <div className="supportCenterIcon">
            <ChangeCircleIcon fontSize="large" />
          </div>
          <div className="supportCenterText">
            <p className="rightBarTitle">easy return</p>
            <div>fast money back</div>
          </div>
        </div>

        <div className="supportCenter">
          <div className="supportCenterIcon">
            <StorefrontIcon fontSize="large" />
          </div>
          <div className="supportCenterText">
            <p className="rightBarTitle">sell here</p>
            <div>open a seller account</div>
          </div>
        </div>
      </div>
    </div>
  );
};

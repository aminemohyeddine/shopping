import React from "react";
import "./categories.css";
import phone from "../../../assets/phone.jpg";
import tv from "../../../assets/tv.jpg";
import home from "../../../assets/home.jpg";
import multimedia from "../../../assets/multimedia.jpg";
import CategoriesImage from "../../../assets/allCategories.jpg";

import { Link } from "react-router-dom";

interface Props {
  categories: string[];
}

export const Categories: React.FC<Props> = ({ categories }) => {
  const image = (img: string) => {
    if (img === "phone") {
      return phone;
    }
    if (img === "home") {
      return home;
    }
    if (img === "TV") {
      return tv;
    }
    if (img === "multimedia") {
      return multimedia;
    }
  };

  return (
    <>
      <div className="categorySectionContainer">
        {categories.map((category, index) => (
          <Link key={index} to={`/category/${category}`}>
            <div
              className="categorySection"
              style={{
                background: `url(${image(category)}) no-repeat`,
                backgroundSize: "100%",
                color: "white",
                cursor: "pointer",
                textShadow:
                  "-1px 0 black, 0 1px black, 2px 0 black, 0 -1px black",
              }}
            >
              <p className="categorySectionName">{category}</p>
            </div>
          </Link>
        ))}
        <Link to={`/products`}>
          <div
            className="categorySection"
            style={{
              background: `url(${CategoriesImage}) no-repeat`,
              backgroundSize: "100%",
              color: "white",
              cursor: "pointer",
              textShadow:
                "-1px 0 black, 0 1px black, 2px 0 black, 0 -1px black",
            }}
          >
            <p className="categorySectionName">All Categories</p>
          </div>
        </Link>
      </div>
    </>
  );
};

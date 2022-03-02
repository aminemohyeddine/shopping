import React from "react";
import "./CategoriesBar.css";
import BoltIcon from "@mui/icons-material/Bolt";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";

const categories = [
  {
    name: "free shipping",
    icon: <MoneyOffCsredOutlinedIcon />,
  },
  { name: "official store", icon: <StoreOutlinedIcon /> },
  { name: "shopMe Food", icon: <FastfoodOutlinedIcon /> },
  { name: "fast shipping", icon: <BoltIcon /> },
];

export const CategoriesBar = () => {
  return (
    <div className="categoriesBarContainer">
      {categories.map((category, index) => (
        <div key={index} className="categoriesBarItem">
          <div className="categoriesBarIcon">{category.icon}</div>
          <div className="categoriesBarText">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

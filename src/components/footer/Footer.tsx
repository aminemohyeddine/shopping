import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerItemContainer">
        <div className="FooterTitle">costumer</div>
        <Link to="/">
          <div className="footerLink">contact us</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Help and FAQs</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Order by Mobile: 05.22.04.18.18</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Buy on ShopMe</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Use a discount coupon</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Delivery Terms</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Return policy</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Report a Product</div>
        </Link>
      </div>
      <div className="footerItemContainer">
        <div className="FooterTitle">about</div>
        <Link to="/">
          <div className="footerLink">Who are we</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Careers at ShopMe</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Terms of Service</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Notice on Privacy and Cookies</div>
        </Link>
        <Link to="/">
          <div className="footerLink">ShopMe Prime</div>
        </Link>
        <Link to="/">
          <div className="footerLink">ShopMe Prime Terms and Conditions</div>
        </Link>
        <Link to="/">
          <div className="footerLink">ShopMe express</div>
        </Link>
        <Link to="/">
          <div className="footerLink">All official stores</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Saint Valentin 2022</div>
        </Link>
      </div>
      <div className="footerItemContainer">
        <div className="FooterTitle">MAKE MONEY WITH ShopMe</div>
        <Link to="/">
          <div className="footerLink">Sell on ShopMe</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Become a ShopMe Consultant</div>
        </Link>
        <Link to="/">
          <div className="footerLink">Become a logistics service partner</div>
        </Link>
      </div>
    </div>
  );
};

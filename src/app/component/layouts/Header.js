"use client";

import React from "react";
import Link from "next/link";

const Header = (props) => {
  return (
    <>
      {/* Top area with logo and menu icon */}
      <div className="header-top" style={{ backgroundColor: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <div className="header-logo">
          <img
            src="/assets/img/TT-Logo.png" 
            alt="Logo"
            style={{ borderRadius: "50%", width: "40px", height: "40px" }} 
          />
        </div>

        {/* Menu Icon */}
        <div className="menu-icon">
          <i className="fa fa-bars" style={{ color: "#778B28", fontSize: "24px" }} />
        </div>
      </div>

      {/* Banner with page title */}
      <div className="header-banner" style={{ backgroundColor: "#778B28", padding: "10px 0", textAlign: "center" }}>

        <div className="page-name" style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}>

          {props.title}
        </div>
      </div>
    </>
  );
};

export default Header;

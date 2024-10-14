"use client";

import React from "react";
import Link from "next/link";

const Header = (props) => {
  return (
    <>
      {/* Updated the header area to remove image background and set a green color */}
      <div className="header-area" style={{ backgroundColor: "#778B28" }}>
        <div className="container">
          <div className="row">
          <div className="col-sm-4 col-3">
              {/* Use an anchor tag to go back to the previous page */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  window.history.back(); // Go back in history
                }}
                className="menu-back-page home-clicked"
              >
                <i className="fa fa-angle-left" />
              </a>
            </div>
            <div className="col-sm-4 col-6 text-center">
              <div className="page-name">{props.title}</div>
            </div>
            <div className="col-sm-4 col-3 text-right">
              {/* Replaced the search section with a logo */}
              <div className="header-logo">
                <img
                   src="/assets/img/TT-Logo.png" // Update this path to your logo
                  alt="Logo"
                  style={{ borderRadius: "50%", width: "30px", height: "30px" }} // Adjust size as needed
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="page-title mg-top-20">
      </div>
    </>
  );
};

export default Header;

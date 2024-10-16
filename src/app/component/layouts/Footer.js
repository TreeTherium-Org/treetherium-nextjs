"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="footer-area">
        <div
          className="footer-top text-center"
          style={{ backgroundColor: "#fff" }} // Updated path for Next.js
        >
          <div className="container">
          </div>
        </div>
        <div className="container">
          <div className="footer-bottom text-center">
            <ul>
              <li>
                <Link href="/" className="home-clicked">
                  <i className="fa fa-home" />
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/all-pages">
                  <i className="fa fa-file-text" />
                  <p>Pages</p>
                </Link>
              </li>
              <li>
                <Link href="/components">
                  <i className="fa fa-plus" />
                  <p>Components</p>
                </Link>
              </li>
              <li>
                <div className="menu-bar">
                  <i className="fa fa-bars" />
                  <p>Menu</p>
                </div>
              </li>
              <li>
                <Link href="/carts">
                  <i className="fa fa-home" />
                  <p>My Cart</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top Area */}
      <div className="back-to-top">
        <span className="back-top">
          <i className="fa fa-angle-up" />
        </span>
      </div>
    </>
  );
};

export default Footer;

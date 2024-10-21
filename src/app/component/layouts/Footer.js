"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="footer-area" style={{ backgroundColor: "#778B28" }}>
        <div className="container">
          <div className="footer-bottom d-flex justify-content-around">
            <ul className="footer-menu d-flex justify-content-around" style={{ width: "100%", padding: "0", margin: "0", listStyle: "none" }}>
              <li className="text-center">
                <Link href="/" className="home-clicked">
                  <i className="fa fa-home" style={{ fontSize: "20px", color: "#4F3738" }} />
                  <p style={{ margin: "0", color: "#4F3738" }}>Home</p>
                </Link>
              </li>
              <li className="text-center">
                <Link href="/menu">
                  <i className="fa fa-bars" style={{ fontSize: "20px", color: "#4F3738" }} />
                  <p style={{ margin: "0", color: "#4F3738" }}>Menu</p>
                </Link>
              </li>
              <li className="text-center">
                <Link href="/faq">
                  <i className="fa fa-question-circle" style={{ fontSize: "20px", color: "#4F3738" }} />
                  <p style={{ margin: "0", color: "#4F3738" }}>FAQ</p>
                </Link>
              </li>
              <li className="text-center">
                <Link href="/profile">
                  <i className="fa fa-user" style={{ fontSize: "20px", color: "#4F3738" }} />
                  <p style={{ margin: "0", color: "#4F3738" }}>Profile</p>
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

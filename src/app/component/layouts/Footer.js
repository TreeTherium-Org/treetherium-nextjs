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
            {/* You can add any additional content or branding here */}
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
                <Link href="/menu">
                  <i className="fa fa-bars" /> {/* Use a relevant icon */}
                  <p>Menu</p>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <i className="fa fa-question-circle" /> {/* Use a relevant icon */}
                  <p>FAQ</p>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <i className="fa fa-user" /> {/* Use a relevant icon */}
                  <p>Profile</p>
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

"use client";

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AutoNotification from "./AutoNotification";

const Section = ({ title, autoNotification, children, searchPopup }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const session = {};

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <>
      <Navbar isOpen={isNavbarOpen} onClose={closeNavbar} session={session} />
      {autoNotification && <AutoNotification />}
      <Header
        title={title}
        toggleNavbar={toggleNavbar}
        searchPopup={searchPopup}
      />
      {children}
      <Footer session={session} />
    </>
  );
};

export default Section;

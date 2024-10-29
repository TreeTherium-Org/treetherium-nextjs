"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from 'next/link';

export default function App() {
  const [showModal, setShowModal] = useState(true); // State to control modal visibility
  const router = useRouter();



  //Function to handle button click to redirect pages
  const handleButtonClick = (route) => {
    router.push(route);
  };

  return (
    <div>
      {/* Top area with logo and menu icon */}
      <div className="header-top" style={{ padding: "30px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <div className="header-logo">
          <img
            src="/assets/img/TT-Logo.png" 
            alt="Logo"
            style={{ borderRadius: "50%", width: "82px", height: "82px" }} 
          />
        </div>
      </div>
      <div style={containerStyle}>
        <header style={{ ...headerStyle, marginTop: 20, marginBottom: 30 }}>
          <div style={{ width: '121vw', height: '35vh', position: 'relative', left: '60%', transform: 'translateX(-50%)', overflow: 'hidden' }}>  
            <Image
              src="/assets/img/home-page.png"
              alt="Everyone Can Grow A Tree"
              layout="fill"               // Use `layout="fill"` to make the image fill the container
              objectFit="cover"           // Ensures the image scales and covers the container
            />
          </div>
        </header>
        <main>
          <div style={{ display: "flex", justifyContent: "center"}}><h1 style={{ fontSize: '1.7em', marginTop: 80 }} ><strong>Welcome To Treetherium</strong></h1></div>
          <div style={{ display: "flex", justifyContent: "center"}}><h5 style={{ fontSize: '1em', marginTop : 30 }}>"Create A Greener World Together"</h5></div>
          <div className="btn-wrap mg-top-40 mg-bottom-40">
                <div className="container">
                    <Link href="/projects-form" className="btn-large w-10" style={buttonStyle}>
                        Add new project <i className="fa fa-angle-double-right" />
                    </Link>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

// Modal Styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  position: "relative",
  width: "100vw", // Full viewport width
  height: "100vh", // Full viewport height
  backgroundColor: "transparent", // Transparent to let the StartupScreen be visible
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Other Landing Page Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#ebf6e2",
};


const headerStyle = {
  textAlign: "center",
  marginTop: "20px",
};

const titleStyle = {
  fontSize: "1.1em", // Larger title for emphasis
  fontWeight: "bold",
  color: "#4F3738",
};

const subtitleStyle = {
  fontSize: "1.1em", // Larger subtitle for readability
  color: "#6b8e23", // Lighter green
};

const stepTitleStyle = {
  fontSize: "1.1em",
  textAlign: "center",
  marginBottom: "10px",
};

const mainStyle = {
  flex: 1,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center", // Center-align content
};

const imageContainerStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center", // Center-align the image
};

const buttonStyle = {
  backgroundColor: "#778B28", // Green color for eco-friendly theme
  color: "white",
  padding: "1px 20x",
  fontSize: "1.2em",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
  lineHeight: "50px",
  textAlign: "center",
  width: "80%", // Full width button
  maxWidth: "300px", // Restrict the button size on larger screens
  height: "51.58px",
};

const cardContainerStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const dataCardStyle = {
  backgroundColor: "#f7f4f1",
  borderRadius: "2px",
  padding: "20px",
  textAlign: "center",
  border: "1px solid #c1b3a8",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  height: "120px",
  width: "80%",
  maxWidth: "300px", // Ensure the card doesn't get too large
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Section from "/src/app/component/layouts/Section.js";
import StartupScreen from "/src/app/component/StartupScreen.js"; // Import the StartupScreen component

export default function App() {
  const [showModal, setShowModal] = useState(true); // State to control modal visibility
  const images = [
    { src: "/assets/img/home-page.png", alt: "Image 1" },
    { src: "/assets/img/home-page.png", alt: "Image 2" },
    { src: "/assets/img/home-page.png", alt: "Image 3" },
  ];
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false); // Hide the modal after 3 seconds
    }, 3000);
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  //Function to handle button click to redirect pages
  const handleButtonClick = (route) => {
    router.push(route);
  };

  return (
    <Section allNotification={false} searchPopup={true} title={"Welcome"}>
      {/* Modal for StartupScreen */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <StartupScreen />
          </div>
        </div>
      )}

      {/* Landing Page Content */}
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Tokenizing Tree Planting Worldwide</h1>
          <h3 style={titleStyle}>
            Create A <span style={subtitleStyle}>Greener</span> World Together
          </h3>
        </header>
        <main style={mainStyle}>
          <div className="section-title">
            <h3 style={stepTitleStyle}>Step by step how to use this app</h3>
          </div>

          {/* Swiper Component */}
          <div style={imageContainerStyle}>
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              pagination={{ clickable: true }}
              loop={true}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            className="btn btn-purple"
            onClick={() => handleButtonClick("/signup")}
          >
            Register / Login
          </button>

          <div style={cardContainerStyle}>
            <div style={dataCardStyle}>
              <strong>Vision/Mission</strong>
            </div>
          </div>
        </main>
      </div>
    </Section>
  );
}

// Modal Styles

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

// Other Landing Page Styles (from your existing code)
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "81vh",
  padding: "20px",
  backgroundColor: "#ebf6e2",
};

// Other existing styles (headerStyle, titleStyle, etc.) remain unchanged.

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
  backgroundColor: "#4CAF50", // Green color for eco-friendly theme
  color: "white",
  padding: "15px 20px",
  fontSize: "1.2em",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  textAlign: "center",
  width: "80%", // Full width button
  maxWidth: "300px", // Restrict the button size on larger screens
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

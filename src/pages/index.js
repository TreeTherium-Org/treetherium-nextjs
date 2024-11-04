//LATEST LANDING PAGE
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StartupScreen from "/src/app/component/StartupScreen.js";
import styles from './LandingPage.module.css';

const Page = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false); // Hide the modal after 3 seconds
    }, 3000);
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);
  
  const slides = [
    {
      id: 1,
      title: "Welcome To Treetherium",
      subtitle: '"create a greener world together"',
      image: "/assets/img/home-page.png",
      isLanding: true,
      primaryButton: {
        text: "Let's Get Started",
        action: () => setCurrentSlide(1)
      },
      secondaryButton: {
        text: "I Have An Account",
        action: () => setCurrentSlide(4) // Go to login/register page
      }
    },
    {
      id: 2,
      title: "Plant A Tree",
      subtitle: [
        "Start your journey by planting a tree with TreeTherium! Choose a project, pick your tree type, and join a global effort to make the planet greener. Each tree you plant makes a real difference. You can even track the tree’s growth and see its positive impact over time.",
        "Planting a tree is quick, easy, and helps build a livable world for everyone.",
        "Ready to start? Just follow the steps in our app to plant your first tree and support a greener planet today!"
      ],
      image: "/assets/img/plant-trees-today- (13).jpg",
      primaryButton: {
        text: "Skip",
        action: () => setCurrentSlide(4)
      },
      secondaryButton: {
        text: "Next",
        action: () => setCurrentSlide(2) // Go to login/register page
      }
    },
    {
      id: 3,
      title: "Tokenize The Tree",
      subtitle: [
        "After planting a tree, you can tokenize it! Tokenizing means giving your tree a unique digital identity. Based on it’s geographical location. This identity is stored on the blockchain, making it easy to track and keep secure.",
        "Tokenizing your trees shows you are part of the TreeTherium community and supports tree-planting programs worldwide.",
        "Just follow the instructions in the app to tokenize your tree and watch its progress digitally grow. Now, your tree is officially part of a global network of trees helping the environment!"
      ],
      image: "hands-tree.jpg",
      primaryButton: {
        text: "Back",
        action: () => setCurrentSlide(1)
      },
      secondaryButton: {
        text: "Next",
        action: () => setCurrentSlide(3)
      }
    },
    {
      id: 4,
      title: "Monetize & Save The Planet",
      subtitle: [
        "Now, you can turn your tree’s growth into value! By tokenizing, you create potential earnings that grow as your tree grows. Each tree helps save the planet and can earn value over time.",
        "You can view the benefits your tree creates in the app and see how it contributes to global sustainability.",
        "This is a simple way to both save the planet and gain rewards. With TreeTherium, your tree is a smart way to help the earth while enjoying long-term benefits!"
      ],
      image: "hands-tree-2.jpg",
      primaryButton: {
        text: "Back",
        action: () => setCurrentSlide(2)
      },
      secondaryButton: {
        text: "Done",
        action: () => setCurrentSlide(4)
      }
    },
    {
      id: 5,
      title: "Tokenizing Tree Planting Worldwide",
      isLoginRegister: true,
      primaryButton: {
        text: "Login",
        action: () => router.push('/signin')
      },
      secondaryButton: {
        text: "Register",
        action: () => router.push('/signup')
      }
    }
  ];

  const renderLandingPage = () => (
    <div className={styles.container}>
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <StartupScreen />
          </div>
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <img
            src="/assets/img/TT-Logo.png"
            alt="Logo"
            className={styles.headerLogo}
          />
        </div>
      </div>

      <div style={headerStyle}>
        <div className={styles.imageContainer}>
          <img
            src={slides[currentSlide].image}
            alt="Landing Background"
            className={styles.image}
          />
        </div>

        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            {slides[currentSlide].title}
          </h2>
          <p className={styles.subtitle}>
            {slides[currentSlide].subtitle}
          </p>

          <div className={styles.buttonContainer}>
            <button
              onClick={slides[currentSlide].primaryButton.action}
              className={styles.button}
            >
              {slides[currentSlide].primaryButton.text}
            </button>
            <button
              onClick={slides[currentSlide].secondaryButton.action}
              className={styles.buttonSecondary}
            >
              {slides[currentSlide].secondaryButton.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginRegister = () => (
    <div className="min-h-screen bg-[#ebf6e2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <img
          src="/assets/img/TT-Logo.png"
          alt="Logo"
          className="mx-auto mb-8"
          style={{ width: "150px", height: "150px" }}
        />
        <h2 className="text-2xl font-bold mb-8">{slides[currentSlide].title}</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={slides[currentSlide].primaryButton.action}
            style={buttonStyle}
          >
            {slides[currentSlide].primaryButton.text}
          </button>
          <button
            onClick={slides[currentSlide].secondaryButton.action}
            style={buttonStyle2}
          >
            {slides[currentSlide].secondaryButton.text}
          </button>
        </div>
      </div>
    </div>
  );

  const renderOnboardingStep = () => (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <img
            src="/assets/img/TT-Logo.png"
            alt="Logo"
            className={styles.headerLogo}
          />
        </div>
      </div>

      <div className={styles.imageContainer1}>
          <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className={styles.image1}
          />
      </div>

      <div className={styles.card}>
        <div className={styles.innerCard}>
          <div className={styles.cardTitle}>
              <h2>{slides[currentSlide].title}</h2>
          </div>
          <div className={styles.divider} />
          <div>
              {slides[currentSlide].subtitle.map((paragraph, index) => (
                  <p key={index} className={styles.subtitleParagraph}>
                      {paragraph}
                  </p>
              ))}
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer1}>
          <button
              onClick={slides[currentSlide].primaryButton.action}
              className={styles.buttonTertiary}
          >
              {slides[currentSlide].primaryButton.text}
          </button>

          <button
              onClick={slides[currentSlide].secondaryButton.action}
              className={styles.buttonQuartery}
          >
              {slides[currentSlide].secondaryButton.text}
          </button>
      </div>

      <div className={styles.progressIndicator}>
          {[1, 2, 3].map((_, index) => (
              <div
                  key={index}
                  className={`${styles.indicator} ${
                      index === currentSlide - 1 ? styles.active : styles.inactive
                  }`}
              />
          ))}
      </div>
  </div>
);

  // Determine which layout to render
  if (currentSlide === 0) {
    return renderLandingPage();
  } else if (currentSlide === 4) {
    return renderLoginRegister();
  } else {
    return renderOnboardingStep();
  }
};

export default Page;

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

//Landing Page Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#ebf6e2",
};

const headerStyle = {
  textAlign: "center",
  marginTop: "20px",
  marginBottom: "30px",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  alignItems: "center",
  borderRadius: "5px" ,
  border: "none",
  width: "391px",
  margin: "21px 20px 25px",
};

const innerCardStyle = {
  width: "100%",
  height: "100%",
  border: "2px solid #D9D9D9",  // Inner border color
  borderRadius: "5px",          // Match or adjust for inner rounding
  padding: "20px 20px 0px",            // Padding inside the inner border
};

//Button Styles

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "11px",
  width: "100%",
};

const buttonStyle = {
  backgroundColor: "#778B28", 
  color: "white",
  padding: "1px 20px",
  fontSize: "1.25em",
  fontWeight: 700,
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  lineHeight: "50px",
  textAlign: "center",
  width: "100%",
  maxWidth: "340px",
  height: "51.58px",
};

const buttonStyle2 = {
  backgroundColor: "#FFFF", 
  color: "#778B28",
  padding: "1px 20px",
  fontSize: "1.25em",
  fontWeight: 700,
  borderRadius: "8px",
  border: "1px solid #778B28",
  marginTop: "11px",
  cursor: "pointer",
  lineHeight: "50px",
  textAlign: "center",
  width: "100%",
  maxWidth: "340px",
  height: "51.58px",
};

const buttonStyle3 = {
  backgroundColor: "#FFFF", 
  color: "#778B28",
  padding: "1px 20px",
  fontSize: "1.25em",
  fontWeight: 700,
  borderRadius: "8px",
  border: "1px solid #778B28",
  cursor: "pointer",
  lineHeight: "50px",
  textAlign: "center",
  width: "100%",
  maxWidth: "93px",
  height: "51.58px",
};


const buttonStyle4 = {
  backgroundColor: "#778B28", 
  color: "white",
  padding: "1px 20px",
  fontSize: "1.25em",
  fontWeight: 700,
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  lineHeight: "50px",
  textAlign: "center",
  width: "100%",
  maxWidth: "93px",
  height: "51.58px",
};



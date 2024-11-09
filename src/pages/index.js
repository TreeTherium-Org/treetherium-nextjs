//LATEST LANDING PAGE
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StartupScreen from "/src/app/component/StartupScreen.js";
import styles from './LandingPage.module.css';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        sessionStorage.setItem('hasSeenModal', 'true'); // Set flag in storage
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, []);
  
  const slides = [
    {
      id: 1,
      title: "Welcome To Treetherium",
      subtitle: '"create a greener world together"',
      image: "/assets/img/landing-home.png",
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
      image: "/assets/img/step-1.png",
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
      image: "/assets/img/step-2.png",
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
      image: "/assets/img/step-3.png",
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
          <Image
            src="/assets/img/TT-Logo.png"
            alt="Logo"
            width={500}
            height={500}
            className={styles.headerLogo}
            priority={true}
          />
        </div>
      </div>

      <div style={headerStyle}>
        <div className={styles.imageContainer}>
          <Image
            src={slides[currentSlide].image}
            alt="Landing Background"
            width={500}
            height={500}
            className={styles.image}
            priority={true}
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
    <div className={styles.loginRegisterContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.formWrapper2}>
          <Image
              src="/assets/img/TT-Logo.png"
              alt="Logo"
              width={500}
              height={500}
              className={styles.logo}
              priority={true}
          />
          <h2 className={styles.title1}>{slides[currentSlide].title}</h2>
        </div>
        <div className={styles.buttonContainer3}>
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
        <div className={styles.buttonContainer2}>
          <button
              onClick={() => setCurrentSlide(0)}
              className={styles.buttonTertiary}
          >
              Back
          </button>
        </div>
      </div>
    </div>
  );

  const renderOnboardingStep = () => (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Image
            src="/assets/img/TT-Logo.png"
            alt="Logo"
            width={500}
            height={500}
            className={styles.headerLogo}
            priority={true}
          />
        </div>
      </div>

      <div className={styles.imageContainer1}>
          <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              width={500}
              height={500}
              className={styles.image1}
              priority={true}
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








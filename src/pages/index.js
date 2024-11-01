'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div style={ containerStyle}>
      {/* Logo Header */}
      <div className="header-top" style={{ padding: "30px 23px" }}>
        <div className="header-logo">
          <img
            src="/assets/img/TT-Logo.png"
            alt="Logo"
            style={{ borderRadius: "50%", width: "82px", height: "82px" }}
          />
        </div>
      </div>

      {/* Image and Content Container */}
      <div style={ headerStyle } >
        {/* Image Section */}
        <div style={{ width: '148vw', height: '38vh', position: 'relative', left: '60%', transform: 'translateX(-49%)', overflow: 'hidden' }}>
          <img
            src={slides[currentSlide].image}
            alt="Landing Background"
            className="w-full h-full object-cover"
            layout="fill"
          />
        </div>

        {/* Text and Buttons Section */}
        <div className="flex flex-col items-center bg-[#ebf6e2] px-6" style={{ paddingTop: "113px" }}>
          <div className="text-center w-full">
            <h2 style={{ 
              fontSize: '2em',
              fontWeight: 700,
              marginBottom: '21px',
              textAlign: 'center'
            }}>
              {slides[currentSlide].title}
            </h2>
            <p style={{ 
              fontSize: '1.063em', 
              marginBottom: '38px',
              textAlign: 'center'
            }}>
              {slides[currentSlide].subtitle}
            </p>
          </div>
          
          {/* Centered Buttons */}
          <div style={{ buttonContainerStyle }}>
            <button
              onClick={slides[currentSlide].primaryButton.action}
              style={ buttonStyle }
            >
              {slides[currentSlide].primaryButton.text}
            </button>
            <button
              onClick={slides[currentSlide].secondaryButton.action}
              style={ buttonStyle2 }
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
    <div className="min-h-screen bg-[#ebf6e2]">
      <div className="header-top" style={{ padding: "30px 23px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="header-logo">
          <img
            src="/assets/img/TT-Logo.png"
            alt="Logo"
            style={{ borderRadius: "50%", width: "82px", height: "82px" }}
          />
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="relative h-[50vh] mb-8">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover rounded-lg"
            style={{ height: "290px", marginBottom: "21px" }}
          />
        </div>

        <div className="card" style={cardStyle}>
          <div className="card-body" style={innerCardStyle}>
             {/* Title */}
            <div className="card-title">
              <h2 style={{ fontSize: '1.5em', fontWeight: 500 }}>{slides[currentSlide].title}</h2>
              {/* Partition between image and text */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="divider" style={{ margin: '4px 18px 18px', width: '351px', height: '5px', borderRadius: '50px', backgroundColor: '#E7E1EE' }} />
              </div>
               {/* Subtitle */}
              <div style={{ padding: '0px 15px'}}>
                {slides[currentSlide].subtitle.map((paragraph, index) => (
                  <p key={index} style={{ fontSize: '1em', letterSpacing: '0.02em', lineHeight: "1.3", marginBottom: index === slides[currentSlide].subtitle.length - 1 ? '0px' : '32px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ display: "flex", flexDirection: 'row', justifyContent: "center", gap: "182px"}}>
          <button
            onClick={slides[currentSlide].primaryButton.action}
            style={buttonStyle3}
          >
            {slides[currentSlide].primaryButton.text}
          </button>
          
          <button
            onClick={slides[currentSlide].secondaryButton.action}
            style={buttonStyle4}
          >
            {slides[currentSlide].secondaryButton.text}
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 mb-8 h-16 p-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide - 1 ? 'w-8 bg-[#778B28]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
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
  alignItems: "center",
  borderRadius: "5px" ,
  border: "none",
  width: "391px",
  marginTop: "21px",
  marginBottom: "25px",
  margin: "auto",
};

const innerCardStyle = {
  width: "100%",
  height: "100%",
  border: "2px solid #D9D9D9",  // Inner border color
  borderRadius: "5px",          // Match or adjust for inner rounding
  padding: "20px 20px 0px",            // Padding inside the inner border
};

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
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
      primaryButton: {
        text: "Let's Get Started",
        action: () => setCurrentSlide(1)
      },
      secondaryButton: {
        text: "I Have An Account",
        action: () => router.push('/login')
      }
    },
    {
      id: 2,
      title: "Plant A Tree",
      subtitle: "Start your journey by planting a tree with TreeTherium! Choose a project, pick your tree type, and join a global effort to make the planet greener.",
      image: "/assets/img/plant-trees-today- (13).jpg",
      primaryButton: {
        text: "Next",
        action: () => setCurrentSlide(2)
      },
      secondaryButton: {
        text: "Skip",
        action: () => router.push('/login')
      }
    },
    {
      id: 3,
      title: "Tokenize The Tree",
      subtitle: "After planting a tree, you can tokenize it! Tokenizing means giving your tree a unique digital identity.",
      image: "hands-tree.jpg",
      primaryButton: {
        text: "Next",
        action: () => setCurrentSlide(3)
      },
      secondaryButton: {
        text: "Back",
        action: () => setCurrentSlide(1)
      }
    },
    {
      id: 4,
      title: "Monetize & Save The Planet",
      subtitle: "Now, you can turn your tree's growth into value! By tokenizing, you create potential earnings that grow as your tree grows.",
      image: "hands-tree-2.jpg",
      primaryButton: {
        text: "Done",
        action: () => router.push('/login')
      },
      secondaryButton: {
        text: "Back",
        action: () => setCurrentSlide(2)
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#ebf6e2]">
      {/* Logo Header */}
      <div className="header-top" style={{ padding: "30px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="header-logo">
          <img
            src="/assets/img/TT-Logo.png"
            alt="Logo"
            style={{ borderRadius: "50%", width: "82px", height: "82px" }}
          />
        </div>
      </div>

      {/* Slide Content */}
      <div className="px-6 py-4">
        <div className="relative h-[50vh] mb-8">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
          <p className="text-gray-600">{slides[currentSlide].subtitle}</p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-[#778B28]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={slides[currentSlide].primaryButton.action}
            className="w-full max-w-xs bg-[#778B28] text-white py-3 rounded-lg font-medium"
          >
            {slides[currentSlide].primaryButton.text}
          </button>
          
          <button
            onClick={slides[currentSlide].secondaryButton.action}
            className="w-full max-w-xs border border-[#778B28] text-[#778B28] py-3 rounded-lg font-medium"
          >
            {slides[currentSlide].secondaryButton.text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
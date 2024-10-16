import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import './Home.css'; // Import the CSS file

const Home = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle button clicks
  const handleNavigation = (path) => {
    router.push(path); // Navigate to the specified path
  };

  return (
    <div className="container">
      {/* Top Section for Logo and Search */}
      <div className="top-section">
        <div className="logo">Logo</div>
        <input type="text" className="search" placeholder="Search Here" />
        {/* Profile Picture directly below logo */}
        <div className="profile-picture">Profile Picture</div>
      </div>

      {/* Main Buttons */}
      <div className="main-buttons">
        {/* My Forest and Analytics are in the same row */}
        <div className="button-row">
          <div className="button" onClick={() => handleNavigation('/knowledge-base')}>My Forest</div>
          <div className="button" onClick={() => handleNavigation('/knowledge-base')}>Analytics</div>
        </div>
        {/* Knowledge Base below My Forest */}
        <div className="button" onClick={() => handleNavigation('/knowledge-base')}>Knowledge Base</div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav">
        <div className="nav-icon" onClick={() => handleNavigation('/home')}>Home</div>
        <div className="nav-icon" onClick={() => handleNavigation('/menu')}>Menu</div>
        <div className="nav-icon" onClick={() => handleNavigation('/search')}>Search</div>
        <div className="nav-icon" onClick={() => handleNavigation('/profile')}>Profile</div>
      </div>
    </div>
  );
};

export default Home;

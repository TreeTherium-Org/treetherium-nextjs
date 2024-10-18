'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Section from '../component/layouts/Section.js';

const Home = () => {
  const router = useRouter(); // Initialize the router

  //Function to handle buntton click to redirect pages
  const handleButtonClick = (route) => {
    router.push(route); // Redirect to the specified route
 
  };

  return (
    <Section allNotification={false} searchPopup={true} title={'Home'}>
        <div style={containerStyle}>
          <header style={{ ...headerStyle, padding: 0, marginTop: '50px',marginBottom: '50px'}}>
            <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden' }}>  {/* Full viewport width */}
              <Image
                src="/assets/img/home-page.png"
                alt="Everyone Can Grow A Tree"
                width={2000}             // Set a large enough width for the image
                height={600}             // Adjust the height according to your needs
                style={{ width: '100%', height: 'auto' }}  // Ensure the image fills the container
              />
            </div>
          </header>
          <main style={mainStyle}>
              <div style={dataGridStyle}>
                  <div style={dataCardStyle} onClick={() => handleButtonClick('/my-forest')}>
                      <strong>My Forest</strong> <span style={{ fontSize: '1.2em' }}></span>
                  </div>
                  <div style={dataCardStyle} onClick={() => handleButtonClick('/analytics')}>
                      <strong>Analytics</strong> <span style={{ fontSize: '1.2em' }}></span>
                  </div>
                  <div style={dataCardStyle} onClick={() => handleButtonClick('/start-project')}>
                      <strong>Knowledge Base</strong> <span style={{ fontSize: '1.2em' }}></span>
                  </div>
              </div>
          </main>
        </div>
    </Section>
);
};

export default Home;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '30px',
};

const headerStyle = {
  textAlign: 'center',
};


const mainStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '20px',
  marginTop: '30px'
};

const dataGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginBottom: '250px',
};

const dataCardStyle = {
  backgroundColor: '#f7f4f1', //Light brown
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  border: '1px solid #c1b3a8', //Brown
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Light shadow
  height: '120px', // Fixed height to ensure uniformity
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
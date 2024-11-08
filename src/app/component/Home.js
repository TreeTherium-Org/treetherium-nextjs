'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Changed from next/router to next/navigation
import { useSession } from 'next-auth/react';
import Section from '../component/layouts/Section.js';

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Log session data when it changes
  useEffect(() => {
    if (status === 'loading') {
      console.log('Loading session...');
    }

    if (status === 'authenticated') {
      console.log('Session User ID',session.user.id)
      console.log('Session data:', {
        user: session.user,
        expires: session.expires,
        status: status
      });
    }

    if (status === 'unauthenticated') {
      console.log('Not authenticated');
      // Optionally redirect to login page
      // router.push('/signin');
    }
  }, [session, status]);

  // Function to handle button click to redirect pages
  const handleButtonClick = (route) => {
    router.push(route); // Redirect to the specified route
  };

  return (
    <Section allNotification={false} searchPopup={true} title={'Home'}>
    <div style={containerStyle}>
      <header style={{ ...headerStyle, padding: 0, marginTop: 30, marginBottom: 30 }}>
        <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden' }}>  {/* Full viewport width */}
          <Image
            src="/assets/img/landing-home.png"
            alt="Everyone Can Grow A Tree"
            width={2000}             // Set a large enough width for the image
            height={600}             // Adjust the height according to your needs
            style={{ width: '100%', height: 'auto' }}  // Ensure the image fills the container
            priority={true}
          />
        </div>
      </header>
      <main style={mainStyle}>
          <div style={buttonGridStyle}>
              <div style={buttonCardStyle} onClick={() => handleButtonClick('/my-forest')}>
              <Image
                    src="/assets/img/my-forest.png"
                    alt="Tree Planting Project"
                    width={109}
                    height={109}
                    style={{ borderRadius: '20%' }}
                    priority={true}
                  />
                  <strong style={textStyle}>My Forest</strong> 
              </div>
              <div style={buttonCardStyle} onClick={() => handleButtonClick('/analytics')}>
                <Image
                      src="/assets/img/Analytics.png"
                      alt="Single Tree"
                      width={109}
                      height={109}
                      style={{ borderRadius: '20%' }}
                      priority={true}
                  />
                  <strong style={textStyle}>Analytics</strong> 
              </div>
              <div style={buttonCardStyle} onClick={() => handleButtonClick('/knowledge-base')}>
                <Image
                      src="/assets/img/knowledge-base.png"
                      alt="Single Tree"
                      width={109}
                      height={109}
                      style={{ borderRadius: '20%' }}
                      priority={true}
                  />
                  <strong style={textStyle}>Knowledge Base</strong> 
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
  marginTop: 30
};

const dataGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginBottom: '250px',
};

const dataCardStyle = {
  backgroundColor: '#f7f4f1', // Light brown
  borderRadius: '20px',
  padding: '20px',
  textAlign: 'center',
  border: '1px solid #c1b3a8', // Brown
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Light shadow
  height: '120px', // Fixed height to ensure uniformity
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Two columns to match the layout of the data cards
  gap: '20px', // Adjusts spacing between the buttons
};

const buttonCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  border: '2px solid #c1b3a8',
  backgroundColor: '#f7f4f1',
  borderRadius: '20px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Light shadow for consistency
  height: '172px', // Adjust as needed for visual consistency with the data cards
  width: '100%' ,
  justifyContent: 'center',
  gap: '10px', // Space between the image and text
  //transform: 'translateX(-7%)',
};

const textStyle = {
  fontSize: '0.938em', // Adjust if needed to fit within button width
  whiteSpace: 'nowrap', // Prevents text wrapping
};

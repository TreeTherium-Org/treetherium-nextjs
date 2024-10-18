'use client';

import styles from "./page.module.css";import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Section from '/src/app/component/layouts/Section.js';


export default function App() {
  return (
    <Section allNotification={false} searchPopup={true} title={'Home'}>
      <header style={headerStyle}>
          <h1>Tokenizing Tree Planting Worldwide</h1>
          <h3>Create A Greener World Together</h3>
      </header>
      <main style={mainStyle}>
        <div>
          <h3>Step by step how to use this app</h3>
        </div>
        <div style={dataGridStyle}>
            <div style={dataCardStyle} onClick={() => handleButtonClick('/my-forest')}>
                <strong>My Forest</strong> <span style={{ fontSize: '1.2em' }}></span>
            </div>
        </div>
        <button>
          Register/Sign In
        </button>
        </main>
    </Section>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '20px',
};

const headerStyle = {
  textAlign: 'center',
  marginTop: '25px',
};


const mainStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '30px',
};

const dataGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginBottom: '20px',
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
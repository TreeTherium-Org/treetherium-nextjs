import React from 'react';
import Image from 'next/image'; // Use Next.js Image component
import styles from '../page.module.css';

const StartupPage = () => {
  return (
    <div className={styles.startupPage}>
      <Image
        src="/assets/img/Startup Page.png" 
        alt="Loading"
        layout="fill" // This will make the image fill its parent container
        objectFit="cover" // Ensures the image covers the area without distortion
        className={styles.startupImage}
      />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default StartupPage;

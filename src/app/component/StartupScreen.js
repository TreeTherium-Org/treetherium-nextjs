import React from 'react';
import Image from 'next/image'; 
import styles from '../page.module.css';

const StartupScreen = () => {
  return (
    <div className={styles.startupPage}>
      <Image
        src="/assets/img/Startup Page.png" 
        alt="Loading"
        layout="fill" 
        objectFit="cover" 
        className={styles.startupImage}
        priority={true}
      />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default StartupScreen;

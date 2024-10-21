'use client';

import React, { useEffect } from 'react';
import Image from 'next/image'; // Use Next.js Image component
import { useRouter } from 'next/navigation'; // Correct useRouter import for Next.js 13+ App Router
import styles from './page.module.css';

const StartupPage = () => {
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the landing page after 3 seconds
      router.push('/landingpage');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.startupPage}>
      <Image
        src="/assets/img/Startup Page.png" 
        alt="Loading"
        fill // 'layout="fill"' is now 'fill' in Next.js
        style={{ objectFit: 'cover' }} // Ensures the image covers the area without distortion
        className={styles.startupImage}
      />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default StartupPage;

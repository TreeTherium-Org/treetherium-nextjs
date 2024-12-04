"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Section from "../component/layouts/Section.js";
import styles from './Home.module.css'; // Import the CSS module

const Home = () => {
  const router = useRouter();

  // Function to handle button click to redirect pages
  const handleButtonClick = (route) => {
    router.push(route); // Redirect to the specified route
  };

  return (
    <Section allNotification={false} searchPopup={true} title={"Home"}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerImageContainer}>
            <Image
              src="/assets/img/landing-home.png"
              alt="Everyone Can Grow A Tree"
              width={2000} // Set a large enough width for the image
              height={600} // Adjust the height according to your needs
              className={styles.headerImage} // Use class from module
              priority={true}
            />
          </div>
        </div>
        <main className={styles.main}>
          <div className={styles.buttonGrid}>
            <div
              className={styles.buttonCard}
              onClick={() => handleButtonClick("/my-forest")}
            >
              <Image
                src="/assets/img/my-forest.png"
                alt="Tree Planting Project"
                width={109}
                height={109}
                className={styles.image} // Use class from module
                priority={true}
              />
              <strong className={styles.text}>My Forest</strong>
            </div>
            <div
              className={styles.buttonCard}
              onClick={() => handleButtonClick("/analytics")}
            >
              <Image
                src="/assets/img/analytic.png"
                alt="Single Tree"
                width={109}
                height={109}
                className={styles.image} // Use class from module
                priority={true}
              />
              <strong className={styles.text}>Analytics</strong>
            </div>
            <div
              className={styles.buttonCard}
              onClick={() => handleButtonClick("/knowledge-base")}
            >
              <Image
                src="/assets/img/knowledge-base.png"
                alt="Single Tree"
                width={109}
                height={109}
                className={styles.image} // Use class from module
                priority={true}
              />
              <strong className={styles.text}>Knowledge Base</strong>
            </div>
          </div>
        </main>
      </div>
    </Section>
  );
};

export default Home;

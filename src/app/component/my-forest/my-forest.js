"use client";
import { useState } from "react";
import Image from "next/image";
import Section from "../layouts/Section";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./my-forest.module.css";

const MyForestPage = () => {
  const router = useRouter();
  const [hasPlanted, setHasPlanted] = useState(null);

  const handleYesClick = () => {
    setHasPlanted(true);
    router.push("/planted-forest"); // Redirect to the planted forest page
  };

  const handleNoClick = () => {
    setHasPlanted(false);
    router.push("/lets-start-planting"); // Redirect to the lets start planting page
  };

  return (
    <Section allNotification={false} searchPopup={true} title="My Forest">
      <div className={styles.container}>
        <main className={styles.main}>
          <p className={styles.question}>Have you planted any trees yet?</p>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleYesClick}>
              Yes
            </button>
            <button className={styles.button} onClick={handleNoClick}>
              No
            </button>
          </div>
          <div className={styles.card}>
            <Link href="/my-projects">
              <div className={styles.circle}>
                <Image
                  src="/assets/img/my-project.png"
                  alt="My Projects"
                  width={100}
                  height={100}
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <p className={styles.projectText}>My Projects</p>
            </Link>
          </div>
        </main>
      </div>
    </Section>
  );
};

export default MyForestPage;

"use client";

import styles from "./planted-forest.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../layouts/Section";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firebase import
import useQuery from "@/app/libs/useQuery";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
// import { useSession } from "next-auth/react"; // Assuming you're using next-auth

const MyPlantedForest = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showRedirectPopup, setShowRedirectPopup] = useState(false);
  const router = useRouter();
  const { data: user } = useQuery("/api/me");
  // const db = getFirestore();

  // useEffect(() => {
  //   const checkWalletConnection = async () => {
  //     if (session?.user?.id) {
  //       const userRef = doc(db, "users", session.user.id);
  //       const userDoc = await getDoc(userRef);

  //       if (userDoc.exists() && userDoc.data().walletAddress) {
  //         setIsWalletConnected(true);
  //       } else {
  //         setIsWalletConnected(false);
  //       }
  //     }
  //   };

  //   checkWalletConnection();
  // }, [db, session]);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (user?.walletAddress) {
        setIsWalletConnected(true);
      } else {
        setIsWalletConnected(false);
      }
    };

    checkWalletConnection();
  }, [user]);

  const handleButtonClick = async (route) => {
    if (isWalletConnected) {
      router.push(route); // Redirect if wallet is connected
    } else {
      // Show toast notification with a clickable link
      toast.error(
        <div>
          Please connect your wallet first at your{" "}
          <Link
            href="/usersetting"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            account settings
          </Link>{" "}
          before proceeding.
        </div>
      );
    }
  };

  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"My Planted Forest"}
    >
      {/* Toaster for notifications */}
      <Toaster position="top-center" />

      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className="form-title">My Data Overview</h3>
        </header>
        <main className={styles.main}>
          <div className={styles.dataGrid}>
            <div className={styles.dataCard}>
              <strong>My Projects</strong>
              <span>
                <strong>0.0</strong>
              </span>
            </div>
            <div className={styles.dataCard}>
              <strong>My Trees</strong>
              <span>
                <strong>0.0</strong>
              </span>
            </div>
            <div className={styles.dataCard}>
              <strong>Carbon Sequestration</strong>
              <span>
                <strong>0.0 Tons</strong>
              </span>
            </div>
            <div className={styles.dataCard}>
              <strong>Oxygen Produced</strong>
              <span>
                <strong>0.0 Liters</strong>
              </span>
            </div>
          </div>
          <div className={styles.buttonGrid}>
            <div
              className={styles.buttonCard}
              onClick={() => handleButtonClick("/list-trees")}
            >
              <Image
                src="/assets/img/lsp/single-tree.jpeg"
                alt="Single Tree"
                width={109}
                height={109}
                style={{ borderRadius: "20%", marginTop: "20px" }}
              />
              <p className={styles.label}>Plant A Tree</p>
            </div>
            <div
              className={styles.buttonCard}
              onClick={() => handleButtonClick("/my-projects")}
            >
              <Image
                src="/assets/img/lsp/many-trees.jpeg"
                alt="Tree Planting Project"
                width={109}
                height={109}
                style={{ borderRadius: "20%", marginTop: "20px" }}
              />
              <p className={styles.label}>Start A Project</p>
            </div>
          </div>
        </main>

        {/* Redirect Popup */}
        {showRedirectPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <p>
                You are not connected to your wallet yet. Redirecting to Account
                Profile page...
              </p>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default MyPlantedForest;

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../layouts/Section";
import { useRouter } from "next/navigation";
import useQuery from "@/app/libs/useQuery";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import styles from "./lets-start-planting.module.css";

const LetsStartPlanting = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showRedirectPopup, setShowRedirectPopup] = useState(false);
  const router = useRouter();
  const { data: user } = useQuery("/api/me");

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
      title={"Let's Start Planting"}
    >
      <Toaster position="top-center" />
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className="form-title">
            &quot;what are you planting today?&quot;
          </h3>
          <div className={styles.buttonGroup}>
            <div
              onClick={() => handleButtonClick("list-trees")}
              className={styles.card}
            >
              <Image
                src="/assets/img/lsp/single-tree.jpeg"
                alt="Single Tree"
                width={168}
                height={168}
                className={styles.imageShadow}
              />
              <p className={styles.label}>Single Tree</p>
            </div>

            <div
              onClick={() => handleButtonClick("/my-projects")}
              className={styles.card}
            >
              <Image
                src="/assets/img/lsp/many-trees.jpeg"
                alt="Tree Planting Project"
                width={168}
                height={168}
                className={styles.imageShadow}
              />
              <p className={styles.label}>Tree Planting Project</p>
            </div>
          </div>
        </header>

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

export default LetsStartPlanting;

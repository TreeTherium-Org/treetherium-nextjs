"use client";
import React from "react";
import Section from "../layouts/Section";
import Link from "next/link";
import { signOut } from "next-auth/react";
import useQuery from "../../libs/useQuery";
import styles from "./accountprofile.module.css";
import { Toaster, toast } from "react-hot-toast";

const AccountProfile = () => {
  const { data: userData } = useQuery("/api/me");

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      await signOut({ callbackUrl: "/signin" });
      toast.success("Logged out successfully!", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to log out. Please try again.", { id: loadingToast });
      console.error("Error logging out:", error);
    }
  };

  const FullScreenLoader = () => (
    <div className="fullScreenLoader">
      <div className="loading"></div>
    </div>
  );

  if (!userData) {
    return <FullScreenLoader />;
  }

  return (
    <Section allNotification={false} searchPopup={true} title="Account Profile">
      <Toaster position="top-center" />
      <div className={styles.profileArea}>
        <div className="container">
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <img
                src={userData.profileImageUrl || `/assets/img/user.png`}
                alt="Profile"
                className={styles.profileImage}
              />
              <h5 className={styles.profileName}>{userData.username}</h5>
              <p>&quot;{userData.motto || "Your Life's Motto"}&quot;</p>
              <p>{userData.country || "Country"}</p>
            </div>

            <div className={styles.profileDetails}>
              <div className={styles.detailItem}>
                <label>Your Email</label>
                <div className={styles.inputBox}>
                  <span>{userData.email}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <label>Your Wallet Address</label>
                <div className={styles.inputBox}>
                  <span>
                    {userData.walletAddress || "No wallet address provided."}
                  </span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <label>Registration Date</label>
                <div className={styles.inputBox}>
                  <span>
                    {userData.createdAt
                      ? new Date(
                          userData.createdAt.seconds * 1000
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.btnEdit}>
                <Link href="/usersetting" style={{ color: "#fff" }}>
                  Edit Profile
                </Link>
              </button>
              <button className={styles.btnLogout} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AccountProfile;

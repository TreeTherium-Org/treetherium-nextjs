"use client";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Section from "../component/layouts/Section.js";
import styles from './lost-password.module.css'; // Import the CSS module

export default function LossPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Check if the email exists in the Firestore database
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Email does not exist in our records. Please try again.");
        setMessage("");
        return;
      }

      // If email exists, send the password reset email
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");

      // Start the 5-second timer for redirection
      setTimeout(() => {
        router.push("/signin");
      }, 5000);
    } catch (error) {
      console.log(error);
      setError(
        "Failed to send password reset email. Make sure your email is correct."
      );
      setMessage("");
    }
  };

  return (
    <Section allNotification={false} searchPopup={true} title={"Lost Password"}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <h5 className={styles.title}>
            Enter email address associated with your account and we&apos;ll send
            email with instruction to reset your password
          </h5>
          <form onSubmit={handleForgotPassword} className={styles.form}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Send Email
            </button>
          </form>
          {message && <p className={styles.message}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.loginText}>
            Already have an account?{" "}
            <Link href="/signin" className={styles.loginLink}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}

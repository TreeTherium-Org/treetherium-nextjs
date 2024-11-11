"use client";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import Section from "../component/layouts/Section.js";

export default function LossPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (error) {
      setError(
        "Failed to send password reset email. Make sure your email is correct."
      );
      setMessage("");
    }
  };

  return (
    <Section allNotification={false} searchPopup={true} title={"Lost Password"}>
      <div style={styles.outerContainer}>
        <div style={styles.innerContainer}>
          <h5 style={styles.title}>
            Enter email address associated with your account and we&apos;ll send
            email with instruction to reset your password
          </h5>
          <form onSubmit={handleForgotPassword} style={styles.form}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Send Email
            </button>
          </form>
          {message && <p style={styles.message}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}
          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link href="/signin" style={styles.loginLink}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    padding: "20px",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "1.5rem",
    color: "#4F3738",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "400px",
    paddingTop: "80px", // Adjust as needed to give some space below the back button
  },
  title: {
    fontSize: "1.0rem",
    fontWeight: "400",
    marginBottom: "40px",
    textAlign: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "20px",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#778B28",
    color: "#fff",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },
  message: {
    color: "#4F3738",
    marginTop: "10px",
    textAlign: "center",
  },
  error: {
    color: "red", // Error message in red
    marginTop: "10px",
    textAlign: "center",
  },
  loginText: {
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "20px",
  },
  loginLink: {
    color: "#4F3738",
    textDecoration: "none",
    textDecoration: "underline",
  },
};

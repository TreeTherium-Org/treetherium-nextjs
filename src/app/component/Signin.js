"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCsrfToken, signIn } from "next-auth/react";
import Section from "../component/layouts/Section.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { SigninMessage } from "../libs/signinMessage.js";
import { Toaster, toast } from "react-hot-toast";
import bs58 from "bs58";
import styles from "./Signin.module.css";

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className="full-screen-loader">
    <div className="loading"></div>
  </div>
);

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Success state
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handlePhantomWalletSignin = async () => {
    try {
      if ("solana" in window) {
        const provider = window.solana;
        const response = await provider.connect();

        if (!response.publicKey) {
          alert("Error connecting to phantom wallet");
        }

        const csrf = await getCsrfToken();
        if (!response.publicKey || !csrf || !provider.signMessage) return;

        const message = new SigninMessage({
          domain: window.location.host,
          publicKey: provider.publicKey?.toBase58(),
          statement: `Sign this message to sign in to the app.`,
          nonce: csrf,
        });

        const data = new TextEncoder().encode(message.prepare());
        const signature = await provider.signMessage(data);
        const serializedSignature = bs58.encode(signature?.signature);

        const result = await signIn("solana", {
          message: JSON.stringify(message),
          signature: serializedSignature,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push("/home");
      } else {
        alert("Phantom Wallet not found. Please install it first.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleRememberPasswordChange = (e) => {
    setRememberPassword(e.target.checked);
  };

  const checkUserExists = async (uid) => {
    const userDocRef = doc(collection(db, "users"), uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists();
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/user-not-found":
        setError("No account found with this email. Please sign up first.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email.");
        break;
      case "auth/invalid-credential":
        setError(
          "The email/password provided are not valid. Please try again."
        );
        break;
      case "auth/user-disabled":
        setError("This account has been disabled. Please contact support.");
        break;
      case "auth/too-many-requests":
        setError("Too many login attempts. Please try again later.");
        break;
      case "auth/popup-closed-by-user":
        setError("The sign-in popup was closed. Please try again.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Please check your internet connection.");
        break;
      case "auth/cancelled-popup-request":
        setError(
          "Multiple sign-in attempts detected. Please complete the first sign-in attempt."
        );
        break;
      default:
        setError(
          error.message || "An unexpected error occurred. Please try again."
        );
        toast.error(errorMessage); // Display error using toast
        console.error("Firebase Error:", error);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing in...");
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userExists = await checkUserExists(userCredential.user.uid);

      if (!userExists) {
        throw new Error("User not found. Please sign up first.");
      }

      const result = await signIn("email", {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Login successful! Redirecting to home page...", {
        id: loadingToast, // Replace the loading toast
      });
      router.push("/home");
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        id: loadingToast, // Replace the loading toast
      });
      handleFirebaseError(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Section allNotification={false} searchPopup={true} title="Login">
        <div className={styles.logoContainer}>
          <h3></h3>
        </div>

        <div className={`${styles.signinArea} ${styles.mgBottom35}`}>
          <div className={styles.container}>
            <form
              className={styles.contactFormInner}
              onSubmit={signInWithEmail}
            >
              {error && <p className={styles.errorMessage}>{error}</p>}
              {success && <p className={styles.successMessage}>{success}</p>}
              {/* Success message */}
              <label className={styles.singleInputWrap}>
                <span>Email Address*</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label className={styles.singleInputWrap}>
                <span>Password*</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className={styles.options}>
                <label className={styles.rememberPassword}>
                  <input
                    type="checkbox"
                    checked={rememberPassword}
                    onChange={handleRememberPasswordChange}
                  />
                  Remember Password
                </label>
                <Link
                  href="/lostpassword"
                  className={styles.forgotPasswordLink}
                >
                  Forgot Password
                </Link>
              </div>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnLogin}`}
              >
                Login
              </button>

              <Link className={styles.forgotBtn} href="/signup">
                <span className={styles.underlineText}>Create an account</span>
              </Link>
            </form>
            <div className={styles.socialButtons}>
              <button
                onClick={handlePhantomWalletSignin}
                className={`${styles.socialButton} ${styles.btnPhantomWallet}`}
              >
                <img
                  src="https://s5-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/073/700/original/1200x1200.png?1712005160"
                  alt="Phantom Wallet"
                />
                Login with Phantom Wallet
              </button>
              {/* <WalletButton /> */}
              <button
                onClick={() => signIn("google")}
                className={`${styles.socialButton} ${styles.btnGoogle}`}
              >
                <img
                  src="https://theplace2b.com.au/wp-content/uploads/2020/09/178-1783296_g-transparent-circle-google-logo.png"
                  alt="Google"
                />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Signin;

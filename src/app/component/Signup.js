"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCsrfToken, signIn } from "next-auth/react";
import Section from "../component/layouts/Section.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { SigninMessage } from "../libs/signinMessage.js";
import bs58 from "bs58";

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className="full-screen-loader">
    <div className="loading"></div>
  </div>
);

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false); // Checkbox state
  const [modal, setModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }

    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [modal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleAgreeClick = () => {
    // Open the modal without setting `acceptTerms` to true
    setIsModalOpen(true);
  };

  const handleOutsideClick = (e) => {
    // Close the modal if clicked outside the modal content
    if (e.target.id === "modalOverlay") {
      setIsModalOpen(false);
    }
  };

  const handleAcceptTerms = () => {
    // Set acceptTerms to true and close the modal when "Accept" inside the modal is clicked
    setAcceptTerms(true);
    setIsModalOpen(false);
  };

  const checkUserExists = async (uid) => {
    try {
      const userDocRef = doc(collection(db, "users"), uid);
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists();
    } catch (error) {
      setError("Failed to check if the user exists. Please try again.");
      console.error(error);
      return false;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Username is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userExists = await checkUserExists(userCredential.user.uid);

      if (!userExists) {
        const userDocRef = doc(
          collection(db, "users"),
          userCredential.user.uid
        );
        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username: username,
          createdAt: new Date(),
        });
      }

      const result = await signIn("credentials", {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        username: username,
        redirect: false,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      router.push("/home");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setError(
          "This email is already registered. Please log in or use a different email."
        );
        break;
      case "auth/invalid-email":
        setError("The email address is not valid. Please enter a valid email.");
        break;
      case "auth/weak-password":
        setError("Password should be at least 6 characters.");
        break;
      case "auth/operation-not-allowed":
        setError("This account type is not enabled. Please contact support.");
        break;
      case "auth/user-disabled":
        setError("This account has been disabled. Please contact support.");
        break;
      case "auth/user-not-found":
        setError("No account found with this email. Please sign up.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/popup-closed-by-user":
        setError("Sign-in popup closed. Please try again.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Please check your internet connection.");
        break;
      default:
        setError(
          error.message || "An unexpected error occurred. Please try again."
        );
        break;
    }
    console.error("Firebase Error:", error);
  };

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
          redirect: false,
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

  return (
    <>
      {loading && <FullScreenLoader />}
      <Section allNotification={false} searchPopup={true} title="Registration">
        <div className="logo-container">
          <h3></h3>
        </div>
        <div className="signin-area mg-bottom-35">
          <div className="container">
            <form className="contact-form-inner" onSubmit={signUpWithEmail}>
              {error && <p className="error-message">{error}</p>}
              <label className="single-input-wrap">
                <span>User Name*</span>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label className="single-input-wrap">
                <span>Email Address*</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label className="single-input-wrap">
                <span>Password*</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className="options">
                <label className="accept-terms">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span style={{ display: "inline" }}>
                    Accept the{" "}
                    <a
                      href="#"
                      className="underline-text"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAgreeClick();
                      }}
                    >
                      Terms & Conditions
                    </a>
                  </span>
                </label>
              </div>
              {isModalOpen && (
                <div style={styles.modal}>
                  <div
                    id="modalOverlay"
                    onClick={handleOutsideClick}
                    style={styles.overlay}
                  ></div>
                  <div style={styles.modalContent}>
                    <h2 style={styles.titleModal}>Terms & Conditions</h2>
                    <h3 style={styles.sectionTitle}>App & Crypto</h3>
                    <p style={styles.paragraphModal}>
                      Using the TreeTherium app is at your own risk. We
                      prioritize your safety, but remember: your keys, your
                      wallet. Keep your information secure, and be cautious.
                      TreeTherium will never ask you to send money or crypto to
                      us or anyone claiming to represent us – stay vigilant
                      against scams.
                    </p>

                    <h3 style={styles.sectionTitle}>Tree Planting</h3>
                    <p style={styles.paragraphModal}>
                      Please only plant trees with permission from the
                      landowner. Respecting property rights is essential for a
                      positive impact. When possible, choose indigenous species
                      for planting. Native trees benefit the local ecosystem and
                      are more sustainable in the long run.
                    </p>

                    <h3 style={styles.sectionTitle}>Community</h3>
                    <p style={styles.paragraphModal}>
                      Our community thrives on kindness and respect. Be friendly
                      and supportive to others and to nature. Invite friends who
                      share our vision of a greener future.
                    </p>

                    <h3 style={styles.sectionTitle}>Data</h3>
                    <p style={styles.paragraphModal}>
                      Your privacy is important. Any personal data is encrypted
                      and will not be shared. Tree data, however, may be shared
                      with forestry departments, universities, scientists, and
                      research institutes to support research and conservation
                      efforts.
                    </p>
                    <div style={styles.btn}>
                      <button style={styles.btnDisagree}>
                        <Link href="/" style={{ color: "#fff" }}>
                          I Disagree
                        </Link>
                      </button>
                      <button
                        style={styles.btnAgree}
                        onClick={handleAcceptTerms}
                      >
                        I Agree
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-purple"
                disabled={!acceptTerms}
              >
                Register
              </button>
              <Link className="forgot-btn" href="/signin">
                Already have an account? Go to{" "}
                <span className="underline-text">Login</span>
              </Link>
            </form>
            <div className="social-buttons">
              <button
                onClick={handlePhantomWalletSignin}
                className="social-button btn-phantom-wallet"
              >
                <img
                  src="https://s5-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/073/700/original/1200x1200.png?1712005160"
                  alt="Phantom Wallet"
                />
                Sign up with Phantom Wallet
              </button>
              <button
                onClick={() => signIn("google")}
                className="social-button btn-google"
              >
                <img
                  src="https://theplace2b.com.au/wp-content/uploads/2020/09/178-1783296_g-transparent-circle-google-logo.png"
                  alt="Google"
                />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Signup;

const styles = {
  body: {
    activeModal: {
      overflowY: "hidden",
    },
  },
  titleModal: {
    fontSize: "1.5em",
    fontWeight: 700,
    color: "#4F3738",
    marginBottom: "15px",
  },
  sectionTitle: {
    fontSize: "1.2em",
    fontWeight: 700,
    color: "#4F3738",
  },
  paragraphModal: {
    fontSize: "1em",
    fontWeight: 500,
    color: "#4F3738",
  },
  btn: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  btnAgree: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    margin: "0 5px",
    fontSize: "20px",
    backgroundColor: "#778b28",
    color: "#fff",
  },
  btnDisagree: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    margin: "0 5px",
    fontSize: "20px",
    backgroundColor: "#4f3738",
  },
  modal: {
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "fixed",
    zIndex: 999,
  },
  overlay: {
    background: "rgba(49, 49, 49, 0.8)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    lineHeight: 1.4,
    background: "#f1f1f1",
    padding: "14px 28px",
    borderRadius: "8px",
    maxWidth: "600px",
    minWidth: "300px",
    maxHeight: "80vh", // Limits height to 80% of viewport height
    overflowY: "auto", // Makes content scrollable if needed
  },
  closeModal: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px 7px",
  },
};

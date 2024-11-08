import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Section from "../component/layouts/Section.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, collection, query, where, getDocs  } from "firebase/firestore";

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
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

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
      case 'auth/user-not-found':
        setError("No account found with this email. Please sign up first.");
        break;
      case 'auth/wrong-password':
        setError("Incorrect password. Please try again.");
        break;
      case 'auth/invalid-email':
        setError("Invalid email format. Please enter a valid email.");
        break;
      case 'auth/invalid-credential':
        setError("The email/password provided are not valid. Please try again.");
        break;
      case 'auth/user-disabled':
        setError("This account has been disabled. Please contact support.");
        break;
      case 'auth/too-many-requests':
        setError("Too many login attempts. Please try again later.");
        break;
      case 'auth/popup-closed-by-user':
        setError("The sign-in popup was closed. Please try again.");
        break;
      case 'auth/network-request-failed':
        setError("Network error. Please check your internet connection.");
        break;
      case 'auth/cancelled-popup-request':
        setError("Multiple sign-in attempts detected. Please complete the first sign-in attempt.");
        break;
      default:
        setError(error.message || "An unexpected error occurred. Please try again.");
        break;
    }
    console.error('Firebase Error:', error);
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userExists = await checkUserExists(userCredential.user.uid);

      if (!userExists) {
        throw new Error("User not found. Please sign up first.");
      }

      const result = await signIn("credentials", {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        redirect: false,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      router.push("/home");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleProviderSignIn = async (provider) => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userExists = await checkUserExists(user.uid);

      if (!userExists) {
        throw new Error("User not found. Please sign up first.");
      }

      const nextAuthResult = await signIn("credentials", {
        userId: user.uid,
        email: user.email,
        provider: provider.providerId,
        redirect: false,
      });

      if (nextAuthResult.error) {
        throw new Error(nextAuthResult.error);
      }

      router.push("/home");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const checkUserExistsByWalletAddress = async (walletAddress) => {
    try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("walletAddress", "==", walletAddress));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { exists: true, userId: doc.id };
        } else {
            return { exists: false };
        }
    } catch (error) {
        setError("Failed to check if the wallet address exists. Please try again.");
        console.error(error);
        return { exists: false };
    }
};

  const connectPhantomWallet = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const { solana } = window;
      if (!solana || !solana.isPhantom) {
        throw new Error("Phantom Wallet not found. Please install it.");
      }

      const response = await solana.connect();
      const walletAddress = response.publicKey.toString();

      // Check if user exists by wallet address
      const userCheck = await checkUserExistsByWalletAddress(walletAddress);

      if (!userCheck.exists) {
        // If no account is found, prompt the user to sign up
        throw new Error("Account not found. Please sign up first.");
      }

      // Log in with the existing user ID
      const nextAuthResult = await signIn("credentials", {
        userId: userCheck.userId,
        provider: "Phantom",
        walletAddress: walletAddress,
        redirect: false,
      });

      if (nextAuthResult.error) {
        throw new Error(nextAuthResult.error);
      }

      router.push("/home");
    } catch (error) {
      handleFirebaseError(error); // Display error message
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const googleProvider = new GoogleAuthProvider();

  return (
    <>
      {loading && <FullScreenLoader />}
      <Section allNotification={false} searchPopup={true} title="Login">
        <div className="logo-container">
          <h3></h3>
        </div>

        <div className="signin-area mg-bottom-35">
          <div className="container">
            <form className="contact-form-inner" onSubmit={signInWithEmail}>
              {error && <p className="error-message">{error}</p>}
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
                <label className="remember-password">
                  <input
                    type="checkbox"
                    checked={rememberPassword}
                    onChange={handleRememberPasswordChange}
                  />
                  Remember Password
                </label>
                <Link href="/lostpassword" className="forgot-password-link">
                  Forgot Password
                </Link>
              </div>
              <button type="submit" className="btn btn-purple">
                Login
              </button>
              <Link className="forgot-btn" href="/signup">
                <span className="underline-text">Create an account</span>
              </Link>
            </form>
            <div className="social-buttons">
              <button
                onClick={connectPhantomWallet}
                className="social-button btn-phantom-wallet"
              >
                <img
                  src="https://s5-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/073/700/original/1200x1200.png?1712005160"
                  alt="Phantom Wallet"
                />
                Login with Phantom Wallet
              </button>
              <button
                onClick={() => handleProviderSignIn(googleProvider)}
                className="social-button btn-google"
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

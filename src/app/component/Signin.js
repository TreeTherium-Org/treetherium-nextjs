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
import { doc, getDoc, collection } from "firebase/firestore";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState(null);
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

  const signInWithEmail = async (e) => {
    e.preventDefault();
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
      console.error("Error signing in:", error);
      setError(error.message);
    }
  };

  const handleProviderSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userExists = await checkUserExists(user.uid);

      if (!userExists) {
        throw new Error("User not found. Please sign up first.");
      }

      const nextAuthResult = await signIn("credentials", {
        userId: user.uid,
        username: user.username,
        email: user.email,
        provider: provider.providerId,
        redirect: false,
      });

      if (nextAuthResult.error) {
        throw new Error(nextAuthResult.error);
      }

      router.push("/home");
    } catch (error) {
      console.error("Error signing in with provider:", error);
      setError(error.message);
    }
  };

  const connectPhantomWallet = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        const walletAddress = response.publicKey.toString();
        const userExists = await checkUserExists(walletAddress);

        if (!userExists) {
          throw new Error("User not found in Firestore. Please sign up first.");
        }

        const nextAuthResult = await signIn("credentials", {
          userId: walletAddress,
          provider: "Phantom",
          walletAddress: walletAddress,
          redirect: false,
        });

        if (nextAuthResult.error) {
          throw new Error(nextAuthResult.error);
        }

        router.push("/home");
      } else {
        throw new Error("Phantom Wallet not found. Please install it.");
      }
    } catch (error) {
      console.error("Error connecting to Phantom Wallet:", error);
      setError(error.message);
    }
  };

  const googleProvider = new GoogleAuthProvider();

  return (
    <Section allNotification={false} searchPopup={true} title="Login">
      <div className="logo-container">
        <h3></h3>
      </div>

      <div className="signin-area mg-bottom-35">
        <div className="container">
          <form className="contact-form-inner" onSubmit={signInWithEmail}>
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
              <Link href="/forgot-password" className="forgot-password-link">
                Forgot Password
              </Link>
            </div>
            <button type="submit" className="btn btn-purple">
              Login
            </button>
            <Link className="forgot-btn" href="/signup">
              Create an account
            </Link>
          </form>
          {error && <p className="error">{error}</p>}
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
  );
};

export default Signin;

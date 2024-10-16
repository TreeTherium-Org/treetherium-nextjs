import { useState } from "react";
import Section from '../component/layouts/Section.js';
import { useRouter } from "next/router";
import Link from "next/link"; // Using Next.js Link component
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, doc, setDoc } from "firebase/firestore";

const Signin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store the user's data in localStorage or state
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to user-setting page
            router.push("/user-setting");
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const handleProviderSignIn = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Store user data locally or in state
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to user-setting page
            router.push("/user-setting");
        } catch (error) {
            console.error("Error signing in with provider:", error);
            setError(error.message);
        }
    };

    const connectPhantomWallet = async () => {
        try {
            if (window.solana && window.solana.isPhantom) {
                const provider = window.solana;
                const response = await provider.connect();

                const publicKey = provider.publicKey?.toString();
                if (publicKey) {
                    console.log("Connected to Phantom Wallet with public key:", publicKey);

                    // Save the wallet address and username to Firestore
                    const userDocRef = doc(collection(db, "users"), publicKey);
                    await setDoc(userDocRef, { walletAddress: publicKey });

                    // Redirect to user-setting page
                    router.push("/user-setting");
                } else {
                    throw new Error("Public key is null.");
                }
            } else {
                throw new Error("Phantom Wallet is not installed.");
            }
        } catch (error) {
            console.error("Error connecting to Phantom Wallet:", error);
            setError(error.message);
        }
    };

    // Initialize providers
    const googleProvider = new GoogleAuthProvider();

    return (
        <Section allNotification={false} searchPopup={true} title={'Login'}>
            <div className="ba-page-name text-center mg-bottom-40">
                <h3>Login</h3>
            </div>

            <div className="signin-area mg-bottom-35">
                <div className="container">
                    <form className="contact-form-inner" onSubmit={signIn}>
                        <label className="single-input-wrap">
                            <span>Email Address*</span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="single-input-wrap">
                            <span>Password*</span>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <div className="single-checkbox-wrap">
                            <input type="checkbox" />
                            <span>Remember Password</span>
                        </div>

                        {/* Login button and Create account link in same container */}
                        <div className="login-create-container">
                            <button className="btn btn-purple" type="submit">Login</button>

                            {/* Create account link directly below login button */}
                            <div className="create-account-link">
                                <Link href="/signup">
                                    Create an account
                                </Link>
                            </div>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}

                    <div className="social-buttons">
                        <button onClick={connectPhantomWallet} className="social-button btn-phantom-wallet">
                            <img src="https://s5-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/073/700/original/1200x1200.png?1712005160" alt="Phantom Wallet" /> Sign in with Phantom Wallet
                        </button>
                        <button onClick={() => handleProviderSignIn(googleProvider)} className="social-button btn-google">
                            <img src="https://theplace2b.com.au/wp-content/uploads/2020/09/178-1783296_g-transparent-circle-google-logo.png" alt="Google" /> Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Signin;

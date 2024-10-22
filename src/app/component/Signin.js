import { useState } from "react";
import Section from '../component/layouts/Section.js';
import { useRouter } from "next/router";
import Link from "next/link";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

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
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/home");
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('Account not found. Please sign up first.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email format. Please enter a valid email.');
            } else {
                setError('Failed to sign in. Please try again later.');
            }
            console.error(error);
        }
    };

    const handleProviderSignIn = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // Register new user in Firestore with 'username'
                await setDoc(userDocRef, {
                    email: user.email,
                    username: user.displayName, // Changed to 'username'
                    createdAt: new Date(),
                    provider: provider.providerId,
                });
            }

            // Save user data in session
            localStorage.setItem("userId", user.uid); // Store as plain string

            const storedId = localStorage.getItem("userId");
            console.log("Stored ID:", storedId); // Check the output in the console.
            router.push("/home");
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                setError('Sign-in popup closed. Please try again.');
            } else if (error.code === 'auth/cancelled-popup-request') {
                setError('Multiple popups open. Please complete one sign-in at a time.');
            } else {
                setError('Failed to sign in with the selected provider. Please try again.');
            }
            console.error("Error signing in with provider:", error);
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
                    const userDocRef = doc(collection(db, "users"), publicKey);
                    await setDoc(userDocRef, { walletAddress: publicKey });
                    router.push("/home");
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

    const googleProvider = new GoogleAuthProvider();

    return (
        <Section allNotification={false} searchPopup={true} title={'Login'}>
            <div className="logo-container">
                <h3>

                </h3>
            </div>

            <div className="signin-area">
                <div className="container">
                    <form className="contact-form-inner" onSubmit={signIn}>
                        <label className="single-input-wrap">
                            <span>Email Address*</span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className="form-input"
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
                                className="form-input"
                                required
                            />
                        </label>
                        <div className="single-checkbox-wrap">
                            <input type="checkbox" />
                            <span>Remember Password</span>
                        </div>

                        <div className="login-create-container">
                            <button className="btn btn-purple" type="submit">Login</button>
                            <div className="create-account-link">
                                <Link href="/signup">Create an account</Link>
                            </div>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}

                    <div className="social-buttons">
                        <button onClick={connectPhantomWallet} className="social-button btn-phantom-wallet">
                            <img src="https://s5-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/073/700/original/1200x1200.png?1712005160" alt="Phantom Wallet" className="icon" /> Sign in with Phantom Wallet
                        </button>
                        <button onClick={() => handleProviderSignIn(googleProvider)} className="social-button btn-google">
                            <img src="https://theplace2b.com.au/wp-content/uploads/2020/09/178-1783296_g-transparent-circle-google-logo.png" alt="Google" className="icon" /> Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Signin;

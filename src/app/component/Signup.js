import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Section from '../component/layouts/Section.js';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const signUpWithEmail = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(collection(db, "users"), userCredential.user.uid);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                username: username,
            });

            // Pass the user ID to the NextAuth session
            await fetch('../api/auth/callback/credentials', {
                method: 'POST',
                body: JSON.stringify({ userId: userCredential.user.uid }),
                headers: { 'Content-Type': 'application/json' },
            });

            router.push('/home'); // Redirect to the home page
        } catch (error) {
            console.error('Error signing up: ', error);
            setError(error.message);
        }
    };

    const handleProviderSignIn = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDocRef = doc(collection(db, "users"), user.uid);

            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                username: user.displayName || username,
                createdAt: new Date(),
                provider: provider.providerId
            });

            // Pass the user ID to the NextAuth session
            await fetch('../api/auth/callback/credentials', {
                method: 'POST',
                body: JSON.stringify({ userId: user.uid }),
                headers: { 'Content-Type': 'application/json' },
            });

            router.push('/home'); // Redirect to the home page
        } catch (error) {
            console.error('Error signing in with provider:', error);
            setError(error.message);
        }
    };

    const googleProvider = new GoogleAuthProvider();

    const connectPhantomWallet = async () => {
        try {
            const { solana } = window;
            if (solana && solana.isPhantom) {
                const response = await solana.connect(); // Connect to Phantom wallet
                const walletAddress = response.publicKey.toString(); // Get the wallet address

                // Save wallet address to Firebase
                const userDocRef = doc(collection(db, "users"), walletAddress); // Using wallet address as UID
                await setDoc(userDocRef, {
                    uid: walletAddress,
                    username: username,
                    provider: 'Phantom',
                });

                // Pass the wallet address to the NextAuth session
                await fetch('../api/auth/callback/credentials', {
                    method: 'POST',
                    body: JSON.stringify({ userId: walletAddress }),
                    headers: { 'Content-Type': 'application/json' },
                });

                router.push('/home'); // Redirect to the home page
            } else {
                console.error("Phantom Wallet not found.");
                setError("Phantom Wallet not found. Please install it.");
            }
        } catch (error) {
            console.error('Error connecting to Phantom Wallet:', error);
            setError(error.message);
        }
    };

    return (
        <Section allNotification={false} searchPopup={true} title="Register">
            <div className="logo-container">
                <h3></h3>
            </div>

            <div className="signin-area mg-bottom-35">
                <div className="container">
                    <form className="contact-form-inner" onSubmit={signUpWithEmail}>
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
                        <div className="single-checkbox-wrap">
                            <input type="checkbox" required />
                            <span>Accept the Terms & Conditions</span>
                        </div>
                        <button type="submit" className="btn btn-purple">Register</button>
                        <Link className="forgot-btn" href="/signin">
                            Already have an account? Go to Login
                        </Link>
                    </form>
                    {error && <p className="error">{error}</p>}
                    <div className="social-buttons">
                        <button onClick={connectPhantomWallet} className="social-button btn-phantom-wallet">
                            <img
                                src="https://s5-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/073/700/original/1200x1200.png?1712005160"
                                alt="Phantom Wallet"
                            />
                            Sign up with Phantom Wallet
                        </button>
                        <button onClick={() => handleProviderSignIn(googleProvider)} className="social-button btn-google">
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
    );
};

export default Signup;

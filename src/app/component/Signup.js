import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react'; // Add this import
import Section from '../component/layouts/Section.js';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
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

    const checkUserExists = async (uid) => {
        const userDocRef = doc(collection(db, "users"), uid);
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists();
    };

    const signUpWithEmail = async (e) => {
        e.preventDefault();
        try {
            // Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userExists = await checkUserExists(userCredential.user.uid);

            if (!userExists) {
                // Only save to Firestore if user doesn't exist
                const userDocRef = doc(collection(db, "users"), userCredential.user.uid);
                await setDoc(userDocRef, {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    username: username,
                    createdAt: new Date(),
                });
            }

            // Create NextAuth session
            const result = await signIn('credentials', {
                userId: userCredential.user.uid,
                email: userCredential.user.email,
                username: username,
                redirect: false,
            });

            if (result.error) {
                throw new Error(result.error);
            }

            router.push('/home');
        } catch (error) {
            console.error('Error signing up: ', error);
            setError(error.message);
        }
    };

    const handleProviderSignIn = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userExists = await checkUserExists(user.uid);

            if (!userExists) {
                // Only save to Firestore if user doesn't exist
                const userDocRef = doc(collection(db, "users"), user.uid);
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName || username,
                    createdAt: new Date(),
                    provider: provider.providerId
                });
            }

            // Create NextAuth session
            const nextAuthResult = await signIn('credentials', {
                userId: user.uid,
                email: user.email,
                username: user.displayName || username,
                provider: provider.providerId,
                redirect: false,
            });

            if (nextAuthResult.error) {
                throw new Error(nextAuthResult.error);
            }

            router.push('/home');
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
                // Connect to Phantom wallet
                const response = await solana.connect();
                const walletAddress = response.publicKey.toString();
                const userExists = await checkUserExists(walletAddress);

                if (!userExists) {
                    // Only save to Firestore if user doesn't exist
                    const userDocRef = doc(collection(db, "users"), walletAddress);
                    await setDoc(userDocRef, {
                        username: username || `Phantom_${walletAddress.slice(0, 6)}`,
                        provider: 'Phantom',
                        createdAt: new Date(),
                        walletAddress: walletAddress,
                    });
                }

                // Create NextAuth session
                const nextAuthResult = await signIn('credentials', {
                    username: username || `Phantom_${walletAddress.slice(0, 6)}`,
                    provider: 'Phantom',
                    walletAddress: walletAddress,
                    redirect: false,
                });

                if (nextAuthResult.error) {
                    throw new Error(nextAuthResult.error);
                }

                router.push('/home');
            } else {
                throw new Error("Phantom Wallet not found. Please install it.");
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
                        <div className="options">
                            <label className="accept-terms">
                                <input
                                    type="checkbox"
                                />
                                Accept the Terms & Conditions
                            </label>
                        </div>
                        <button type="submit" className="btn btn-purple">Register</button>
                        <Link className="forgot-btn" href="/signin">
                            Already have an account? Go to <span className="underline-text">Login</span>
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

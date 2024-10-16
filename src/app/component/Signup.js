import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Section from '../component/layouts/Section.js';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Update the path to your Firebase setup

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

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(collection(db, "users"), userCredential.user.uid);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                username: username,
            });

            router.push('/user-setting'); // Redirect to user-setting page
        } catch (error) {
            console.error('Error signing up: ', error);
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
                    console.log('Connected to Phantom Wallet with public key:', publicKey);
                    const userDocRef = doc(collection(db, 'users'), publicKey);
                    await setDoc(userDocRef, {
                        walletAddress: publicKey,
                    });
                    router.push('/user-setting');
                } else {
                    throw new Error('Public key is null.');
                }
            } else {
                throw new Error('Phantom Wallet is not installed.');
            }
        } catch (error) {
            console.error('Error connecting to Phantom Wallet:', error);
// TODO: Check which is the working connectPhantomWallet function
//     // Phantom wallet connection
//     const connectPhantomWallet = async () => {
//         try {
//             const provider = new PhantomWalletAdapter();
//             await provider.connect();
//             const publicKey = provider.publicKey?.toString();
//             if (publicKey) {
//                 const userDocRef = doc(collection(db, "users"), publicKey);
//                 await setDoc(userDocRef, { walletAddress: publicKey });
//                 router.push("/user-setting");
//             } else {
//                 throw new Error("Public key is null.");
//             }
//         } catch (error) {
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
            });
            router.push('/user-setting');
        } catch (error) {
            console.error('Error signing in with provider:', error);
            setError(error.message);
        }
    };

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();


    return (
        <Section allNotification={false} searchPopup={true} title="Register">
            <div className="ba-page-name text-center mg-bottom-40">
                <h3>Register</h3>
            </div>
            <div className="signin-area mg-bottom-35">
                <div className="container">
                    <form className="contact-form-inner" onSubmit={signUp}>
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

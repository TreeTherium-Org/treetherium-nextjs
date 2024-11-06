import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Section from '../component/layouts/Section.js';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

// Full-Screen Loader Component
const FullScreenLoader = () => (
    <div className="full-screen-loader">
        <div className="loading"></div>
    </div>
);

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false); // Checkbox state
    const [modal, setModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }

        // Cleanup function to remove the class if the component unmounts
        return () => {
            document.body.classList.remove('active-modal');
        };
    }, [modal]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const toggleModal = () => {
        setModal(!modal);
      };
    

    const handleCheckboxChange = (e) => {
        setAcceptTerms(e.target.checked);
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userExists = await checkUserExists(userCredential.user.uid);

            if (!userExists) {
                const userDocRef = doc(collection(db, "users"), userCredential.user.uid);
                await setDoc(userDocRef, {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    username: username,
                    createdAt: new Date(),
                });
            }

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
            handleFirebaseError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleProviderSignIn = async (provider) => {
        setLoading(true);
        setError(null);

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userExists = await checkUserExists(user.uid);

            if (!userExists) {
                const userDocRef = doc(collection(db, "users"), user.uid);
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName || username,
                    createdAt: new Date(),
                    provider: provider.providerId
                });
            }

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
            handleFirebaseError(error);
        } finally {
            setLoading(false);
        }
    };

    const connectPhantomWallet = async () => {
        setLoading(true);
        setError(null);

        try {
            const { solana } = window;
            if (!solana || !solana.isPhantom) {
                throw new Error("Phantom Wallet not found. Please install it.");
            }

            const response = await solana.connect();
            const walletAddress = response.publicKey.toString();

            const userExists = await checkUserExists(walletAddress);

            if (userExists) {
                const nextAuthResult = await signIn('credentials', {
                    userId: walletAddress,
                    walletAddress: walletAddress,
                    username: `Phantom_${walletAddress.slice(0, 6)}`,
                    provider: 'Phantom',
                    redirect: false,
                });

                if (nextAuthResult.error) {
                    throw new Error(nextAuthResult.error);
                }

                router.push('/home');
            } else {
                const userDocRef = doc(collection(db, "users"), walletAddress);
                await setDoc(userDocRef, {
                    username: username || `Phantom_${walletAddress.slice(0, 6)}`,
                    provider: 'Phantom',
                    createdAt: new Date(),
                    walletAddress: walletAddress,
                });

                const nextAuthResult = await signIn('credentials', {
                    userId: walletAddress,
                    walletAddress: walletAddress,
                    username: username || `Phantom_${walletAddress.slice(0, 6)}`,
                    provider: 'Phantom',
                    redirect: false,
                });

                if (nextAuthResult.error) {
                    throw new Error(nextAuthResult.error);
                }

                router.push('/home');
            }
        } catch (error) {
            handleFirebaseError(error);
        } finally {
            setLoading(false);
        }
    };

    const googleProvider = new GoogleAuthProvider();

    const handleFirebaseError = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                setError("This email is already registered. Please log in or use a different email.");
                break;
            case 'auth/invalid-email':
                setError("The email address is not valid. Please enter a valid email.");
                break;
            case 'auth/weak-password':
                setError("Password should be at least 6 characters.");
                break;
            case 'auth/operation-not-allowed':
                setError("This account type is not enabled. Please contact support.");
                break;
            case 'auth/user-disabled':
                setError("This account has been disabled. Please contact support.");
                break;
            case 'auth/user-not-found':
                setError("No account found with this email. Please sign up.");
                break;
            case 'auth/wrong-password':
                setError("Incorrect password. Please try again.");
                break;
            case 'auth/popup-closed-by-user':
                setError("Sign-in popup closed. Please try again.");
                break;
            case 'auth/network-request-failed':
                setError("Network error. Please check your internet connection.");
                break;
            default:
                setError(error.message || "An unexpected error occurred. Please try again.");
                break;
        }
        console.error('Firebase Error:', error);
    };

    return (
        <>
            {loading && <FullScreenLoader />}
            <Section allNotification={false} searchPopup={true} title="Register">
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
                                        onChange={handleCheckboxChange}
                                    />
                                    Accept the<span className="underline-text">Terms & Conditions</span>
                                </label>
                            </div>
                                {modal && (
                                    <div style={styles.modal}>
                                        <div onClick={toggleModal} style={styles.overlay}></div>
                                        <div style={styles.modalContent}>
                                            <h2 style={styles.titleModal}>Terms & Condition</h2>
                                            <p style={styles.paragraphModal}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                                            perferendis suscipit officia recusandae, eveniet quaerat assumenda
                                            id fugit, dignissimos maxime non natus placeat illo iusto!
                                            Sapiente dolorum id maiores dolores? Illum pariatur possimus
                                            quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                                            placeat tempora vitae enim incidunt porro fuga ea.
                                            </p>
                                            <button onClick={toggleModal} style={styles.btnModal}>
                                            CLOSE
                                            </button>
                                        </div>
                                    </div>
                                )}
                            <button type="submit" className="btn btn-purple" disabled={!acceptTerms}>Register</button>
                            <Link className="forgot-btn" href="/signin">
                                Already have an account? Go to <span className="underline-text">Login</span>
                            </Link>
                        </form>
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
        </>
    );
};

export default Signup;

const styles = {
    body: {
        activeModal: {
            overflowY: 'hidden',
        },
    },
    titleModal: {
        fontSize: '1.5em',
        fontWeight: 700,
        color: '#4F3738',
    },
    paragraphModal: {
        fontSize: '1em',
        fontWeight: 500,
        color: '#4F3738',
    },
    btnModal: {
        backgroundColor: '#778B28',
        color: '#fff',
        padding: '1px 20px',
        fontSize: '1.25em',
        fontWeight: '500',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        lineHeight: '50px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '93px', /* Maximum button width */
        height: 'auto', /* Automatic height */
        minHeight: '51.58px', /* Minimum height */
    },
    modal: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
    },
    overlay: {
        background: '#fff',
    },
    modalContent: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        lineHeight: 1.4,
        background: '#f1f1f1',
        padding: '14px 28px',
        borderRadius: '8px',
        maxWidth: '600px',
        minWidth: '300px',
    },
    closeModal: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '5px 7px',
    },
};

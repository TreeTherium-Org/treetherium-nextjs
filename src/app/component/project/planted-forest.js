import { useEffect, useState } from 'react';
import Image from 'next/image';
import Section from "../layouts/Section";
import { useRouter } from 'next/router';

const MyPlantedForest = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [showWalletPopup, setShowWalletPopup] = useState(false);
    const router = useRouter();

    // Check if the wallet is already connected on component mount
    useEffect(() => {
        const checkWalletConnection = () => {
            const connected = localStorage.getItem('walletConnected'); // Replace with actual connection check
            if (connected) {
                setIsWalletConnected(true);
            }
        };

        checkWalletConnection();
    }, []);

    const handleButtonClick = (route) => {
        if (!isWalletConnected) {
            setShowWalletPopup(true);
        } else {
            router.push(route); // Redirect to the specified route
        }
    };

    const connectWallet = () => {
        setIsWalletConnected(true);
        setShowWalletPopup(false);
        localStorage.setItem('walletConnected', 'true'); // Update the wallet connection state
    };

    const disconnectWallet = () => {
        setIsWalletConnected(false);
        localStorage.removeItem('walletConnected'); // Clear the wallet connection state
    };

    return (
        <Section allNotification={false} searchPopup={true} title={'My Planted Forest'}>
            <div style={containerStyle}>
                <header style={headerStyle}>
                    <h1>My Planted Forest</h1>
                </header>
                <main style={mainStyle}>
                    <div style={dataGridStyle}>
                        <div style={dataCardStyle}>No. of Projects</div>
                        <div style={dataCardStyle}>Carbon Sequestration Data</div>
                        <div style={dataCardStyle}>Oxygen Produced Data</div>
                        <div style={dataCardStyle}>List of Trees - Type of Trees</div>
                    </div>
                    <div style={buttonGridStyle}>
                        <div style={buttonCardStyle} onClick={() => handleButtonClick('/list-trees')}>
                            <Image
                                src="/assets/img/lsp/single-tree.jpg"
                                alt="Single Tree"
                                width={100}
                                height={100}
                                style={{ borderRadius: '20%' }}
                            />
                            <p>Plant a Tree</p>
                        </div>
                        <div style={buttonCardStyle} onClick={() => handleButtonClick('/start-project')}>
                            <Image
                                src="/assets/img/lsp/many-trees.jpg"
                                alt="Tree Planting Project"
                                width={100}
                                height={100}
                                style={{ borderRadius: '20%' }}
                            />
                            <p>Start a Project</p>
                        </div>
                    </div>
                </main>

                {/* Wallet Connection Popup */}
                {showWalletPopup && (
                    <div style={popupOverlayStyle}>
                        <div style={popupStyle}>
                            <p>Please connect your wallet to continue.</p>
                            <button style={buttonStyle} onClick={connectWallet}>Connect Wallet</button>
                            <button style={buttonStyle} onClick={() => setShowWalletPopup(false)}>Close</button>
                        </div>
                    </div>
                )}

                {/* Disconnect Wallet Button */}
                <div style={buttonContainerStyle}>
                    {isWalletConnected && (
                        <button style={disconnectButtonStyle} onClick={disconnectWallet}>
                            Disconnect Wallet
                        </button>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default MyPlantedForest;

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '20px',
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const mainStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '30px',
};

const dataGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px',
};

const dataCardStyle = {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
};

const buttonGridStyle = {
    display: 'flex',
    justifyContent: 'space-around',
};

const buttonCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
};

const circleStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: '#e0e0e0',
    borderRadius: '20%',
    marginBottom: '10px',
};

const popupOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const popupStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
};

const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#A3A830',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
};

const disconnectButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#dc3545', // Red color for disconnect
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

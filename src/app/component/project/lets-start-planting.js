import { useEffect, useState } from 'react';
import Image from 'next/image';
import Section from "../layouts/Section";
import { useRouter } from 'next/router';
import LetsStartPlantingPage from '../../../pages/lets-start-planting';

const LetsStartPlanting = () => {
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
    <Section allNotification={false} searchPopup={true} title={'Lets Start Planting'}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h3>Let's Start Planting</h3>
        </header>
        {/* Main Section */}
        <main style={mainStyle}>
          <div style={gridStyle}>
            <div onClick={() => handleButtonClick('list-trees')} style={cardStyle}>
              <div style={circleStyle}>
                <Image
                  src="/assets/img/lsp/single-tree.jpeg"
                  alt="Single Tree"
                  width={150}
                  height={150}
                  style={{ borderRadius: '20%' }}
                />
              </div>
              <p>Single Tree</p>
            </div>

            <div onClick={() => handleButtonClick('/list-projects')} style={cardStyle}>
              <div style={circleStyle}>
                <Image
                  src="/assets/img/lsp/many-trees.jpeg"
                  alt="Tree Planting Project"
                  width={150}
                  height={150}
                  style={{ borderRadius: '20%' }}
                />
              </div>
              <p>Tree Planting Project</p>
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

export default LetsStartPlanting;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
};

const headerStyle = {
  textAlign: 'center',
  marginTop: '50px',
  color: '#4F3738'
};


const mainStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const gridStyle = {
  display: 'flex',
  flexDirection: 'column', // Align items vertically
  gap: '20px', // Space between each button
  alignItems: 'center', // Center align the buttons horizontally
};


const circleStyle = {
  width: '250px', // Increase the size of the button area
  height: '150px', // Increase the size of the button area
  backgroundColor: '#fff',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10px',
  color: '#4F3738',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '1.2em', // Adjust text size to be larger
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
  marginBottom: '20px',
};

const disconnectButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#dc3545', // Red color for disconnect
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../layouts/Section";
import { useRouter } from "next/router";

const LetsStartPlanting = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = () => {
      const connected = localStorage.getItem("walletConnected"); // Replace with actual connection check
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
    localStorage.setItem("walletConnected", "true"); // Update the wallet connection state
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    localStorage.removeItem("walletConnected"); // Clear the wallet connection state
  };

  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Lets Start Planting"}
    >
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h3 className="form-title">&quot;Let&apos;s Start Planting&quot;</h3>
          <div style={buttonGroupStyle}>
            <div
              onClick={() => handleButtonClick("list-trees")}
              style={cardStyle}
            >
              <Image
                src="/assets/img/lsp/single-tree.jpeg"
                alt="Single Tree"
                width={150}
                height={150}
                style={{
                  borderRadius: "20%",
                  marginBottom: "10px",
                  boxShadow: imageShadowStyle,
                }}
              />
              <p>Single Tree</p>
            </div>

            <div
              onClick={() => handleButtonClick("/list-projects")}
              style={cardStyle}
            >
              <Image
                src="/assets/img/lsp/many-trees.jpeg"
                alt="Tree Planting Project"
                width={150}
                height={150}
                style={{
                  borderRadius: "20%",
                  marginBottom: "10px",
                  boxShadow: imageShadowStyle,
                }}
              />

              <p>Tree Planting Project</p>
            </div>
          </div>
        </header>

        {/* Wallet Connection Popup */}
        {showWalletPopup && (
          <div style={popupOverlayStyle}>
            <div style={popupStyle}>
              <p>Please connect your wallet to continue.</p>
              <button style={buttonStyle} onClick={connectWallet}>
                Connect Wallet
              </button>
              <button
                style={buttonStyle}
                onClick={() => setShowWalletPopup(false)}
              >
                Close
              </button>
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "100vh",
};

const headerStyle = {
  textAlign: "center",
  marginTop: "20px",
  color: "#4F3738",
};

const buttonGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginTop: "10px",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
};

/*
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  border: '1px solid #c1b3a8',
  backgroundColor: '#f7f4f1',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  height: '270px',
  justifyContent: 'center',
  gap: '10px'
};
*/



const imageShadowStyle = "0px 4px 10px rgba(0, 0, 0, 0.2)";

const popupOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  backgroundColor: "#A3A830",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const disconnectButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

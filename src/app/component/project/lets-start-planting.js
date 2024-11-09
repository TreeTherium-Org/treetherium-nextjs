"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../layouts/Section";
import { useRouter } from "next/navigation";
import useQuery from "@/app/libs/useQuery";

const LetsStartPlanting = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showRedirectPopup, setShowRedirectPopup] = useState(false);
  const router = useRouter();
  const { data: user } = useQuery("/api/me"); // Get session data

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (user?.walletAddress) {
        setIsWalletConnected(true);
      } else {
        setIsWalletConnected(false);
      }
    };

    checkWalletConnection();
  }, [user]);

  const handleButtonClick = async (route) => {
    if (isWalletConnected) {
      router.push(route); // Redirect if wallet is connected
    } else {
      setShowRedirectPopup(true); // Show the redirect popup if wallet not connected
      setTimeout(() => {
        router.push("/accountprofile"); // Redirect to Account Profile after 3 seconds
      }, 3000);
    }
  };

  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Lets Start Planting"}
    >
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h3 className="form-title">
            &quot;what are you planting today?&quot;
          </h3>
          <div style={buttonGroupStyle}>
            <div
              onClick={() => handleButtonClick("list-trees")}
              style={cardStyle}
            >
              <Image
                src="/assets/img/lsp/single-tree.jpeg"
                alt="Single Tree"
                width={168}
                height={168}
                style={{
                  borderRadius: "20%",
                  marginBottom: "10px",
                  boxShadow: imageShadowStyle,
                }}
              />
              <p style={labelStyle}>Single Tree</p>
            </div>

            <div
              onClick={() => handleButtonClick("/my-projects")}
              style={cardStyle}
            >
              <Image
                src="/assets/img/lsp/many-trees.jpeg"
                alt="Tree Planting Project"
                width={168}
                height={168}
                style={{
                  borderRadius: "20%",
                  marginBottom: "10px",
                  boxShadow: imageShadowStyle,
                }}
              />

              <p style={labelStyle}>Tree Planting Project</p>
            </div>
          </div>
        </header>

        {/* Redirect Popup */}
        {showRedirectPopup && (
          <div style={popupOverlayStyle}>
            <div style={popupStyle}>
              <p>
                You are not connected to your wallet yet. Redirecting to Account
                Profile page...
              </p>
            </div>
          </div>
        )}
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
  gap: "80px",
  marginTop: "25px",
  alignItems: "center",
  fontWeight: "400",
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

const labelStyle = {
  fontSize: "18px",
};

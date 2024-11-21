"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../layouts/Section";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firebase import
import useQuery from "@/app/libs/useQuery";
import { Toaster, toast } from "react-hot-toast";
// import { useSession } from "next-auth/react"; // Assuming you're using next-auth

const MyPlantedForest = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showRedirectPopup, setShowRedirectPopup] = useState(false);
  const router = useRouter();
  const { data: userData } = useQuery("/api/me");
  // const db = getFirestore();

  // useEffect(() => {
  //   const checkWalletConnection = async () => {
  //     if (session?.user?.id) {
  //       const userRef = doc(db, "users", session.user.id);
  //       const userDoc = await getDoc(userRef);

  //       if (userDoc.exists() && userDoc.data().walletAddress) {
  //         setIsWalletConnected(true);
  //       } else {
  //         setIsWalletConnected(false);
  //       }
  //     }
  //   };

  //   checkWalletConnection();
  // }, [db, session]);

  const handleButtonClick = async (route) => {
    if (isWalletConnected) {
      router.push(route); // Redirect if wallet is connected
    } else {
      // Show toast notification and redirect after 2 seconds
      toast.error(
        "Please connect wallet first at your account setting before proceeding.."
      );
      setTimeout(() => {
        router.push("/usersetting");
      }, 2000);
    }
  };

  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"My Planted Forest"}
    >
      {/* Toaster for notifications */}
      <Toaster position="top-center" />
      
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h3 className="form-title">My Data Overview</h3>
        </header>
        <main style={mainStyle}>
          <div style={dataGridStyle}>
            <div style={dataCardStyle}>
              <strong>My Projects</strong>{" "}
              <span>
                <strong>0.0</strong>
              </span>
            </div>
            <div style={dataCardStyle}>
              <strong>My Trees</strong>{" "}
              <span>
                <strong>0.0</strong>
              </span>
            </div>
            <div style={dataCardStyle}>
              <strong>Carbon Sequestration</strong>{" "}
              <span>
                <strong>0.0 Tons</strong>
              </span>
            </div>
            <div style={dataCardStyle}>
              <strong>Oxygen Produced</strong>{" "}
              <span>
                <strong>0.0 Liters</strong>
              </span>
            </div>
          </div>
          <div style={buttonGridStyle}>
            <div
              style={buttonCardStyle}
              onClick={() => handleButtonClick("/list-trees")}
            >
              <Image
                src="/assets/img/lsp/single-tree.jpeg"
                alt="Single Tree"
                width={109}
                height={109}
                style={{ borderRadius: "20%", marginTop: "20px" }}
              />
              <p style={labelStyle}>Plant A Tree</p>
            </div>
            <div
              style={buttonCardStyle}
              onClick={() => handleButtonClick("/my-projects")}
            >
              <Image
                src="/assets/img/lsp/many-trees.jpeg"
                alt="Tree Planting Project"
                width={109}
                height={109}
                style={{ borderRadius: "20%", marginTop: "20px" }}
              />
              <p style={labelStyle}>Start A Project</p>
            </div>
          </div>
        </main>

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

export default MyPlantedForest;

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "75vh",
  padding: "20px",
};

const headerStyle = {
  textAlign: "center",

  marginTop: "15px",
  color: "#4F3738",
};

const mainStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "20px",
};

const dataGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const dataCardStyle = {
  backgroundColor: "#f7f4f1", // Light brown color
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  border: "2px solid  #c1b3a8",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
  height: "120px", // Fixed height to ensure uniformity
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const buttonGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr", // Two columns to match the layout of the data cards
  gap: "20px", // Adjusts spacing between the buttons
};

const buttonCardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  border: "2px solid #c1b3a8",
  backgroundColor: "#f7f4f1",
  borderRadius: "10px",
  padding: "15px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow for consistency
  height: "172px", // Adjust as needed for visual consistency with the data cards
  justifyContent: "center",
  fontWeight: "bold",
  gap: "10px", // Space between the image and text
};

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
  marginTop: "20px",
};

const disconnectButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#dc3545", // Red color for disconnect
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const labelStyle = {
  fontSize: "15px",
};

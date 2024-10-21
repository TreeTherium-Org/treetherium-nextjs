import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import Section from '../component/layouts/Section';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore methods

const UserSetting = () => {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    walletAddress: "",
  });

  const db = getFirestore(); // Initialize Firestore
  const router = useRouter(); // Initialize the router for navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", userId); // Replace USER_ID with the actual user ID
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setFormData(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", userId); // Replace USER_ID with the actual user ID
      await updateDoc(userDocRef, formData); // Update user data in Firestore
      console.log("User data updated:", formData);
      router.push("/accountprofile");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    // Redirect to AccountProfile page
    router.push("/accountprofile"); // Adjust the route as necessary
  };

  const handleWalletConnect = async () => {
    if ("solana" in window) {
      const provider = window.solana;
      try {
        const response = await provider.connect();
        const newWalletAddress = response.publicKey.toString();
        console.log("Connected to Phantom Wallet:", newWalletAddress);

        // Check if the user document exists
        const userDocRef = doc(db, "users", userId); // Replace USER_ID with the actual user ID
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // If the wallet address field is empty, insert the new wallet address
          if (!userData.walletAddress) {
            await updateDoc(userDocRef, { walletAddress: newWalletAddress });
            console.log("New wallet address inserted in Firestore:", newWalletAddress);
            setFormData((prev) => ({ ...prev, walletAddress: newWalletAddress })); // Update local state
          } else {
            console.log("Wallet address already exists in Firestore:", userData.walletAddress);
          }
        } else {
          // Create a new document if it does not exist
          await setDoc(userDocRef, { walletAddress: newWalletAddress, username: formData.username, email: formData.email });
          console.log("New user document created with wallet address:", newWalletAddress);
          setFormData({ ...formData, walletAddress: newWalletAddress }); // Update local state
        }
      } catch (error) {
        console.error("Failed to connect to Phantom Wallet:", error);
      }
    } else {
      console.log("Phantom Wallet not found");
    }
  };

  return (
    <Section allNotification={false} searchPopup={true} title="Edit Profile">
      <div className="settings-area">
        <div className="container">
          <div className="settings-card">
            <div className="profile-image-container">
              <img
                src={`/assets/img/user.png`} // Replace with user profile picture URL
                alt="Profile"
                className="profile-image"
              />
              <div className="edit-icon">
                <i className="fa fa-pencil"></i>
              </div>
            </div>

            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="walletAddress">Wallet Address</label>
                <input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  value={formData.walletAddress || "No wallet address provided."}
                  readOnly
                  onClick={handleWalletConnect} // Connect to wallet on click
                  style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
                />
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn-save" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .settings-area {
          padding: 40px 0;
        }

        .settings-card {
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 20px;
          max-width: 400px;
          margin: auto;
          text-align: left;
        }

        .profile-image-container {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .profile-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid #4F3738;
        }

        .edit-icon {
          position: absolute;
          bottom: 0;
          right: calc(42% - 15px);
          background-color: #4F3738;
          color: #fff;
          border-radius: 50%;
          padding: 7px;
          cursor: pointer;
          border: 2px solid #fff; /* Adds a white border around the pencil icon */
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
          color: #4F3738;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #eaeaea;
          background-color: #f9f9f9;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .btn-cancel, .btn-save {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          border: none;
          margin: 0 5px;
        }

        .btn-cancel {
          background-color: #eaeaea;
          color: #4F3738;
        }

        .btn-save {
          background-color: #4F3738;
          color: #fff;
        }
      `}</style>
    </Section>
  );
};

export default UserSetting;

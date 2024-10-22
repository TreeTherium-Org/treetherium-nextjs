import { useEffect, useState } from "react";
import Section from '../component/layouts/Section';
import Link from "next/link";
import { auth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

const AccountProfile = () => {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  console.log(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const docRef = doc(db, "users", userId);
          console.log("Fetching document with ID:", userId); // Log the document ID
          const docSnap = await getDoc(docRef);
          console.log("Document snapshot:", docSnap); // Log the document snapshot
    
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!"); // This will log if the document does not exist
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    
    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Section allNotification={false} searchPopup={true} title="Account Profile">
      <div className="profile-area">
        <div className="container">
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={userData.profilePictureUrl || `/assets/img/user.png`}
                alt="Profile"
                className="profile-image"
              />
              <h5 className="profile-name">{userData.username}</h5>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <label>Your Email</label>
                <div className="input-box">
                  <span>{userData.email}</span>
                </div>
              </div>
              <div className="detail-item">
                <label>Wallet Address</label>
                <div className="input-box">
                  <span>{userData.walletAddress || "No wallet address provided."}</span>
                </div>
              </div>
              <div className="detail-item">
                <label>Joined Date</label>
                <div className="input-box">
                  <span>{userData.joinedDate || "Unknown"}</span>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <Link href="/user-setting" className="btn btn-purple">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-area {
          padding: 40px 0;
        }

        .profile-card {
          background-color: #fff; /* White background for the card */
          border-radius: 16px; /* Rounded corners */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
          text-align: left; /* Left-align content */
          padding: 20px; /* Inner padding */
          max-width: 400px; /* Max width for the card */
          margin: auto; /* Center the card */
        }

        .profile-header {
          text-align: center; /* Centered header */
        }

        .profile-image {
          width: 80px; /* Set image size */
          height: 80px; /* Set image size */
          border-radius: 50%; /* Circular image */
          border: 4px solid #4F3738; /* Border color */
          background-color: #f0f0f0; /* Placeholder background */
        }

        .profile-name {
          margin: 10px 0 5px; /* Margin for spacing */
          font-size: 1.5em; /* Name font size */
          color: #4F3738; /* Text color */
        }

        .profile-role {
          color: #888; /* Role text color */
          font-weight: 300; /* Lighter font weight */
        }

        .profile-details {
          margin-top: 20px; /* Space above details */
        }

        .detail-item {
          margin-bottom: 20px; /* Space between items */
        }

        .detail-item label {
          display: block; /* Make the label a block element */
          font-weight: bold; /* Bold text for the label */
          color: #4F3738; /* Label text color */
          margin-bottom: 5px; /* Space below the label */
        }

        .input-box {
          border: 1px solid #eaeaea; /* Border around input box */
          border-radius: 8px; /* Rounded corners for input box */
          padding: 15px; /* Padding for input box */
          background-color: #f9f9f9; /* Background color for input box */
        }

        .profile-actions {
          margin-top: 20px; /* Space above actions */
          text-align: center; /* Center align actions */
        }

        .btn-primary {
          background-color: #4F3738; /* Button background color */
          color: white; /* Button text color */
          padding: 10px 20px; /* Button padding */
          border-radius: 5px; /* Rounded button */
          text-decoration: none; /* No underline */
          transition: background-color 0.3s; /* Smooth transition */
        }

        .btn-primary:hover {
          background-color: #3e2c2d; /* Darker shade on hover */
        }
      `}</style>
    </Section>
  );
};

export default AccountProfile;

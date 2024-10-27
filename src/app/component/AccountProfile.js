import { useEffect, useState } from "react";
import Section from "../component/layouts/Section";
import Link from "next/link";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut
import { useRouter } from "next/router";

const AccountProfile = () => {
  const [userData, setUserData] = useState(null);
  const { data: session, status } = useSession(); // Destructure session data
  const router = useRouter();
  const userId = session?.user?.id; // Retrieve user ID from the session object

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

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

  const handleLogout = async () => {
    try {
        await signOut({ callbackUrl: "/signin" });
    } catch (error) {
        console.error("Error logging out:", error);
    }
};


  return (
    <Section allNotification={false} searchPopup={true} title="Account Profile">
      <div className="profile-area">
        <div className="container">
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={userData.profileImageUrl || `/assets/img/user.png`}
                alt="Profile"
                className="profile-image"
              />
              <h5 className="profile-name">{userData.username}</h5>
              <p>&quot;{userData.motto || "Your Life's Motto"}&quot;</p>
              <p>{userData.country || "Country"}</p>
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
                  <span>
                    {userData.walletAddress || "No wallet address provided."}
                  </span>
                </div>
              </div>
              <div className="detail-item">
                <label>Registration Date</label>
                <div className="input-box">
                  <span>
                    {" "}
                    {userData.createdAt
                      ? new Date(
                          userData.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-edit">
                <Link
                  href="/usersetting"
                  style={{ color: "#fff" }} // Inline style for top padding
                >
                  Edit Profile
                </Link>
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                Log Out
              </button>
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
          width: 100px; /* Set image size */
          height: 100px; /* Set image size */
          border-radius: 50%; /* Circular image */
          border: 4px solid #4f3738; /* Border color */
          background-color: #f0f0f0; /* Placeholder background */
        }

        .profile-name {
          margin: 10px 0 5px; /* Margin for spacing */
          font-size: 1.5em; /* Name font size */
          color: #4f3738; /* Text color */
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
          color: #4f3738; /* Label text color */
          margin-bottom: 5px; /* Space below the label */
        }

        .input-box {
          border: 1px solid #eaeaea; /* Border around input box */
          border-radius: 8px; /* Rounded corners for input box */
          padding: 15px; /* Padding for input box */
          background-color: #f9f9f9; /* Background color for input box */
          overflow: hidden; /* Hide overflow */
          word-wrap: break-word; /* Ensure long words break */
          max-height: 100px; /* Optional: Limit height */
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .btn-edit,
        .btn-logout {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          border: none;
          margin: 0 5px;
        }

        .btn-edit {
          background-color: #778b28;
          color: #fff;
        }

        .btn-logout {
          background-color: #4f3738;
          color: #fff;
        }
      `}</style>
    </Section>
  );
};

export default AccountProfile;

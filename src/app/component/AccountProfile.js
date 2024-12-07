"use client";
import Section from "../component/layouts/Section";
import Link from "next/link";
import { signOut } from "next-auth/react"; // Import useSession and signOut
import useQuery from "../libs/useQuery";
import { Toaster, toast } from "react-hot-toast";

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className="full-screen-loader">
    <div className="loading"></div>
  </div>
);

const AccountProfile = () => {
  const { data: userData } = useQuery("/api/me"); // Destructure session data

  if (!userData) {
    return <FullScreenLoader />;
  }

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      await signOut({ callbackUrl: "/signin" });
      toast.success("Logged out successfully!", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to log out. Please try again.", { id: loadingToast });
      console.error("Error logging out:", error);
    }
  };

  return (
    <Section allNotification={false} searchPopup={true} title="Account Profile">
      <Toaster position="top-center" />
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
                <label>Your Wallet Address</label>
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
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
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
          padding: 55px 0;
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
          font-weight: 500;
          cursor: pointer;
          border: none;
          margin: 0 5px;
          font-size: 20px;
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

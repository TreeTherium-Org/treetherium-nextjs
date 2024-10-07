import { useEffect, useState } from "react"; // Import useEffect and useState
import Section from '../component/layouts/Section.js';
import Link from "next/link"; // Using Next.js Link component
import { auth, db } from '../../firebase'; // Firebase initialized instance
import { doc, getDoc } from "firebase/firestore"; // Import getDoc for fetching documents

const UserSetting = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState(""); // Store the profile picture URL from Firebase
  
    const userId = auth.currentUser?.uid; // Get the current user ID
    const username = auth.currentUser?.displayName || "User"; // For demonstration
  
    useEffect(() => {
      // Fetch the current profile picture URL from Firestore
      const fetchProfilePictureUrl = async () => {
        if (userId) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setProfilePictureUrl(data.profilePictureUrl || ""); // Use the stored URL or default
          }
        }
      };
  
      fetchProfilePictureUrl();
    }, [userId]);
  
    const handleProfilePictureChange = (e) => {
      setProfilePicture(e.target.files[0]);
    };
  
    const handleUpload = async () => {
      setUploading(true);
  
      try {
        if (profilePicture) {
          const profileRef = ref(storage, `users/${userId}/profilePicture.jpg`);
          await uploadBytes(profileRef, profilePicture);
          const profileUrl = await getDownloadURL(profileRef);
  
          // Update the profile picture URL in Firestore
          await updateDoc(doc(db, "users", userId), {
            profilePictureUrl: profileUrl,
          });
  
          setProfilePictureUrl(profileUrl); // Update the state with the new URL
          console.log("Profile picture updated successfully");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <Section allNotification={false} searchPopup={true} title="Profile Settings">
        <div className="balance-area pd-top-40">
          <div className="container">
            <div className="section-title">
              <h3 className="title">Update Your Information</h3>
            </div>
            <div className="icon mb-4">
              <img
                src={profilePictureUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/user.png`} // Use Firebase URL or default
                alt="Profile"
                className="w-80 h-80 mx-auto rounded-full border-4 border-green-500" // Bigger size, adjust as necessary
              />
            </div>
            <h5 className="title mb-0">{username}</h5> {/* Display Username */}
          </div>
        </div>
  
        <div className="transaction-details pd-top-36 mg-bottom-35">
          <div className="container">
            <div className="section-title">
              <h3 className="title">Profile Settings</h3>
            </div>
  
            <ul className="transaction-details-inner">
              {/* Profile Picture Upload */}
              <li>
                <span className="float-left">Change Profile Picture</span>
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              </li>
  
              {/* Other Settings (Username, Email, etc.) */}
              <li>
                <Link href="/change-username">
                  <span className="float-left">Change Username</span>
                  <span className="float-right">
                    <i className="la la-angle-right" />
                  </span>
                </Link>
              </li>
  
              <li>
                <Link href="/update-email">
                  <span className="float-left">Email Update</span>
                  <span className="float-right">
                    <i className="la la-angle-right" />
                  </span>
                </Link>
              </li>
  
              <li>
                <Link href="/edit-address">
                  <span className="float-left">Edit Address</span>
                  <span className="float-right">
                    <i className="la la-angle-right" />
                  </span>
                </Link>
              </li>
  
              <li>
                <Link href="/manage-wallets">
                  <span className="float-left">Manage Wallet</span>
                  <span className="float-right">
                    <i className="fa fa-plus" />
                  </span>
                </Link>
              </li>
  
              <li>
                <Link href="/change-password">
                  <span className="float-left">Change Password</span>
                  <span className="float-right">
                    <i className="la la-angle-right" />
                  </span>
                </Link>
              </li>
  
              <li>
                <Link href="/delete-account">
                  <span className="float-left">Delete Account</span>
                  <span className="float-right">
                    <i className="la la-angle-right" />
                  </span>
                </Link>
              </li>
            </ul>
  
            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </Section>
    );
  };
  
  export default UserSetting;
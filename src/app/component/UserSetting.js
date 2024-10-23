import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Section from '../component/layouts/Section';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getNames } from 'country-list';

const UserSetting = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const fileInputRef = useRef(null);
  const DEFAULT_PROFILE_IMAGE = "/assets/img/user.png"; // Define default image path as constant

  const [formData, setFormData] = useState({
    username: "",
    motto: '',
    email: "",
    walletAddress: "",
    country: "",
    profileImageUrl: DEFAULT_PROFILE_IMAGE,
  });

  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [countries, setCountries] = useState([]);

  const db = getFirestore();
  const storage = getStorage();
  const router = useRouter();

  useEffect(() => {
    setCountries(getNames());

    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData({
            ...userData,
            profileImageUrl: userData.profileImageUrl || DEFAULT_PROFILE_IMAGE
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFormData(prev => ({
          ...prev,
          profileImageUrl: DEFAULT_PROFILE_IMAGE
        }));
      }
    };

    fetchUserData();
  }, [db, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageError = () => {
    setImageError(true);
    setFormData(prev => ({
      ...prev,
      profileImageUrl: DEFAULT_PROFILE_IMAGE
    }));
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      throw new Error('Please upload an image file (JPEG, PNG, GIF, or WEBP)');
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }
  };

  // Inside your handleImageUpload function:
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Reset previous errors
      setUploadError("");
      setImageError(false);

      // Validate file
      validateFile(file);

      // Start upload
      setIsUploading(true);

      if (!userId) {
        throw new Error('User ID not available');
      }

      // Delete the old image if it exists and is not the default one
      if (formData.profileImageUrl && formData.profileImageUrl !== DEFAULT_PROFILE_IMAGE) {
        const oldImageRef = ref(storage, formData.profileImageUrl);
        await deleteObject(oldImageRef);
        console.log('Old profile image deleted successfully');
      }

      // Create a reference to the storage location for the new image
      const storageRef = ref(storage, `profile-images/${userId}_${Date.now()}`);

      // Log upload attempt
      console.log('Attempting to upload file:', {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      // Upload the file
      const uploadResult = await uploadBytes(storageRef, file);
      console.log('Upload successful:', uploadResult);

      // Get the download URL of the new image
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('Download URL obtained:', downloadUrl);

      // Update form data with new image URL
      setFormData((prev) => ({
        ...prev,
        profileImageUrl: downloadUrl,
      }));

      // Update the user document in Firestore with the new profile image URL
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        profileImageUrl: downloadUrl,
      });

      console.log('Profile image updated successfully');
    } catch (error) {
      console.error('Error during image upload:', error);
      setUploadError(error.message || 'Failed to upload image. Please try again.');
      setFormData((prev) => ({
        ...prev,
        profileImageUrl: prev.profileImageUrl || DEFAULT_PROFILE_IMAGE,
      }));
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, formData);
      router.push("/accountprofile");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/accountprofile");
  };

  const handleWalletConnect = async () => {
    if ("solana" in window) {
      const provider = window.solana;
      try {
        const response = await provider.connect();
        const newWalletAddress = response.publicKey.toString();
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && !userDoc.data().walletAddress) {
          await updateDoc(userDocRef, { walletAddress: newWalletAddress });
          setFormData({ ...formData, walletAddress: newWalletAddress });
        }
      } catch (error) {
        console.error("Failed to connect to Phantom Wallet:", error);
      }
    } else {
      alert("Phantom Wallet not found. Please install it first.");
    }
  };

  return (
    <Section allNotification={false} searchPopup={true} title="Edit Profile">
      <div className="settings-area">
        <div className="container">
          <div className="settings-card">
            <div className="profile-image-container">
              <div className="image-wrapper">
                <img
                  src={imageError ? DEFAULT_PROFILE_IMAGE : formData.profileImageUrl}
                  alt="Profile"
                  className="profile-image"
                  onError={handleImageError}
                />
                <button
                  className="edit-icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  title="Upload profile picture"
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleImageUpload}
                  className="hidden-file-input"
                />
                {isUploading && (
                  <div className="upload-overlay">
                    <span>Uploading...</span>
                  </div>
                )}
              </div>
              {uploadError && (
                <div className="error-message">
                  {uploadError}
                </div>
              )}
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
                <label htmlFor="motto">Motto</label>
                <input
                  type="text"
                  id="motto"
                  name="motto"
                  value={formData.motto}
                  onChange={handleChange}
                  placeholder="Enter your life's motto"
                  className="form-control"
                />
              </div>
              <div className="form-group select-container">
                <label htmlFor="country">Country</label>
                <div className="select-wrapper">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
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
                  onClick={handleWalletConnect}
                  style={{ cursor: 'pointer' }}
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

        .image-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .profile-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid #4F3738;
          object-fit: cover;
        }

        .edit-icon {
          position: absolute;
          bottom: 0;
          right: -5px;
          background-color: #4F3738;
          color: #fff;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid #fff;
          padding: 0;
          transition: background-color 0.2s;
        }

        .edit-icon:hover {
          background-color: #3a2a2b;
        }

        .edit-icon:disabled {
          background-color: #999;
          cursor: not-allowed;
        }

       .error-message {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          text-align: center;
        }

        .upload-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
        }

        .hidden-file-input {
          display: none;
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

        .form-group input,
        .select-wrapper select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #eaeaea;
          background-color: #f9f9f9;
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper select {
          appearance: none;
          padding-right: 30px;
          cursor: pointer;
        }

        .select-wrapper::after {
          content: '▼';
          font-size: 12px;
          color: #4F3738;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
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
          transition: opacity 0.2s;
        }

        .btn-cancel {
          background-color: #eaeaea;
          color: #4F3738;
        }

        .btn-save {
          background-color: #4F3738;
          color: #fff;
        }

        .btn-cancel:hover, .btn-save:hover {
          opacity: 0.9;
        }
       .select-container {
          position: relative;
          z-index: 1;
        }

        .select-wrapper {
          position: relative;
          width: 100%;
        }

        .select-wrapper select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #eaeaea;
          background-color: #f9f9f9;
          appearance: none;
          padding-right: 30px;
          cursor: pointer;
          color: #4F3738;
        }

        .select-wrapper::after {
          content: '▼';
          font-size: 12px;
          color: #4F3738;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        /* New styles for dropdown positioning */
        .select-wrapper select:focus {
          outline: none;
          border-color: #4F3738;
        }

        .select-wrapper select option {
          background: white;
          color: #4F3738;
          padding: 10px;
        }

        /* Force dropdown to appear below */
        @supports (-webkit-appearance: none) or (-moz-appearance: none) {
          .select-container {
            overflow: visible;
          }

          .select-wrapper select {
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          .select-wrapper select::-ms-expand {
            display: none;
          }
        }

        /* Ensure dropdown options appear above other elements */
        .select-wrapper select:focus + .select-wrapper::after {
          transform: translateY(-50%) rotate(180deg);
        }

        .form-group + .form-group {
          margin-top: 20px;
          position: relative;
          z-index: 0;
        }

        /* Style the dropdown options */
        .select-wrapper select option {
          padding: 10px;
          min-height: 1.2em;
          background: white;
        }

        /* Ensure other form elements don't overlap */
        .form-group:not(.select-container) {
          position: relative;
          z-index: 0;
        }
      `}</style>
    </Section>
  );
};

export default UserSetting;
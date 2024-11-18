"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Section from "../component/layouts/Section";
import { getNames } from "country-list";
import useQuery from "../libs/useQuery";
import useMutation from "../libs/useMutation";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

const UserSetting = () => {
  const { data: userData } = useQuery("/api/me");
  const fileInputRef = useRef(null);
  const DEFAULT_PROFILE_IMAGE = "/assets/img/user.png"; // Define default image path as constant

  const [formData, setFormData] = useState({
    username: "",
    motto: "",
    email: "",
    walletAddress: "",
    country: "",
    profileImageUrl: DEFAULT_PROFILE_IMAGE,
  });

  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [countries, setCountries] = useState([]);
  const [showConnectWalletPopup, setShowConnectWalletPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // const db = getFirestore();
  // const storage = getStorage();
  const router = useRouter();

  useEffect(() => {
    setCountries(getNames());

    setFormData({
      ...userData,
      username: userData?.username || "",
      motto: userData?.motto || "",
      email: userData?.email || "",
      walletAddress: userData?.walletAddress || "",
      country: userData?.country || "",
      profileImageUrl: userData?.profileImageUrl || DEFAULT_PROFILE_IMAGE,
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleImageError = () => {
    setImageError(true);
    setFormData((prev) => ({
      ...prev,
      profileImageUrl: DEFAULT_PROFILE_IMAGE,
    }));
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      throw new Error("Please upload an image file (JPEG, PNG, GIF, or WEBP)");
    }

    if (file.size > maxSize) {
      throw new Error("File size must be less than 5MB");
    }
  };

  // Inside your handleImageUpload function:

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const loadingToast = toast.loading("Uploading image...");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/profile/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Upload failed");
      }

      const { downloadUrl } = await response.json();

      setFormData((prev) => ({ ...prev, profileImageUrl: downloadUrl }));
      toast.success("Image uploaded successfully!", { id: loadingToast });
    } catch (error) {
      toast.error(error.message || "Failed to upload image.", {
        id: loadingToast,
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const [{ loading }, updateProfile] = useMutation({
    url: `/api/profile/`,
  });

  const handleSave = async () => {
    const loadingToast = toast.loading("Saving profile...");
    try {
      await updateProfile({ ...formData });
      toast.success("Profile updated successfully!", { id: loadingToast });
      router.push("/accountprofile");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.", {
        id: loadingToast,
      });
    }
  };

  const handleWalletConnect = async () => {
    // TODO: Add feature to verify wallet signature at the backend
    // TODO: handle case if wallet is used by another account.
    if ("solana" in window) {
      const provider = window.solana;
      try {
        const response = await provider.connect();
        const newWalletAddress = response.publicKey.toString();

        const currentWalletAddress = userData.walletAddress;
        if (currentWalletAddress && currentWalletAddress !== newWalletAddress) {
          toast.error(
            "Wallet address mismatch. Please connect the correct wallet."
          );
          return;
        }

        await updateProfile({ ...formData, walletAddress: newWalletAddress });
        setFormData({ ...formData, walletAddress: newWalletAddress });

        toast.success("Wallet address updated successfully!");
      } catch (error) {
        toast.error("Failed to connect to Phantom Wallet. Please try again.");
      }
    } else {
      toast.error("Phantom Wallet not found. Please install it first.");
    }
  };

  const handleConfirmConnectNewWallet = async () => {
    const provider = window.solana;
    const response = await provider.connect();
    const newWalletAddress = response.publicKey.toString();

    await updateProfile({ ...formData, walletAddress: newWalletAddress });
    setFormData({ ...formData, walletAddress: newWalletAddress });
    // Hide popup and show success message
    setShowConnectWalletPopup(false);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  return (
    <Section allNotification={false} searchPopup={true} title="Edit Profile">
      <Toaster position="top-center" /> 
      <div className="settings-area">
        <div className="container">
          <div className="settings-card">
            <div className="profile-image-container">
              <div className="image-wrapper">
                <Image
                  src={
                    imageError
                      ? DEFAULT_PROFILE_IMAGE
                      : formData.profileImageUrl
                  }
                  alt="Profile"
                  className="profile-image"
                  onError={handleImageError}
                  sizes="(max-width: 300px) 100vw, (max-width: 300px) 50vw, 33vw"
                  fill
                  unoptimized
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
                <div className="error-message">{uploadError}</div>
              )}
            </div>

            <div className="form">
              <div className="form-group">
                <label htmlFor="username">User Name</label>
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
                  value={
                    formData.walletAddress ||
                    "Click here to connect Phantom Wallet."
                  }
                  readOnly
                  onClick={handleWalletConnect}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="form-actions">
                <button
                  className="btn-cancel"
                  onClick={() => router.push("/accountprofile")}
                >
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

      {/* Popup for connecting a new wallet */}
      {showConnectWalletPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>
              A wallet is already connected. Do you want to connect a new one?
            </p>
            <button onClick={handleConfirmConnectNewWallet}>Yes</button>
            <button onClick={() => setShowConnectWalletPopup(false)}>No</button>
          </div>
        </div>
      )}

      {/* Success popup for 3 seconds */}
      {showSuccessPopup && (
        <div className="success-popup">
          <p>Wallet address updated successfully!</p>
        </div>
      )}
    </Section>
  );
};

export default UserSetting;

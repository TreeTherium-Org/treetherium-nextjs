import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import useQuery from "@/app/libs/useQuery";
import { Toaster, toast } from "react-hot-toast";

const Navbar = ({ isOpen, onClose }) => {
  const { data: userData } = useQuery("/api/me");

  // Function to handle logout
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
    <>

      {/* Toaster for notifications */}
      <Toaster position="top-center" />
      
      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={onClose} />}

      {/* Navbar */}
      <div className={`ba-navbar ${isOpen ? "ba-navbar-show" : ""}`}>
        <div className="ba-navbar-user">
          <div className="thumb">
            <Image
              src={userData?.profileImageUrl || "/assets/img/user.png"}
              alt="user"
              width={120}
              height={120}
            />
          </div>
          <div className="details">
            <h5>{userData?.username || "Username"}</h5>
            <p>{userData?.country || "Country"}</p>
          </div>
        </div>

        <div className="ba-main-menu">
          <ul>
            <li>
              <Link href="/home">
                <i className="fa fa-home" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/my-forest">
                <i className="fa fa-tree" />
                <span>My Forest</span>
              </Link>
            </li>
            <li>
              <Link href="/analytics">
                <i className="fa fa-bar-chart" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link href="/knowledge-base">
                <i className="fa fa-book" />
                <span>Knowledge Base</span>
              </Link>
            </li>
            <li>
              <Link href="/accountprofile">
                <i className="fa fa-user" />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`ba-auth-button ${userData ? "logged-in" : "logged-out"}`}
        >
          {userData ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <i className="fa fa-sign-out" />
              <span>Log out</span>
            </a>
          ) : (
            <Link href="/signin">
              <i className="fa fa-sign-in" />
              <span>Login / Register</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

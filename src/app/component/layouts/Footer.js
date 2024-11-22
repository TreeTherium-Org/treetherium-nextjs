"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import useQuery from "@/app/libs/useQuery";

const Footer = () => {
  const { data: session } = useQuery("/api/me");

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleProfileClick = (e) => {
    e.preventDefault();
    // Check if session exists and if the user ID is present
    if (!session?.user?.id) {
      setShowModal(true); // Show the modal if no session ID
    } else {
      router.push("/accountprofile"); // Redirect to account profile if logged in
    }
  };

  useEffect(() => {
    if (showModal) {
      // Redirect to sign in after 3 seconds if the modal is shown
      const timer = setTimeout(() => {
        setShowModal(false); // Hide the modal
        router.push("/signin"); // Redirect to sign in
      }, 3000);

      // Cleanup the timer on unmount
      return () => clearTimeout(timer);
    }
  }, [showModal, router]);

  return (
    <>
      <div className="footer-area" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="footer-bottom d-flex justify-content-around">
            <ul
              className="footer-menu d-flex justify-content-around"
              style={{
                width: "100%",
                padding: "0",
                margin: "0",
                listStyle: "none",
              }}
            >
              <li className="text-center">
                <Link href="/home" className="home-clicked">
                  <i
                    className="fa fa-home"
                    style={{ fontSize: "22px", color: "#4F3738" }}
                  />
                  <p style={{ margin: "0", color: "#4F3738" }}>Home</p>
                </Link>
              </li>
              <li className="text-center">
                <Link href="/knowledge-base">
                  <FontAwesomeIcon
                    icon={faBookOpenReader}
                    style={{ fontSize: "20px", color: "#4F3738" }}
                  />
                  <p style={{ margin: "0", color: "#4F3738" }}>Guides</p>
                </Link>
              </li>
              <li className="text-center">
                <Link href="/faq">
                  <i
                    className="fa fa-question-circle"
                    style={{ fontSize: "22px", color: "#4F3738" }}
                  />
                  <p style={{ margin: "0", color: "#4F3738" }}>FAQ</p>
                </Link>
              </li>
              <li className="text-center">
                <a href="/accountprofile">
                  <i
                    className="fa fa-user"
                    style={{ fontSize: "22px", color: "#4F3738" }}
                  />
                  <p style={{ margin: "0", color: "#4F3738" }}>Profile</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top Area */}
      <div className="back-to-top">
        <span className="back-top">
          <i className="fa fa-angle-up" />
        </span>
      </div>

      {/* Modal for not logged in */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>You are not logged in yet. Redirecting to sign in...</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          max-width: 400px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Footer;

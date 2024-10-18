"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const [sessionId, setSessionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch the session ID from sessionStorage or wherever you store it
    const storedId = localStorage.getItem("userId");
    setSessionId(storedId);
  }, []);

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (!sessionId) {
      setShowModal(true); // Show the modal if no session ID
    } else {
      router.push("/accountprofile"); // Redirect to account profile if logged in
    }
  };

  return (
    <>
      <div className="footer-area" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="footer-bottom d-flex justify-content-around">
            <ul
              className="footer-menu d-flex justify-content-around"
              style={{ width: "100%", padding: "0", margin: "0", listStyle: "none" }}
            >
              <li className="text-center">
                <Link href="/" className="home-clicked">
                  <i className="fa fa-home" style={{ fontSize: "20px", color: "#4F3738" }} />
                  <p style={{ margin: "0", color: "#4F3738" }}>Home</p>
                </Link>
              </li>
              <li className="text-center">
                <Link href="/menu">
                  <i className="fa fa-bars" style={{ fontSize: "20px", color: "#4F3738" }} />
                  <p style={{ margin: "0", color: "#4F3738" }}>Menu</p>
                </Link>
              </li>
              <li className="text-center">
                <Link href="/faq">
                  <i className="fa fa-question-circle" style={{ fontSize: "20px", color: "#4F3738" }} />
                  <p style={{ margin: "0", color: "#4F3738" }}>FAQ</p>
                </Link>
              </li>
              <li className="text-center">
                <a href="#" onClick={handleProfileClick}>
                  <i className="fa fa-user" style={{ fontSize: "20px", color: "#4F3738" }} />
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>User not logged in yet. Please log in to access your profile.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(false)}>
              Close
            </button>
            <Link href="/signin">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Go to Sign In
              </button>
            </Link>
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
        .modal-content p {
          margin-bottom: 20px;
        }
        .btn {
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          margin: 5px;
          cursor: pointer;
        }
        .btn-primary {
          background-color: #4F3738;
          color: white;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Footer;

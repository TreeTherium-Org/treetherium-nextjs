"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure the correct path to your firebase.js
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useQuery from "@/app/libs/useQuery";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className="full-screen-loader">
    <div className="loading"></div>
  </div>
);

const TreeDetails = () => {
  const { id } = useParams();
  const { data: tree } = useQuery(`/api/trees/${id}`);

  if (!tree) {
    return <FullScreenLoader />;
  }
  return (
    <Section allNotification={false} searchPopup={true} title={"Tree Details"}>
      <div className="transaction-area pd-top-36">
        <div className="container">
          <div className="card">
            <div className="image-container">
              <img
                className="card-img-top"
                src={tree.imageUrl || "/default-image.jpg"}
                alt="Tree Image"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{tree.title || "Unnamed Tree"}</h5>
              <div
                className="divider"
                style={{
                  margin: "10px 0",
                  height: "1px",
                  backgroundColor: "#ccc",
                }}
              />
              <p className="card-text">
                <strong>Description:</strong>{" "}
                {tree.description || "No description available."}
              </p>
              <p className="card-text">
                <strong>Location:</strong>{" "}
                {tree.location || "No location available."}{", " + tree.country || "."}
              </p>
              <p className="card-text">
                <strong>Timestamp:</strong>{" "}
                {tree.timestamp
                  ? new Date(tree.timestamp.seconds * 1000).toLocaleString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false,
                      }
                    )
                  : "Unknown"}
              </p>
              {/* Uncomment and configure the map if you have Google Maps setup */}
              {/* <div className="map-container" style={{ marginTop: '20px' }}>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={10}
                  >
                    <Marker position={mapCenter} />
                  </GoogleMap>
                </LoadScript>
              </div> */}
            </div>
          </div>
          <div className="btn-wrap mg-top-30">
            <Link href="/list-trees" className="view-tree-button">
              View All Trees
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TreeDetails;

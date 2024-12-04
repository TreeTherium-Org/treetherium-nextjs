"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure the correct path to your firebase.js
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useQuery from "@/app/libs/useQuery";
import styles from "./tree.module.css";

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className={styles.fullScreenLoader}>
    <div className={styles.loadingMessage}></div>
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
    <div className={styles.pdTop36}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              className={styles.cardImgTop}
              src={tree.imageUrl || "/default-image.jpg"}
              alt="Tree Image"
            />
          </div>
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>{tree.title || "Unnamed Tree"}</h5>
            <div className={styles.divider} />
            <p className={styles.cardText}>
              <strong>Description:</strong> {tree.description || "No description available."}
            </p>
            <p className={styles.cardText}>
              <strong>Location:</strong> {tree.location || "No location available."}, {tree.country || "."}
            </p>
            <p className={styles.cardText}>
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
            {/* <div className={styles.mapContainer} style={{ marginTop: '20px' }}>
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
        <div className={`${styles.btnWrap} ${styles.mgTop30}`}>
          <Link href="/list-trees" className={styles.viewTreeButton}>
            View All Trees
          </Link>
        </div>
      </div>
    </div>
  </Section>
  );
};

export default TreeDetails;

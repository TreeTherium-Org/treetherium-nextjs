"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure the correct path to your firebase.js
import useQuery from "@/app/libs/useQuery";
import styles from "./project.module.css";

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className={styles.fullScreenLoader}>
    <div className={styles.loadingMessage}></div>
  </div>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project } = useQuery(`/api/projects/${id}`);

  if (!project) {
    return <FullScreenLoader />;
  }

  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Project Details"}
    >
      <div className={styles.pdTop36}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                className={styles.cardImgTop}
                src={project.imageUrl || "/default-image.jpg"}
                alt="Project Image"
              />
            </div>
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>
                {project.projectName || "Unnamed Project"}
              </h5>

              <div
                className={styles.divider}
                style={{
                  margin: "10px 0",
                  height: "2px",
                  backgroundColor: "#ccc",
                }}
              />
              <p className={styles.cardText}>
                <strong>Description:</strong>{" "}
                {project.description || "No description available."}
              </p>
              <p className={styles.cardText}>
                <strong>Tree Species:</strong>{" "}
                {project.treeSpecies || "Not specified"}
              </p>
              <p className={styles.cardText}>
                <strong>Number of Planted Trees:</strong>{" "}
                {project.targetTrees || "Not specified"}
              </p>
              <p className={styles.cardText}>
                <strong>Location:</strong>{" "}
                {project.location || "No location available."}{" "}
                {", " + project.country || "."}
              </p>
              <p className={styles.cardText}>
                <strong>Start Date:</strong>{" "}
                {project.startDate
                  ? new Date(project.startDate.seconds * 1000).toLocaleString(
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
              <p className={styles.cardText}>
                <strong>End Date:</strong>{" "}
                {project.endDate
                  ? new Date(project.endDate.seconds * 1000).toLocaleString(
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
            </div>
          </div>
          <div className={`${styles.btnWrap} ${styles.mgTop30}`}>
            <Link href="/my-projects" className={styles.viewProjectButton}>
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectDetails;

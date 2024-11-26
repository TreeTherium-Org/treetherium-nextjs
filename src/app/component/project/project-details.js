"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure the correct path to your firebase.js
import useQuery from "@/app/libs/useQuery";

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className="full-screen-loader">
    <div className="loading"></div>
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
      <div className="transaction-area pd-top-36">
        <div className="container">
          <div
            className="card"
          >
            <div className="image-container">
              <img
                className="card-img-top"
                src={project.imageUrl || "/default-image.jpg"}
                alt="Project Image"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{project.projectName || "Unnamed Tree"}</h5>

              <div
                className="divider"
                style={{
                  margin: "10px 0",
                  height: "2px",
                  backgroundColor: "#ccc",
                }}
              />
              <p className="card-text">
                <strong>Description:</strong>{" "}
                {project.description || "No description available."}
              </p>
              <p className="card-text">
                <strong>Tree Species:</strong>{" "}
                {project.treeSpecies || "Not specified"}
              </p>
              <p className="card-text">
                <strong>Number of Planted Trees:</strong>{" "}
                {project.targetTrees || "Not specified"}
              </p>
              <p className="card-text">
                <strong>Location:</strong>{" "}
                {project.location || "No location available."}{", " + project.country || "."}
              </p>
              <p className="card-text">
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
              <p className="card-text">
                <strong>End Date:</strong>
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
            </div>
          </div>
          <div
            className="btn-wrap mg-top-30"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <Link href="/my-projects" className="view-tree-button">
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectDetails;

"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure the correct path to your firebase.js
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useQuery from "@/app/libs/useQuery";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const TreeDetails = () => {
  const { id } = useParams(); // Get the tree ID from the query parameters
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState(""); // State to hold the location name
  const { data: tree } = useQuery(`/api/trees/${id}`);
  // Fetch tree details from Firestore
  //   useEffect(() => {
  //     const fetchTreeDetails = async () => {
  //       if (id) {
  //         try {
  //           const treeDoc = doc(db, "tree", id);
  //           const treeSnapshot = await getDoc(treeDoc);
  //           if (treeSnapshot.exists()) {
  //             const treeData = { id: treeSnapshot.id, ...treeSnapshot.data() };
  //             setTree(treeData);
  //           } else {
  //             console.error("No such tree!");
  //           }
  //         } catch (error) {
  //           console.error("Error fetching tree details: ", error);
  //         }
  //       }
  //     };
  //     fetchTreeDetails();
  //   }, [id]);

  if (!tree) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }

  return (
    <Section allNotification={false} searchPopup={true} title={"Tree Details"}>
      {/* Start fetch data */}
      <div className="transaction-area pd-top-36">
        <div className="container">
          <div className="card">
            <img
              className="card-img-top w-100"
              src={tree.imageUrl || "/default-image.jpg"}
              alt="Tree Image"
            />
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
                {tree.location || "No location available."}
              </p>
              {/* <div className="map-container" style={{ marginTop: '20px' }}>
                                <LoadScript googleMapsApiKey="AIzaSyCIV9YVytAARkQZ1mLhzaauyJZqRC3anhc">
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
      {/* Transaction End */}
    </Section>
  );
};

export default TreeDetails;

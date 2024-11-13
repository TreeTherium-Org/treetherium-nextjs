"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import Image from "next/image";
import useQuery from "@/app/libs/useQuery";

// Full-Screen Loader Component
const FullScreenLoader = () => (
  <div className="full-screen-loader">
    <div className="loading-message">Loading trees...</div>
  </div>
);

const ListTrees = () => {
  const { data: trees, loading } = useQuery("/api/trees");

  if (loading) {
    return (
      <Section
        allNotification={false}
        searchPopup={true}
        title={"List of Trees"}
      >
        <FullScreenLoader />
      </Section>
    );
  }

  return (
    <Section allNotification={false} searchPopup={true} title={"My Trees"}>
      <div className="transaction-area pd-top-36">
        <div className="container">
          <div className="btn-wrap mg-bottom-60">
            <div className="container">
              <Link href="/trees-form" className="add-tree-button">
                Add New Tree{" "}
                <i className="fa fa-angle-double-right icon-spacing" />
              </Link>
            </div>
          </div>
          <div className="tree-gallery">
            {trees?.length > 0 ? (
              trees.map((tree) => (
                <div key={tree.id} className="tree-item">
                  <Link href={`/list-trees/${tree.id}`}>
                    <div className="tree-image">
                      <Image
                        src={tree.imageUrl || "/default-image.jpg"}
                        alt={tree.title || "Unnamed Tree"}
                        width={300}
                        height={300}
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <h5 className="tree-title">
                      {tree.title || "Unnamed Tree"}
                    </h5>
                    <strong>
                      {tree.timestamp
                        ? new Date(
                            tree.timestamp.seconds * 1000
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Unknown"}
                    </strong>
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-tree">No trees found.</div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ListTrees;

"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import Image from "next/image";
import useQuery from "@/app/libs/useQuery";
import styles from "./tree.module.css";

const FullScreenLoader = () => (
  <div className={styles.fullScreenLoader}>
    <div className={styles.loadingMessage}></div>
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
      <div className={`${styles.transactionArea} ${styles.pdTop36}`}>
        <div className={styles.container}>
          <div className={`${styles.btnWrap} ${styles.mgBottom60}`} >
            <div className={styles.container}>
              <Link href="/trees-form" className={styles.addTreeButton}>
                Add New Tree{" "}
                <i className="fa fa-angle-double-right icon-spacing" />
              </Link>
            </div>
          </div>
          <div className={styles.treeGallery}>
            {trees?.length > 0 ? (
              trees.map((tree) => (
                <div key={tree.id} className={styles.treeItem}>
                  <Link href={`/list-trees/${tree.id}`}>
                    <div className={styles.treeImage}>
                      <Image
                        src={tree.imageUrl || "/default-image.jpg"}
                        alt={tree.title || "Unnamed Tree"}
                        width={300}
                        height={300}
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <h5 className={styles.treeTitle}>
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
              <div className={styles.noTree}>No trees found.</div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ListTrees;

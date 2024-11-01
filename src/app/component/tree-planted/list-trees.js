import Section from "../layouts/Section";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure the correct path to your firebase.js
import { useSession } from "next-auth/react"; // Import useSession

const ListTrees = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession(); // Destructure session data to get the user ID

  useEffect(() => {
    const fetchTrees = async () => {
      setLoading(true);

      // Replace this with the logic to retrieve `userId` from session
      const userId = session?.user?.id; // Adjust as needed for your session management

      if (!userId) {
        setLoading(false);
        return;
      }

      console.log(userId);

      try {
        // Fetch trees that match the user ID
        const treeCollection = collection(db, "tree");
        const q = query(treeCollection, where("userId", "==", userId));
        const treeSnapshot = await getDocs(q);
        const treeList = treeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrees(treeList);
      } catch (error) {
        console.error("Error fetching trees: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrees();
  }, []);

  if (loading) {
    return (
      <Section
        allNotification={false}
        searchPopup={true}
        title={"List of Trees"}
      >
        <div className="loading-area">
          <div className="loading-message">Loading trees...</div>
        </div>
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
                Add New Tree  <i className="fa fa-angle-double-right icon-spacing" />
              </Link>
            </div>
          </div>
          <div className="tree-gallery">
            {trees.length > 0 ? (
              trees.map((tree) => (
                <div key={tree.id} className="tree-item">
                  <Link href={`/tree-details?id=${tree.id}`}>
                    <div className="tree-image">
                      <Image
                        src={tree.imageUrl || "/default-image.jpg"}
                        alt={tree.title || "Unnamed Tree"}
                        width={300}
                        height={300}
                        style={{ borderRadius: '20px' }}
                      />
                    </div>

                    <h5 className="tree-title">
                      {tree.title || "Unnamed Tree"}
                    </h5>
                    <strong>
                      {tree.timestamp
                        ? new Date(tree.timestamp.seconds * 1000).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
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

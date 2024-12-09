"use client";
import Section from "../layouts/Section";
import Link from "next/link";
import Image from "next/image";
import useQuery from "@/app/libs/useQuery";
import styles from "./project.module.css";
// import { useSession } from "next-auth/react"; // Import useSession

const ListProjects = () => {
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const { data: session } = useSession(); // Destructure session data to get the user ID
  const { data: projects, loading } = useQuery("/api/projects");
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setLoading(true);

  //     // Replace this with the logic to retrieve `userId` from session
  //     const userId = session?.user?.id; // Adjust as needed for your session management

  //     if (!userId) {
  //       setLoading(false);
  //       return;
  //     }

  //     console.log(userId);

  //     try {
  //       // Fetch projects that match the user ID
  //       const projectCollection = collection(db, "projects");
  //       const q = query(projectCollection, where("userId", "==", userId));
  //       const projectSnapshot = await getDocs(q);
  //       const projectList = projectSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setProjects(projectList);
  //     } catch (error) {
  //       console.error("Error fetching projects: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProjects();
  // }, []);

  if (loading) {
    return (
      <Section
        allNotification={false}
        searchPopup={true}
        title={"List of Projects"}
      >
        <div className={styles.fullScreenLoader}>
          <div className={styles.loadingMessage}></div>
        </div>
      </Section>
    );
  }

  return (
    <Section allNotification={false} searchPopup={true} title={"My Projects"}>
      <div className={`${styles.transactionArea} ${styles.pdTop36}`}>
        <div className={styles.container}>
          <div className={`${styles.btnWrap} ${styles.mgBottom60}`}>
            <div className={styles.container}>
              <Link href="/projects-form" className={styles.addProjectButton}>
                Add New Project{" "}
                <i className="fa fa-angle-double-right icon-spacing" />
              </Link>
            </div>
          </div>
          <div className={styles.projectGallery}>
            {projects?.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className={styles.projectItem}>
                  <Link href={`/my-projects/${project.id}`}>
                    <div className={styles.projectImage}>
                      <Image
                        src={project.imageUrl || "/default-image.jpg"}
                        alt={project.title || "Unnamed Project"}
                        width={300}
                        height={300}
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <h5 className={styles.projectTitle}>
                      {project.projectName || "Unnamed Project"}
                    </h5>
                    <strong>
                      {project.startDate
                        ? new Date(
                            project.startDate.seconds * 1000
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
              <div className={styles.noProject}>No projects found.</div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ListProjects;

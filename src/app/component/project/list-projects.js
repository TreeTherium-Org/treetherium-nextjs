import Section from "../layouts/Section";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebase'; // Ensure the correct path to your firebase.js

const ListProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    // Fetch project data from Firestore
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true); // Start loading
            try {
                const projectCollection = collection(db, 'project');
                const projectSnapshot = await getDocs(projectCollection);
                const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectList);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            } finally {
                setLoading(false); // End loading
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <Section allNotification={false} searchPopup={true} title={'List of Projects'}>
                <div className="loading-area">
                    <div className="loading-message">Loading projects...</div>
                </div>
            </Section>
        ); // Show loading state while fetching
    }

    return (
        <Section allNotification={false} searchPopup={true} title={'List of Projects'}>
            {/* Display List of Projects start */}
            <div className="transaction-area pd-top-36">
                <div className="container">
                    <div className="section-title">
                        <h3 className="title">List of Projects</h3>
                    </div>
                    <div className="project-gallery">
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <div key={project.id} className="project-item">
                                    <Link href={`/project-details?id=${project.id}`}>
                                        <div className="project-image">
                                            <Image
                                                src={project.imageUrl || '/default-image.jpg'}
                                                alt={project.title || 'Unnamed Project'}
                                                width={300}
                                                height={300}
                                                objectFit="cover"
                                            />
                                        </div>
                                        <h4 className="project-title">{project.title || 'Unnamed Project'}</h4>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div>No projects found.</div>
                        )}
                    </div>
                </div>
            </div>
            {/* Display List of Projects End */}

            <div className="btn-wrap mg-top-40 mg-bottom-40">
                <div className="container">
                    <Link href="/projects-form" className="btn-large btn-blue w-100">
                        Add new project <i className="fa fa-angle-double-right" />
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default ListProjects;

import Section from "../layouts/Section";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase'; // Ensure the correct path to your firebase.js

const TreeDetails = () => {
    const router = useRouter();
    const { id } = router.query; // Get the tree ID from the query parameters
    const [tree, setTree] = useState(null);

    // Fetch tree details from Firestore
    useEffect(() => {
        const fetchTreeDetails = async () => {
            if (id) {
                try {
                    const treeDoc = doc(db, 'tree', id);
                    const treeSnapshot = await getDoc(treeDoc);
                    if (treeSnapshot.exists()) {
                        setTree({ id: treeSnapshot.id, ...treeSnapshot.data() });
                    } else {
                        console.error("No such tree!");
                    }
                } catch (error) {
                    console.error("Error fetching tree details: ", error);
                }
            }
        };
        fetchTreeDetails();
    }, [id]);

    if (!tree) {
        return <div>Loading...</div>; // Show a loading state while fetching
    }

    return (
        <Section allNotification={false} searchPopup={true} title={'Tree Details'}>
            {/*start fetch data*/}
            <div className="transaction-area pd-top-36">
                <div className="container">
                    <div className="section-title">
                        <h3 className="title">{tree.title || 'Unnamed Tree'}</h3>
                    </div>
                    <div className="about-content-inner p-0">
                        <img className="w-100" src={tree.imageUrl || '/default-image.jpg'} alt="Tree Image" />
                    </div>
                    <div className="about-content-inner">
                        <h5>Project Name: {tree.projectName || 'N/A'}</h5>
                        <p>Description: {tree.description || 'No description available.'}</p>
                        <p>Location: {tree.location || 'No location available.'}</p>
                    </div>
                </div>
            </div>
            {/* transaction End */}
        </Section>
    );
};

export default TreeDetails;

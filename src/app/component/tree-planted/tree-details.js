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
                    <div className="card">
                        <img
                            className="card-img-top w-100"
                            src={tree.imageUrl || '/default-image.jpg'}
                            alt="Tree Image"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{tree.title || 'Unnamed Tree'}</h5> {/* Displaying the tree name as the title */}
                            <div className="divider" style={{ margin: '10px 0', height: '1px', backgroundColor: '#ccc' }} /> {/* Partition between image and text */}
                            <p className="card-text"><strong>Description:</strong> {tree.description || 'No description available.'}</p>
                            <p className="card-text"><strong>Location:</strong> {tree.location || 'No location available.'}</p>
                        </div>
                    </div>
                    <div className="btn-wrap mg-top-40">
                        <Link href="/list-trees" className="btn-large btn-blue w-100">
                            View All Trees
                        </Link>
                    </div>
                </div>
            </div>
            {/* transaction End */}
        </Section>
    );
};

export default TreeDetails;

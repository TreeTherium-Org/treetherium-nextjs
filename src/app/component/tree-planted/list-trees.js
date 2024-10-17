import Section from "../layouts/Section";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebase'; // Ensure the correct path to your firebase.js

const ListTrees = () => {
    const [trees, setTrees] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    // Fetch tree data from Firestore
    useEffect(() => {
        const fetchTrees = async () => {
            setLoading(true); // Start loading
            try {
                const treeCollection = collection(db, 'tree');
                const treeSnapshot = await getDocs(treeCollection);
                const treeList = treeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTrees(treeList);
            } catch (error) {
                console.error("Error fetching trees: ", error);
            } finally {
                setLoading(false); // End loading
            }
        };
        fetchTrees();
    }, []);

    if (loading) {
        return (
            <Section allNotification={false} searchPopup={true} title={'List of Trees'}>
                <div className="loading-area">
                    <div className="loading-message">Loading trees...</div>
                </div>
            </Section>
        ); // Show loading state while fetching
    }

    return (
        <Section allNotification={false} searchPopup={true} title={'List of Trees'}>
            {/* Display List of Tree start */}
            <div className="transaction-area pd-top-36">
                <div className="container">
                    <div className="tree-gallery">
                        {trees.length > 0 ? (
                            trees.map(tree => (
                                <div key={tree.id} className="tree-item">
                                    <Link href={`/tree-details?id=${tree.id}`}>
                                        <div className="tree-image">
                                            <Image
                                                src={tree.imageUrl || '/default-image.jpg'}
                                                alt={tree.title || 'Unnamed Tree'}
                                                width={300}
                                                height={300}
                                                objectFit="cover"
                                            />
                                        </div>
                                        <h4 className="tree-title">{tree.title || 'Unnamed Tree'}</h4>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div>No trees found.</div>
                        )}
                    </div>
                </div>
            </div>
            {/* Display List of Tree End */}

            <div className="btn-wrap mg-top-40 mg-bottom-40">
                <div className="container">
                    <Link href="/trees-form" className="btn-large btn-blue w-100">
                        Add new tree <i className="fa fa-angle-double-right" />
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default ListTrees;

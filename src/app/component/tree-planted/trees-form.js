import { useState } from 'react';
import { useRouter } from 'next/router';
import Section from "../layouts/Section";
import { db, storage } from '../../../firebase'; // Import Firestore and Storage from firebase.js
import { collection, addDoc } from 'firebase/firestore'; // Firestore
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase Storage

export default function UploadForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        image: null
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0]
        }));
    };

    const validateForm = () => {
        if (!formData.title || !formData.description || !formData.location || !formData.image) {
            return "All fields are required.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formError = validateForm();
        if (formError) {
            setError(formError);
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            // Create a reference for the file in Firebase Storage
            const storageRef = ref(storage, `tree-images/${formData.image.name}`);

            // Upload the file
            const uploadTask = uploadBytesResumable(storageRef, formData.image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Track the upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Upload failed:', error);
                    setIsUploading(false);
                    setError('Failed to upload image. Please try again.');
                },
                async () => {
                    // Get the download URL after successful upload
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Save the metadata along with the image URL to Firestore
                    await addDoc(collection(db, 'tree'), {
                        title: formData.title,
                        description: formData.description,
                        location: formData.location,
                        imageUrl: downloadURL, // Store the image URL in Firestore
                        timestamp: new Date() // Add timestamp
                    });

                    // Reset the form after upload
                    setFormData({
                        title: '',
                        description: '',
                        location: '',
                        image: null
                    });
                    setIsUploading(false);
                    setUploadProgress(0);

                    // Redirect to the list of trees after successful upload
                    router.push('/list-trees');
                }
            );
        } catch (error) {
            console.error('Error uploading data:', error);
            setIsUploading(false);
            setError('Failed to upload data. Please try again.');
        }
    };

    return (
        <Section allNotification={false} searchPopup={false} title={'Upload a Tree'}>
            <div className="transaction-area pd-top-36">
                <div className="container">
                    <div className="section-title">
                        <h3 className="title">Let Us Know About Your Tree</h3>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
                        <div className="about-content-inner">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-100 form-control"
                                placeholder="Enter title"
                            />
                        </div>

                        <div className="about-content-inner">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-100 form-control"
                                placeholder="Enter description"
                            />
                        </div>

                        <div className="about-content-inner">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-100 form-control"
                                placeholder="Enter location"
                            />
                        </div>

                        <div className="about-content-inner">
                            <label htmlFor="image">Upload Image</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="w-100 form-control"
                            />
                        </div>

                        {isUploading && (
                            <div className="about-content-inner">
                                <p>Uploading: {Math.round(uploadProgress)}%</p>
                            </div>
                        )}

                        <div className="btn-wrap mg-top-40 mg-bottom-40">
                            <button type="submit" className="btn-large btn-blue w-100" disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Submit'} <i className="fa fa-angle-double-right" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Section>
    );
}

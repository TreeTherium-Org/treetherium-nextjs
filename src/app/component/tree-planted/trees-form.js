import { useState } from "react";
import { useRouter } from "next/router";
import Section from "../layouts/Section";
import { db, storage } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import LocationPicker from "./LocationPicker";
import { getData } from "country-list"; // Import countries list

export default function UploadForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "", // Add country field
    image: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const countries = getData(); // Get the list of countries

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.country ||
      !formData.image
    ) {
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
    setError("");

    try {
      const storageRef = ref(storage, `tree-images/${formData.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
          setError("Failed to upload image. Please try again.");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          if (session?.user?.id) {
            await addDoc(collection(db, "tree"), {
              userId: session.user.id,
              title: formData.title,
              description: formData.description,
              location: formData.location,
              country: formData.country, // Save country
              imageUrl: downloadURL,
              timestamp: new Date(),
            });
            setFormData({
              title: "",
              description: "",
              location: "",
              country: "",
              image: null,
            });
            setIsUploading(false);
            setUploadProgress(0);
            router.push("/list-trees");
          } else {
            setError("User ID not found. Please sign in again.");
            setIsUploading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading data:", error);
      setIsUploading(false);
      setError("Failed to upload data. Please try again.");
    }
  };

  return (
    <Section
      allNotification={false}
      searchPopup={false}
      title={"Upload A Tree"}
    >
      <div className="transaction-area pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;let us know about your tree&quot;
          </h3>
          <div className="form-image">
            <img
              src="/assets/img/step-3.png"
              alt="Tree illustration"
              className="illustration-image"
            />
          </div>
          <div className="card upload-card">
            {error && <p className="error-message">{error}</p>}
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="upload-form"
            >
              <div className="form-group">
                <label htmlFor="title">Tree Species</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter species"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Enter country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image Of The Tree</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="form-control"
                />
              </div>

              {isUploading && (
                <div className="form-group">
                  <p>Uploading: {Math.round(uploadProgress)}%</p>
                </div>
              )}

              <div className="btn-wrap">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

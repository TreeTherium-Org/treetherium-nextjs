"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../layouts/Section";
import { getData } from "country-list";
import styles from "./tree.module.css";

export default function TreesForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
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
    const form = new FormData();
    form.append("file", formData.image);
    form.append("title", formData.title.toString());
    form.append("description", formData.description.toString());
    form.append("location", formData.location.toString());
    form.append("country", formData.country.toString());

    const response = await fetch("/api/trees", {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to plant tree");
    }
    router.push("/list-trees");
  };

  return (
    <Section allNotification={false} searchPopup={false} title="Upload A Tree">
    <div className={styles.pdTop36}>
      <div className={styles.container}>
        <h3 className={styles.formTitle}>"Let us know about your tree"</h3>
        <div className={styles.formImage}>
          <img
            src="/assets/img/step-3.png"
            alt="Tree illustration"
            className={styles.illustrationImage}
          />
        </div>
        <div className={styles.uploadCard}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className={styles.uploadForm}
          >
            <div className={styles.formGroup}>
              <label htmlFor="title">Tree Species</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={styles.formControl}
                placeholder="Enter species"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                className={styles.formControl}
                placeholder="Enter description"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                className={styles.formControl}
                placeholder="Enter location"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required
                className={styles.formControl}
              >
                <option value="">Enter country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image">Image Of The Tree</label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                className={styles.formControl}
              />
            </div>

            {isUploading && (
              <div className={styles.formGroup}>
                <p style={{ color: 'brown' }}>
                  Uploading: {Math.round(uploadProgress)}%
                </p>
              </div>
            )}

            <div className={styles.btnWrap}>
              <button
                type="submit"
                className={styles.btnSubmit}
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

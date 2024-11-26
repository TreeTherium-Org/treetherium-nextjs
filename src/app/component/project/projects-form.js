"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../layouts/Section";
import { getData } from "country-list";
import { Toaster, toast } from "react-hot-toast";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    treeSpecies: "",
    targetTrees: "",
    startDate: "",
    endDate: "",
    location: "",
    country: "",
    image: null,
    members: "",
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
    const requiredFields = [
      "projectName",
      "description",
      "treeSpecies",
      "targetTrees",
      "startDate",
      "endDate",
      "location",
      "country",
      "image",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return "All fields are required.";
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formError = validateForm();
    if (formError) {
      toast.error(formError); // Show error toast
      return;
    }
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      form.append(key, key === "image" ? value : value.toString())
    );

    setIsUploading(true);
    toast.loading("Uploading project data..."); // Show loading toast

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: form,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit project");
      }

      toast.dismiss(); // Dismiss the loading toast
      toast.success("Project submitted successfully!"); // Show success toast
      router.push("/my-projects");
    } catch (error) {
      toast.dismiss(); // Dismiss the loading toast
      toast.error(error.message || "Something went wrong"); // Show error toast
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Section title="Create A Project">
      {/* Toaster for notifications */}
      <Toaster position="top-center" />
      <div className="container">
        <h3 className="form-title"> &quot;let us know about your project &quot;</h3>
        <div className="form-image">
          <img
            src="/assets/img/step-3.png"
            alt="Project illustration"
            className="illustration-image"
          />
        </div>
        <div className="card upload-card">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="upload-form"
          >
            {/* Project Name */}
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                name="projectName"
                id="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
                placeholder="Enter project name"
                className="form-control"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter description"
                className="form-control"
              />
            </div>

            {/* Tree Species */}
            <div className="form-group">
              <label htmlFor="treeSpecies">Tree Species</label>
              <input
                type="text"
                name="treeSpecies"
                id="treeSpecies"
                value={formData.treeSpecies}
                onChange={handleChange}
                required
                placeholder="Enter species"
                className="form-control"
              />
            </div>

            {/* Target Trees */}
            <div className="form-group">
              <label htmlFor="targetTrees">Target Number Of Trees</label>
              <input
                type="number"
                name="targetTrees"
                id="targetTrees"
                value={formData.targetTrees}
                onChange={handleChange}
                required
                placeholder="Enter target number"
                className="form-control"
              />
            </div>

            {/* Add Members
            <div className="form-group">
              <label htmlFor="members">Add Members</label>
              <input
                type="email"
                name="members"
                id="members"
                value={formData.members}
                onChange={handleChange}
                placeholder="Enter email"
                className="form-control"
              />
            </div>

            */}

            {/* Start Date */}
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* End Date */}
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter location"
                className="form-control"
              />
            </div>

            {/* Country */}
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

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="image">Image Of The Project</label>
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
              <p style={{ color: "brown" }}>
                Uploading: {Math.round(uploadProgress)}%
              </p>
            )}

            {/* Submit Button */}
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
    </Section>
  );
}

import React, { useState, useEffect } from "react";
import "./ReportPet.css"; // Import styling
import { reportPet } from "../api";
import { jwtDecode } from "jwt-decode";  // Correct import


const ReportPet = () => {
  const [formData, setFormData] = useState({
    petName: "",
    petAge: "",
    petGender: "",
    petBreed: "",
    petColor: "",
    petType: "",
    bodySize: "",
    location: "",
    reportType: "Lost",
    description: "",
  });

  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  // Fetch token on mount
  useEffect(() => {
    const fetchToken = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        setError("You must be logged in to report a pet.");
      }
    };
    fetchToken();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        throw new Error("You must be logged in to report a pet.");
      }

      // Decode the JWT token to get user data
      const decodedToken = jwtDecode(token);

      // Prepare the pet report data, including user info in postedBy
      const petReportData = {
        ...formData,
        postedBy: {
          id: decodedToken.id,
          username: decodedToken.username,
          role: decodedToken.role,
        },
      };

      // Log the petReportData to check its structure before submission
      console.log("Pet Report Data before submission:", petReportData);

      // Submit the pet report using the API function
      const response = await reportPet(petReportData, token);

      setNotification("Pet report submitted successfully!");

      // Clear the notification after a few seconds
      setTimeout(() => setNotification(""), 5000);

      // Reset the form after successful submission
      setFormData({
        petName: "",
        petAge: "",
        petGender: "",
        petBreed: "",
        petColor: "",
        petType: "",
        bodySize: "",
        location: "",
        reportType: "Lost",
        description: "",
        postedBy: {
            id: decodedToken.id,
            username: decodedToken.username,
            role: decodedToken.role,
          },
      });
    } catch (err) {
      // Log the error for debugging
      console.error("Error submitting the pet report:", err);
      setError(err.message || "Error submitting pet report. Please try again.");
    }
  };

  return (
    <div className="report-pet-page">
        <div className="report-pet-container">
          <h1>Report Pet</h1>
          <form onSubmit={handleSubmit} className="report-pet-form">
            <div className="form-fields">
              <div className="left-column">
                <input
                  type="text"
                  name="petName"
                  placeholder="Pet Name"
                  value={formData.petName}
                  onChange={handleInputChange}
                  required
                  aria-label="Pet Name"
                />
                <input
                  type="number"
                  name="petAge"
                  placeholder="Pet Age"
                  value={formData.petAge}
                  onChange={handleInputChange}
                  required
                  aria-label="Pet Age"
                  min="0"
                />
                <input
                  type="text"
                  name="petGender"
                  placeholder="Pet Gender"
                  value={formData.petGender}
                  onChange={handleInputChange}
                  required
                  aria-label="Pet Gender"
                />
                <input
                  type="text"
                  name="petBreed"
                  placeholder="Pet Breed"
                  value={formData.petBreed}
                  onChange={handleInputChange}
                  required
                  aria-label="Pet Breed"
                />
                <input
                  type="text"
                  name="petColor"
                  placeholder="Pet Colour (e.g., brown, white, black)"
                  value={formData.petColor}
                  onChange={handleInputChange}
                  required
                  aria-label="Pet Color"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  aria-label="Location"
                />
              </div>
              <div className="right-column">
                <input
                  type="text"
                  name="petType"
                  placeholder="Pet Type (e.g., dog, cat)"
                  value={formData.petType}
                  onChange={handleInputChange}
                  required
                  aria-label="Pet Type"
                />
                <select
                  name="bodySize"
                  value={formData.bodySize}
                  onChange={handleInputChange}
                  required
                  aria-label="Body Size"
                >
                  <option value="">Select Body Size</option>
                  <option value="small">Small</option>
                  <option value="middle">Middle</option>
                  <option value="big">Big</option>
                </select>
                <select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleInputChange}
                  required
                  aria-label="Report Type"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
                <textarea
                  name="description"
                  placeholder="Please briefly explain more information about your pet"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  aria-label="Description"
                />
              </div>
            </div>
            <button type="submit" className="submit-button">
              Submit Now!
            </button>
          </form>
          {notification && <p className="notification-message">{notification}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
    </div>
  );
};

export default ReportPet;

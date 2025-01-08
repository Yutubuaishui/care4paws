import React, { useState, useEffect } from "react";
import "./History.css"; // Import styling
import { getUserReports, deleteReport } from "../api"; // Import API functions
import { jwtDecode } from "jwt-decode"; // Correct import for decoding token

const History = () => {
  const [userReports, setUserReports] = useState([]);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  // Fetch user reports on mount
  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          setError("You must be logged in to view your reports.");
          return;
        }
        setToken(storedToken);
        const decodedToken = jwtDecode(storedToken);
        const reports = await getUserReports(decodedToken.id); // Fetch user-specific reports
        setUserReports(reports);
      } catch (err) {
        console.error("Error fetching user reports:", err);
        setError("Failed to fetch reports. Please try again.");
      }
    };

    fetchUserReports();
  }, []);

  // Handle marking a pet as found
  const handleMarkAsFound = async (reportId) => {
    try {
      await deleteReport(reportId, token); // Call API to delete report
      setNotification("Pet marked as found and removed from history!");

      // Update local state to remove the report
      setUserReports((prevReports) =>
        prevReports.filter((report) => report.id !== reportId)
      );

      // Clear the notification after a few seconds
      setTimeout(() => setNotification(""), 5000);
    } catch (err) {
      console.error("Error marking pet as found:", err);
      setError("Failed to mark pet as found. Please try again.");
    }
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <h1>Your Pet Report History</h1>
        {error && <p className="error-message">{error}</p>}
        {notification && <p className="notification-message">{notification}</p>}

        {userReports.length > 0 ? (
          <div className="reports-list">
            {userReports.map((report) => (
              <div key={report.id} className="report-card">
                <h3>{report.petName}</h3>
                <p>
                  <strong>Age:</strong> {report.petAge}
                </p>
                <p>
                  <strong>Gender:</strong> {report.petGender}
                </p>
                <p>
                  <strong>Breed:</strong> {report.petBreed}
                </p>
                <p>
                  <strong>Color:</strong> {report.petColor}
                </p>
                <p>
                  <strong>Type:</strong> {report.petType}
                </p>
                <p>
                  <strong>Body Size:</strong> {report.bodySize}
                </p>
                <p>
                  <strong>Location:</strong> {report.location}
                </p>
                <p>
                  <strong>Description:</strong> {report.description}
                </p>
                <button
                  className="found-button"
                  onClick={() => handleMarkAsFound(report.id)}
                >
                  Mark as Found
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no lost pet reports in your history.</p>
        )}
      </div>
    </div>
  );
};

export default History;

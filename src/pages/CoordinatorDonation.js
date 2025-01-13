import React, { useState, useEffect } from "react";
import {
  createCoordinator,
  deleteCoordinatorDetails,
  fetchCoordinatorDonationHistory,
} from "../api"; // Import the createCoordinator function from api.js

const CoordinatorDonation = () => {
  const [donations, setDonations] = useState([]);
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankType, setBankType] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [message, setMessage] = useState("");
  // const [success, setSuccess] = useState(false); // Track if submission is successful
  const [error, setError] = useState(""); // Track errors for delete

  useEffect(() => {
    const loadCoordinatorDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("You must be logged in to view donations.");
          return;
        }

        // Fetch donation history for the logged-in coordinator
        const donationHistory = await fetchCoordinatorDonationHistory(token);
        setDonations(donationHistory);
      } catch (error) {
        setMessage("Error loading donation history.");
        console.error("Error loading donation history:", error.message);
      }
    };

    loadCoordinatorDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const formData = {
      bankAccountNumber,
      bankType,
      bankAccountName,
    };

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Call the createCoordinator function from api.js
      const response = await createCoordinator(formData, token);

      // Show success message
      setMessage(response.message);
      setError(""); // Clear any previous errors
      // Reset form
      setBankAccountNumber("");
      setBankType("");
      setBankAccountName("");
    } catch (error) {
      // Show error message
      setMessage(error.message || "Error submitting form");
      setMessage(""); // Clear success message
    }
  };

  const handleDelete = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Call the deleteCoordinatorDetails function from api.js
      const response = await deleteCoordinatorDetails(token);

      // Show success message
      setMessage(response.message);
      // setSuccess(false); // Reset success status
      setError(""); // Clear any previous errors
    } catch (error) {
      // Show error message
      setError(error.message || "Error deleting details");
      setMessage(""); // Clear success message
    }
  };
  return (
    <div>
      <h2>Coordinator Donation Dashboard</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Coordinator Donation Details</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bankAccountNumber">Bank Account Number:</label>
          <input
            type="text"
            id="bankAccountNumber"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bankType">Bank Type:</label>
          <input
            type="text"
            id="bankType"
            value={bankType}
            onChange={(e) => setBankType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bankAccountName">Bank Account Name:</label>
          <input
            type="text"
            id="bankAccountName"
            value={bankAccountName}
            onChange={(e) => setBankAccountName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: "20px" }}>
        Delete Coordinator Details
      </button>

      <h3>Donations Made to You</h3>
      {donations.length > 0 ? (
        <ul>
          {donations.map((donation) => (
            <li key={donation._id}>
              <p>
                Donor: {donation.postedBy.id.username} (Phone:{" "}
                {donation.phoneNumber})
              </p>
              <p>Amount: RM{donation.amount}</p>
              <p>Payment Method: {donation.paymentMethod}</p>
              <p>Donated on: {new Date(donation.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations received yet.</p>
      )}
      {/* {success && (
        <div>
          <h3>Submission Successful!</h3>
          <p>Your coordinator donation details have been saved successfully.</p>
          <button onClick={() => setSuccess(false)}>Add Another</button>
        </div>
      )} */}
    </div>
  );
};

export default CoordinatorDonation;

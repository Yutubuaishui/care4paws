import axios from 'axios'; //send HTTP requests

const BASE_URL = 'http://localhost:8081/api';

export const loginUser = async (credentials) => {
  try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return data; // { token, role }
  } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error; // Ensure errors are propagated to the caller
  }
};

export const registerUser = async (userData) => {
  try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data; // Success response from the backend
  } catch (err) {
      // Return a meaningful error message from the server response
      if (err.response) {
          // Backend error (validation or other issues)
          throw new Error(err.response.data.message || 'Registration failed');
      } else {
          // Network or other issues
          throw new Error('Network error. Please try again later.');
      }
  }
};
export const reportPet = async (formData, token) => {
  try {
    // Sending formData as the request body and authorization header
    const response = await axios.post("http://localhost:8081/api/PetReport", formData, {
      headers: {
        "Authorization": `Bearer ${token}`, // Include token in headers
      },
    });

    // Return the server response data
    return response.data;

  } catch (error) {
    console.error("Error while reporting pet:", error); // Log the specific error
    throw new Error(error.message || "Failed to report pet. Please try again.");
  }
};

// Example API function to fetch user posts
export const getUserPosts = async (token) => {
  try {
    const response = await fetch("/api/PetReports", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Parse error details from the server if available
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch posts");
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};


// Delete a specific pet report by ID
export const deleteReport = async (reportId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting report:', error.message);
    throw error;
  }
};

// Get reports created by the user
export const getUserReports = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/reports/user/${userId}`);
    return response.data; // Assuming the backend sends the reports in the `data` field
  } catch (err) {
    console.error("Error fetching user reports:", err);
    throw new Error("Failed to fetch user reports.");
  }
};



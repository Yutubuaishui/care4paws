import axios from "axios"; //send HTTP requests

const BASE_URL = "http://localhost:8082/api";

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
      throw new Error(err.response.data.message || "Registration failed");
    } else {
      // Network or other issues
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const createEducationPost = async (postData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/api/educationPost/create",
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token for authentication
        },
      }
    );
    return response.data; // Response from backend (post data or success message)
  } catch (error) {
    console.error(
      "Error creating education post:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create education post"
    );
  }
};

export const getEducationPosts = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8082/api/educationPost/educationContent", // Adjust URL if necessary
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token for authentication
        },
      }
    );
    return response.data.posts; // Return only the posts array from the response
  } catch (error) {
    console.error(
      "Error fetching education posts:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch education posts");
  }
};

export const getEducationPostById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8082/api/educationPost/${id}`
    ); // Fetch post by ID
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json(); // Get the post data
    return data; // Return the post data
  } catch (error) {
    console.error("Error fetching post:", error.message);
    throw new Error("Failed to fetch post");
  }
};

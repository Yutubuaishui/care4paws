import axios from 'axios'; //send HTTP requests

const BASE_URL = 'http://localhost:8080/api';

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

// Fetch posts for community module
export const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      console.log("this is the token " + token);
      const response = await fetch(`${BASE_URL}/communityPost/get-followed-posts`, {
        headers: {
          Authorization: 'Bearer ' + token, // Include token in headers
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.mypost || [];
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  
  
  // Create a new post at community module
  export const createPost = async (postData) => {
    console.log("Payload being sent:", postData);
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/communityPost/create-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};


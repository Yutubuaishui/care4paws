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
      `http://localhost:8082/api/educationPost/educationPost/${id}`
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

export const deleteEducationPost = async (postId, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:8082/api/educationPost/delete/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token for authentication
        },
      }
    );

    // Ensure the response is successful
    if (response.status !== 200) {
      throw new Error("Failed to delete post"); // Or a more specific error based on response status
    }

    return response.data; // Success response from backend
  } catch (error) {
    console.error(
      "Error deleting education post:",
      error.response?.data || error.message
    );
    throw new Error("Failed to delete education post");
  }
};

export const createCoordinator = async (formData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/api/coordinatorDonation/donateDetailsC",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      }
    );
    return response.data; // Success response from the backend
  } catch (error) {
    console.error(
      "Error creating coordinator:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create coordinator"
    );
  }
};

// export const deleteCoordinatorDetails = async (token) => {
//   try {
//     const response = await axios.delete(
//       "http://localhost:8082/api/coordinatorDonation/deleteDonateDetailsC",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token for authentication
//         },
//       }
//     );

//     if (response.status !== 200) {
//       throw new Error("Failed to delete coordinator donation details.");
//     }

//     return response.data; // Success response from backend
//   } catch (error) {
//     console.error(
//       "Error deleting coordinator donation details:",
//       error.response?.data || error.message
//     );
//     throw new Error(
//       error.response?.data?.message ||
//         "Failed to delete coordinator donation details"
//     );
//   }
// };

export const donateUser = async (donationData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/api/donation/donateUser",
      donationData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Failed to create user donation.");
    }

    return response.data; // Success response from backend
  } catch (error) {
    console.error(
      "Error creating user donation:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create user donation"
    );
  }
};

export const fetchCoordinators = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8082/api/coordinatorDonation/all",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch coordinators.");
    }

    return response.data.coordinators; // Return the coordinators array
  } catch (error) {
    console.error(
      "Error fetching coordinators:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch coordinators"
    );
  }
};

export const fetchDonationHistory = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8082/api/donation/donationHistory",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Success response from backend
  } catch (error) {
    console.error(
      "Error fetching donation history:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch donation history"
    );
  }
};

export const fetchCoordinatorDonationHistory = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8082/api/donation/coordinatorHistory",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return donations data
  } catch (error) {
    console.error(
      "Error fetching coordinator donation history:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch coordinator donation history"
    );
  }
};

export const fetchCoordinatorDetails = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8082/api/coordinatorDonation/Cdetails",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.coordinator; // Return the coordinator details
  } catch (error) {
    console.error(
      "Error fetching coordinator details:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch coordinator details"
    );
  }
};

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


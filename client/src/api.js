import axios from "axios"; //make HTTP request

const BASE_URL = "http://localhost:8080/api";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error.response ? error.response.data : { message: "Network Error" };
    }
};

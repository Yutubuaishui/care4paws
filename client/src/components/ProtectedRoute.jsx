import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const [notification, setNotification] = useState("");

    useEffect(() => {
        if (notification) {
            alert(notification); // Display the notification
            setNotification(""); // Reset after showing
        }
    }, [notification]);

    if (!token) {
        setNotification("You are not authenticated. Please log in.");
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (!allowedRoles.includes(userRole)) {
            setNotification("You do not have access to this page.");
            // Redirect based on user role
            if (userRole === "admin") return <Navigate to="/admin" />;
            if (userRole === "coordinator") return <Navigate to="/coordinator" />;
            if (userRole === "user") return <Navigate to="/user" />;
        }

        return children;
    } catch (error) {
        console.error("Invalid token:", error);
        setNotification("Invalid token. Please log in again.");
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const [decoded, setDecoded] = useState(null);
  const [notification, setNotification] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);

        if (!allowedRoles.includes(decodedToken.role)) {
          // User doesn't have the right role, show notification and redirect
          setNotification("You do not have access to the page.");
          setRedirect(true); // Trigger redirect after showing notification
        }
      } catch {
        localStorage.removeItem("token");
        setNotification("Invalid token. Please log in again.");
        setRedirect(true); // Trigger redirect after showing notification
      }
    } else {
      setNotification("Please log in to access this page.");
      setRedirect(true); // Trigger redirect after showing notification
    }
  }, [token, allowedRoles]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(""); // Clear notification after timeout
        setRedirect(true); // Trigger redirection after the alert is shown
      }, 2000); // 2-second delay
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle redirection if necessary
  if (redirect) {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    if (decoded && !allowedRoles.includes(decoded.role)) {
      return <Navigate to={`/${decoded.role}`} replace />;
    }
  }

  return (
    <>
      {notification && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            padding: "10px",
            color: "#721c24",
          }}
        >
          {notification}
        </div>
      )}
      {children}
    </>
  );
};

export default ProtectedRoute;

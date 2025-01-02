// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./components/Chatbot";
// import Homepage from "./components/Homepage";
import EditProfilePage from "./components/EditProfilePage";
import EducationPage from "./pages/EducationHub";
import CreatePostPges from "./pages/CreatePostPage";
import ContextProvider from "./content/Context";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          Protected Routes
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Routes>
                  <Route path="" element={<AdminDashboard />} />
                  {/* Add Admin-specific routes */}
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/coordinator/*"
            element={
              <ProtectedRoute allowedRoles={["coordinator"]}>
                <Routes>
                  <Route path="" element={<CoordinatorDashboard />} />
                  {/* Add Coordinator-specific routes */}
                  <Route path="/be-pet-experts" element={<EducationPage />} />
                  <Route
                    path="/be-pet-experts/create"
                    element={<CreatePostPges />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Routes>
                  <Route path="" element={<UserDashboard />} />
                  <Route path="/be-pet-experts" element={<Chatbot />} />
                  <Route path="/view-all-pets" element={<Chatbot />} />
                  <Route path="/edit-profile" element={<EditProfilePage />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;

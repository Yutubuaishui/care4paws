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

// import Homepage from "./components/Homepage";
import EditProfilePage from "./components/EditProfilePage";
import EducationPage from "./pages/EducationHub";
import CreatePostPges from "./pages/CreatePostPage";
import ContextProvider from "./content/Context";
import ViewContent from "./pages/EduViewContent";
import UserEducationHub from "./pages/UserEducationHub";
import UserEduViewContent from "./pages/UserEduViewContent";
import UserDonation from "./pages/UserDonation";
import CoordinatorDonation from "./pages/CoordinatorDonation";

import Reportpet from "./pages/LostAndFound";

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
                  <Route
                    path="/be-pet-experts/viewContent/:postId"
                    element={<ViewContent />}
                  />
                  <Route path="/donation" element={<CoordinatorDonation />} />
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
                  <Route
                    path="/be-pet-experts"
                    element={<UserEducationHub />}
                  />
                  <Route
                    path="/be-pet-experts/viewContent/:postId"
                    element={<UserEduViewContent />}
                  />
                  <Route path="/donation" element={<UserDonation />} />
                  <Route path="/edit-profile" element={<EditProfilePage />} />
                  <Route path="/reportpet" element={<Reportpet />} />
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

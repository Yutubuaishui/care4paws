import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SidebarAndNavbar from "../components/SidebarAndNavbar";
import MyPosts from "../components/Myposts";
import ReportPet from "../components/ReportPet";
import History from "../components/History";
import "./LostAndFound.css"; // Import CSS for styling

const LostAndFound = ({ token }) => {
  const [activeTab, setActiveTab] = useState("All Pet"); // Track active tab

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "All Pet":
        return <MyPosts token={token} />;
      case "Report Pet":
        return <ReportPet />;
        case "History":
          return <History token={token} />; // Pass the token if needed
      default:
        return null;
    }
  };

  return (
    <div className="lost-and-found-page">
      {/* Top Navbar */}
      <Navbar />

      {/* Bottom Section with Sidebar and Content */}
      <div className="lost-and-found-main">
        <SidebarAndNavbar />

        <div className="content-container">
          {/* Tab Bar */}
          <div className="tab-bar">
            <button
              className={`tab-button ${activeTab === "All Pet" ? "active" : ""}`}
              onClick={() => setActiveTab("All Pet")}
            >
              All Pet
            </button>
            <button
              className={`tab-button ${activeTab === "Report Pet" ? "active" : ""}`}
              onClick={() => setActiveTab("Report Pet")}
            >
              Report Pet
            </button>
            <button
              className={`tab-button ${activeTab === "History" ? "active" : ""}`}
              onClick={() => setActiveTab("History")}
            >
              History
            </button>
          </div>

          {/* Render Content Based on Active Tab */}
          <div className="tab-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default LostAndFound;

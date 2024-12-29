import React from "react";
import "./MiniNavBar.css";

function MiniNavBar({ activeTab, setActiveTab }) {

  const feedTabs = [
    { id: "myFeed", text: "My Feed" },
    { id: "exploreCommunity", text: "Explore Community" },
    { id: "event", text: "Event" },
  ];

  return (
      <div className="NavTabs">
        {feedTabs.map((tab) => (
          <button
            key={tab.id}
            className={`NavTab ${activeTab === tab.id ? "activeTab" : "inactiveTab"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.text}
          </button>
          
        ))}
      </div>
  );
}

export default MiniNavBar;

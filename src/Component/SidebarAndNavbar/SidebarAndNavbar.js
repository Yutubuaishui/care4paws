import React, { useState } from "react";
import { SidebarData } from "../SidebarData/SidebarData";

import "./SidebarAndNavbar.css";

import Cutepic from "../../assets/Login Page.png";
import MoveInIcon from "../../assets/arrow-back-icon.svg";
import MoveOutIcon from "../../assets/arrow-forward-icon.svg";

const SidebarAndNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="sidebarRow"
              // id={window.location.pathname == val.link ? "active " : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {" "}
              <div id="sidebarIcon">{val.icon}</div>
              {isSidebarOpen && <div id="sidebarTitle">{val.title}</div>}
            </li>
          );
        })}
      </ul>
      <div className="sidebarBottom">
        {isSidebarOpen && (
          <img src={Cutepic} alt="" className="sidebarBottomImage" />
        )}
      </div>
      <div
        className="sidebarToggle"
        onClick={toggleSidebar}
        title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        <img
          src={isSidebarOpen ? MoveInIcon : MoveOutIcon}
          alt="Toggle Sidebar"
        />
      </div>
    </div>
  );
};

export default SidebarAndNavbar;
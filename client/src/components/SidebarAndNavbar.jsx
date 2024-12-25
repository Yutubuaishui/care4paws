import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import "./SidebarAndNavbar.css";
import Logo from "../Assets/logo.png";
import NotificationIcon from "../Assets/notification-icon.svg";
import Chaticon from "../Assets/chat-icon.svg";
import Avatar from "../Assets/account-circle-icon.svg";
import Cutepic from "../Assets/Login Page.png";
import MoveInIcon from "../Assets/arrow-back-icon.svg";
import MoveOutIcon from "../Assets/arrow-forward-icon.svg";

const SidebarAndNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="SidebarAndNavbar">
      <div className="navbar">
        <div className="navleft">
          <img src={Logo} alt="" className="logo" />
        </div>

        <div className="navright">
          <div className="chatNoti">
            <img src={NotificationIcon} alt="" className="notiicon" />
            <img src={Chaticon} alt="" className="chaticon" />
          </div>
          <div className="propic">
            <Link to="/edit-profile">
              <img src={Avatar} alt="" className="avatar" />
            </Link>
          </div>
        </div>
      </div>
      <div className="homebottom">
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
      </div>
    </div>
  );
};

export default SidebarAndNavbar;

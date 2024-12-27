import React, { useState } from "react";
import { SidebarData } from "../components/SidebarData";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Logo from "../Assets/logo.png";
import NotificationIcon from "../Assets/notification-icon.svg";
import Chaticon from "../Assets/chat-icon.svg";
import Avatar from "../Assets/account-circle-icon.svg";
import Cutepic from "../Assets/Login Page.png";
import MoveInIcon from "../Assets/arrow-back-icon.svg";
import MoveOutIcon from "../Assets/arrow-forward-icon.svg";
import Adopt1 from "../Assets/Adopt1.png";
import Adopt2 from "../Assets/Adopt2.png";
import Adopt3 from "../Assets/Adopt3.png";
import Adopt4 from "../Assets/Adopt4.png";
import LostAndFound from "../Assets/LostAndFound2.png";
import Donation from "../Assets/donation.png";

const CoordinatorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="CoordinatorDashboard">
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
        <div className="wrappingModule">
          <div className="wrappingleft">
            <div className="wlt">
              <p className="bigText">
                Be the Light in Their Life: Help Homeless Animals Find a Safe
                Haven
              </p>
              <img src={Adopt1} alt="" className="bigTextImage" />
            </div>
            <div className="wlm">
              <p className="text">
                Looking for a loyal companion? Caesie is ready to join your
                family today!
              </p>
              <div className="galleryImages">
                <img src={Adopt2} alt="" />
                <img src={Adopt3} alt="" />
                <img src={Adopt4} alt="" />
              </div>
            </div>
            <div className="wlb">
              <Link to="/view-all-pets">
                <button>View All Pets</button>
              </Link>
              <Link to="/adopt-pet">
                <button>Adopt Them</button>
              </Link>
            </div>
          </div>
          <div className="wrappingright">
            <div className="donation">
              <p>Your Donation Saves Lives</p>
              <img src={Donation} alt="" />
              <Link to="/donate">
                <button>Donate Now</button>
              </Link>
            </div>
            <div className="lostAndFound">
              <p>Lost and Found</p>
              <div className="lafimages">
                <img src={Adopt3} alt="" />
                <img src={LostAndFound} alt="" />
              </div>
              <Link to="/lost-and-found">
                <button>View All</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
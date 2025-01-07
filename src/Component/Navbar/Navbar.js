import React from "react";
import Logo from "../../assets/Logo.png";
import NotificationIcon from "../../assets/notification-icon.svg";
import Chaticon from "../../assets/chat-icon.svg";
import Avatar from "../../assets/account-circle-icon.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navleft">
        <img src={Logo} alt="" className="logo" />
      </div>

      <div className="navright">
        <div className="chatNoti">
          <img src={NotificationIcon} alt="" className="notiicon" />
          <img src={Chaticon} alt="" className="chaticon" />
        </div>
        <div className="avatar">
          <img src={Avatar} alt="" className="avataricon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
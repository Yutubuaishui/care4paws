import React, { useContext, useState } from "react";
import "../Component/SideBarChatbot.css";
import Addicon from "../Assets/add-icon.svg";
import Chaticon from "../Assets/chat-icon.svg";
import Menuicon from "../Assets/menu-icon.svg";

const SideBarChatbot = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);
  return (
    <div className="slidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={Menuicon}
          alt=""
        />
        <div className="new-chat">
          <img src={Addicon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div className="recent-entry">
                  <img src={Chaticon} alt="" />
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBarChatbot;

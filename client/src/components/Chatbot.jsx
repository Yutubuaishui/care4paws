import React, { useState } from "react";
import Addicon from "../Assets/add-icon.svg";
import Chaticon from "../Assets/chat-icon.svg";
import Menuicon from "../Assets/menu-icon.svg";
import AddPhotoIcon from "../Assets/add-photo-icon.svg";
// import ArrowBackIcon from "../Assets/arrow-back-icon.svg";
import MicIcon from "../Assets/mic-icon.svg";
import SendIcon from "../Assets/send-icon.svg";

const Chatbot = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className="Chatbot">
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
              <div className="recent-entry">
                <img src={Chaticon} alt="" />
                <p>What does dog eat?</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="ChatbotMain">
        <div className="chattop">
          <p>Chatbot</p>
        </div>
        <div className="containerchat">
          <div className="chatmiddle">
            <p>
              <span>How can i help you?</span>
            </p>
          </div>
        </div>
        <div className="containerBottom">
          <div className="chatbottom">
            <div className="search-box">
              <input type="text" placeholder="Enter a prompt here" />
              <div>
                <img src={AddPhotoIcon} alt="" />
                <img src={MicIcon} alt="" />
                <img src={SendIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

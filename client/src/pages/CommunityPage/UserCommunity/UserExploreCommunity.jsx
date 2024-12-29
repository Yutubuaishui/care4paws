import React, { useState } from "react";
import "./UserExploreCommunity.css";
import PetCareQuiz from "../../../components/CommunityComponent/QuizChallenge"
import GameInterface from "../../../components/CommunityComponent/Game";
import TrendingSection from "../../../components/CommunityComponent/Trending";

const ExploreCommunity = () => {
  const recommendations = [
    { id: 1, username: "pet_lover123", avatar: "avatar1.png" },
    { id: 2, username: "furBabyCuddles", avatar: "avatar2.png" },
  ];

  const campaigns = [
    { id: 1, image: "campaign1.jpg", description: "Post a tree photo to plant a tree!" },
    { id: 2, image: "campaign2.jpg", description: "Share your eco-friendly pet tips!" },
  ];

  const leaderboard = [
    { id: 1, username: "GreenFido", avatar: "avatar3.png", badge: "Eco-Warrior" },
    { id: 2, username: "NaturePaws", avatar: "avatar4.png", badge: "Sustainability Champion" },
  ];

  const trendingPosts = [
    { id: 1, image: "trending1.jpg", caption: "Adorable moments with pets!" },
    { id: 2, image: "trending2.jpg", caption: "Eco-friendly pet accessories!" },
  ];

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const ChatbotWindow = () => (
    <div className="ChatbotWindow">
      <p>Hello! How can I assist you?</p>
      {/* Add chatbot interactions here */}
    </div>
  );

  return (
    <div className="ExploreCommunity">
      {/* <PetCareQuiz/> */}
      {/* Left Section: Game Area */}
      {/* <div className="GameArea">
        <h2>Pet Adventure Game</h2>
        <div className="Leaderboard">
          {leaderboard.map((user) => (
            <div className="LeaderboardItem" key={user.id}>
              <img src={user.avatar} alt={`${user.username}'s avatar`} />
              <span className="username">{user.username}</span>
              <span className="badge">{user.badge}</span>
            </div>
          ))}
        </div>
        <div className="GameStats">
          <p>Complete challenges to climb the leaderboard!</p>
        </div>
      </div> */}

      {/* Middle Section: Trending Feed */}
      {/* <div className="TrendingContent">
        <h2>Trending Now</h2>
        <div className="TrendingFeed">
          {trendingPosts.map((post) => (
            <div className="PostItem" key={post.id}>
              <img src={post.image} alt="Trending post" />
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Right Section: Chatbot and Campaign */}
      {/* <div className="ChatbotAndCampaign">
        <div className="Chatbot">
          <img
            src="chatbot-avatar.png"
            alt="Chatbot"
            className="ChatbotAvatar"
            onClick={toggleChatbot}
          />
          {isChatOpen && <ChatbotWindow />}
        </div>

        <div className="Campaigns">
          <h3>Active Campaigns</h3>
          {campaigns.map((camp) => (
            <div className="CampaignItem" key={camp.id}>
              <img src={camp.image} alt="Campaign" />
              <p>{camp.description}</p>
              <button>Join</button>
            </div>
          ))}
        </div>
      </div> */}
      <div className="ExploreContent">
        <div className="GameSection">
          <GameInterface/>
        </div>
        <TrendingSection />
      </div>
      
    </div>
  );
};

export default ExploreCommunity;

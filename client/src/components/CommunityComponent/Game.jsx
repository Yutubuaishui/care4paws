import React, { useState } from "react";
import "./Game.css";

// Mock Data
const leaderboard = [
  { username: "PetLover", coins: 500, items: 10, care: 95 },
  { username: "FurMama", coins: 350, items: 7, care: 80 },
  { username: "EcoPet", coins: 700, items: 12, care: 99 },
];

const trendingPosts = [
  { id: 1, image: "post1.jpg", likes: 150, caption: "Adopt, don't shop!" },
  { id: 2, image: "post2.jpg", likes: 120, caption: "Sustainable pet care tips!" },
];

const campaigns = [
  { id: 1, title: "Plant a Tree", description: "Share a tree photo to plant one!" },
  { id: 2, title: "Eco Tips", description: "Post eco-friendly pet hacks." },
];

// Component
const GameInterface = () => {
  const [currentScene, setCurrentScene] = useState("virtualPet");
  const [petStats, setPetStats] = useState({
    hunger: 50,
    cleanliness: 80,
  });
  const [coins, setCoins] = useState(100);

  const handleFeedPet = () => {
    if (coins >= 10) {
      setPetStats((prev) => ({ ...prev, hunger: Math.min(prev.hunger + 20, 100) }));
      setCoins((prev) => prev - 10);
    } else {
      alert("Not enough coins!");
    }
  };

  const handleCleanPet = () => {
    setPetStats((prev) => ({ ...prev, cleanliness: Math.min(prev.cleanliness + 20, 100) }));
  };

  const renderScene = () => {
    switch (currentScene) {
      case "virtualPet":
        return (
          <div className="VirtualPetScene">
            <h3>Your Virtual Pet</h3>
            <div className="PetStats">
              <p>Hunger: {petStats.hunger}%</p>
              <p>Cleanliness: {petStats.cleanliness}%</p>
            </div>
            <button onClick={handleFeedPet}>Feed (-10 Coins)</button>
            <button onClick={handleCleanPet}>Clean</button>
          </div>
        );
      case "exchange":
        return <h3>Exchange Scene: Coming Soon!</h3>;
      case "quiz":
        return <h3>Quiz Scene: Coming Soon!</h3>;
      case "miniGames":
        return <h3>Mini Games Scene: Coming Soon!</h3>;
      default:
        return <h3>Welcome to the Game</h3>;
    }
  };

  return (
    <div className="GameInterface">
      <div className="GameWindow">
        <div className="GameNav">
          <button onClick={() => setCurrentScene("virtualPet")}>Virtual Pet</button>
          <button onClick={() => setCurrentScene("exchange")}>Exchange</button>
          <button onClick={() => setCurrentScene("quiz")}>Quiz</button>
          <button onClick={() => setCurrentScene("miniGames")}>Mini Games</button>
        </div>
        <div className="SceneContainer">{renderScene()}</div>
      </div>
      <div className="Leaderboard">
        <h3>Leaderboard</h3>
        {leaderboard.map((user, index) => (
          <div key={index} className="LeaderboardItem">
            <p>{user.username}</p>
            <p>Coins: {user.coins}</p>
            <p>Items: {user.items}</p>
            <p>Care: {user.care}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameInterface;

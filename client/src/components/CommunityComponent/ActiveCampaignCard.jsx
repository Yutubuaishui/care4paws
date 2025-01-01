import React, { useState } from "react";
import "./ActiveCampaignCard.css";

const ActiveCampaign = ({ title, description, postsCount, onViewPosts, onAddPost }) => {
  return (
    <div className="ActiveCampaign">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="campaign-stats">
        <p><strong>{postsCount}</strong> people have joined this campaign!</p>
      </div>
      <div className="campaign-buttons">
        <button onClick={onViewPosts}>View Posts</button>
        <button onClick={onAddPost}>Add Yours</button>
      </div>
    </div>
  );
};

const ActiveCampaignCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleViewPosts = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleAddPost = () => {
    console.log("Prompt user to add a new post!");
  };

  const campaigns = [
    {
      title: "Adopt a Friend Month",
      description: "Encouraging pet adoptions and fostering this month!",
      postsCount: 120,
    },
    {
        title: "Adopt a Friend Month",
        description: "Encouraging pet adoptions and fostering this month!",
        postsCount: 120,
      },
  ];

  return (
    <>
      <div className="ActiveCampaigns">
        {campaigns.map((campaign, index) => (
          <ActiveCampaign
            key={index}
            title={campaign.title}
            description={campaign.description}
            postsCount={campaign.postsCount}
            onViewPosts={() => handleViewPosts(campaign)}
            onAddPost={handleAddPost}
          />
        ))}
      </div>

      {isModalOpen && selectedCampaign && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCampaign.title} - Posts</h2>
            <p>List of posts for the campaign...</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      </>
  );
};

export default ActiveCampaignCard;

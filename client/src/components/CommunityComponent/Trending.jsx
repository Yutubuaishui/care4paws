import React from 'react'
import "./Trending.css"
import { PostCard } from './PostCard';
import Logo from "../../assets/logo.png"
import ActiveCampaignCard from './ActiveCampaignCard';

const TrendingSection = () => {

      const campaigns = [
        { id: 1, title: "Plant a Tree", description: "Share a tree photo to plant one!" },
        { id: 2, title: "Eco Tips", description: "Post eco-friendly pet hacks." },
      ];

    return (
      <div className="TrendingSection">
          <div className="ActiveCampaigns">
          <h3>Active Campaigns</h3>
          <ActiveCampaignCard />
        </div>
        <div className="TrendingPosts">
          <h3>Trending Posts</h3>
          {/* <PostCard
                    key="1"
                    avatarSrc= {Logo} // Provide a valid image path
                    username="user123"
                    displayName="User OneTwoThree"
                    imageSrc={Logo} // Provide a valid image path
                    description="This is a long post description to showcase text wrapping and styling."
                    timestamp="10:30 AM"
                    date="2024-12-27"
                    likes="123"
                    comments="45"
                  />
                  <PostCard
                    key="1"
                    avatarSrc= {Logo} // Provide a valid image path
                    username="user123"
                    displayName="User OneTwoThree"
                    imageSrc={Logo} // Provide a valid image path
                    description="This is a long post description to showcase text wrapping and styling."
                    timestamp="10:30 AM"
                    date="2024-12-27"
                    likes="123"
                    comments="45"
                  /> */}
        </div>
      </div>
    );
  };
  
  export default TrendingSection;
  
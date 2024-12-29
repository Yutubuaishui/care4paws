import React from 'react'
import "./Trending.css"

const TrendingSection = () => {

    const trendingPosts = [
        { id: 1, image: "post1.jpg", likes: 150, caption: "Adopt, don't shop!" },
        { id: 2, image: "post2.jpg", likes: 120, caption: "Sustainable pet care tips!" },
      ];

      const campaigns = [
        { id: 1, title: "Plant a Tree", description: "Share a tree photo to plant one!" },
        { id: 2, title: "Eco Tips", description: "Post eco-friendly pet hacks." },
      ];

    return (
      <div className="TrendingSection">
        <div className="TrendingPosts">
          <h3>Trending Posts</h3>
          {trendingPosts.map((post) => (
            <div key={post.id} className="TrendingPostItem">
              <img src={post.image} alt={post.caption} />
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
        <div className="ActiveCampaigns">
          <h3>Active Campaigns</h3>
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="CampaignItem">
              <h4>{campaign.title}</h4>
              <p>{campaign.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TrendingSection;
  
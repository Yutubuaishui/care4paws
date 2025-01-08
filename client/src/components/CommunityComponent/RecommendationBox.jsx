import React from 'react';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa';
import './RecommendationBox.css';

function RecommendationBox({ recommendations, onAdd, onRemove, followedIds }) {
  console.log('Recommendations:', recommendations);
  console.log('Followed IDs:', followedIds);
  return (
    <div className="recommendation-box">
      {recommendations.map((recommendation) => (
        <div key={recommendation._id} className="recommendation-card">
          <div className="avatar-container">
            <img src={recommendation.avatar} alt={`${recommendation.username}'s avatar`} className="avatar" />
          </div>
          <div className="details-container">
            <div className="name">{recommendation.username}</div>
            <div className="description">{recommendation.description}</div>
          </div>
          <div className="add-icon-container" title={followedIds.includes(recommendation._id) ? "Unfollow" : "Follow"}>
            {followedIds.includes(recommendation._id) ? (
              <FaUserMinus className="remove-icon" onClick={() => onRemove(recommendation._id)} />
            ) : (
              <FaUserPlus className="add-icon" onClick={() => onAdd(recommendation._id)} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecommendationBox;
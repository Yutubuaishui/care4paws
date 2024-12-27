import React from 'react';
import './PostCard.css';

export const PostCard = ({ 
  avatarSrc, 
  username, 
  displayName, 
  imageSrc, 
  description, 
  timestamp, 
  date,
  likes,
  comments 
}) => {
  return (
    <div className="postCard">
      <div className="postHeader">
        <img 
          src={avatarSrc} 
          alt={`${displayName}'s avatar`} 
          className="postAvatar"
        />
        <div className="userInfo">
          <div className="displayName">{displayName}</div>
          <div className="username">{username}</div>
        </div>
      </div>
      
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={description} 
          className="postImage"
        />
      )}
      
      <div className="postContent">
        <div className="description">{description}</div>
        <div className="postMeta">
          <div className="timestamp">{timestamp}</div>
          <div className="dateSeparator" />
          <div className="date">{date}</div>
        </div>
        <div className="interactions">
          <button className="interactionButton" aria-label={`${likes} likes`}>
            <img src="like-icon-url" alt="" className="interactionIcon" />
            <span>{likes}</span>
          </button>
          <button className="interactionButton" aria-label={`${comments} comments`}>
            <img src="comment-icon-url" alt="" className="interactionIcon" />
            <span>{comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

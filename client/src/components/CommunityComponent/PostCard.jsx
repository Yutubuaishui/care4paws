import React from 'react';
import './PostCard.css';
import { FaRegCommentDots } from "react-icons/fa6";
import { LuDog } from "react-icons/lu";

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
  const handleLikeClick = () => {
    console.log('Like button clicked');
  };

  return (
    <div className="postCard">
      <div className="postHeader">
        <img 
          src={avatarSrc} 
          alt={`${displayName}'s avatar`} 
          className="postAvatar"
        />
        <div className="userInfo">
          {/* <div className="displayName">{displayName}</div> */}
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
            <LuDog
              className="interactionButton"
              aria-label={`${likes} likes`}
              size={30} // Adjust the size of the icon
              onClick={handleLikeClick} // Add click handler
            />
            <span>{likes}</span>
            <FaRegCommentDots
              className="interactionButton"
              aria-label={`${comments} comments`}
              size={30} // Adjust the size of the icon
              onClick={handleLikeClick} // Add click handler
            />
            <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

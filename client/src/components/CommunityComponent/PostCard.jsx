import {React, useState, useEffect} from 'react';
import './PostCard.css';
import { FaRegCommentDots } from "react-icons/fa6";
import { LuDog } from "react-icons/lu";
import { likePost, unlikePost } from '../../api';

export const PostCard = ({ 
  _id,
  avatarSrc, 
  username, 
  displayName, 
  imageSrc, 
  description, 
  timestamp, 
  date,
  likes,
  comments,
  userLikes,
  openModal,
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if the user has liked this post
    const currentUserId = localStorage.getItem("userId"); // Assuming the user ID is stored in localStorage
    setIsLiked(userLikes.includes(currentUserId));
  }, [userLikes]);

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // User is unliking the post
        setIsLiked(false);
        setLikeCount(prevCount => prevCount - 1);
        await unlikePost(_id); // Call the API to unlike the post
      } else {
        // User is liking the post
        setIsLiked(true);
        setLikeCount(prevCount => prevCount + 1);
        await likePost(_id); // Call the API to like the post
      }
    } catch (error) {
      console.error("Error toggling like/unlike:", error);

      // Revert optimistic update on error
      setIsLiked(!isLiked);
      setLikeCount(prevCount => (isLiked ? prevCount + 1 : prevCount - 1));
    }
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
      <div className='image-box'>
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={description}
          className="postImage"
        />
      )} 
      </div>      
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
              style={{ color: isLiked ? "red" : "black" }}
              aria-label={`${likeCount} likes`}
              size={30} // Adjust the size of the icon
              onClick={handleLikeClick} // Add click handler
            />
            <span>{likeCount}</span>
            <FaRegCommentDots
              className="interactionButton"
              aria-label={`${comments} comments`}
              size={30} // Adjust the size of the icon
              onClick={() => openModal(_id)} // Add click handler
            />
            <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

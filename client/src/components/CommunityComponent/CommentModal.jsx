import React, { useState, useEffect } from "react";
import './CommentModal.css';
import { fetchPostComments, createComment } from "../../api";

function CommentModal({ post, updateCommentCount, onClose }) {
  const { _id, avatarSrc, username, caption, photo } = post;
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [parentCommentId, setParentCommentId] = useState(null);

  // Fetch post and comments when modal opens
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await fetchPostComments(_id);
        console.log("fetchedComments: ", fetchedComments);
        setComments(fetchedComments);
        updateCommentCount(fetchedComments.length); // Update comment count
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [_id, updateCommentCount]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = {
      content: newComment,
      author: localStorage.getItem('userId'), // Ensure author ID is included
      postId: _id,
      parentCommentId: parentCommentId, // If replying, set the parent comment
    };

    try {
      await createComment(newCommentData);
      setNewComment('');
      setParentCommentId(null); // Reset the reply state after submission
      const fetchedComments = await fetchPostComments(_id); // Reload comments after posting
      setComments(fetchedComments);
      updateCommentCount(fetchedComments.length); // Update comment count
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const renderComments = (comments = [], parentId = null) => {
    return comments
      .filter(comment => comment.parentCommentId === parentId)
      .map(comment => (
        <div key={comment._id} className={`comment ${parentId ? 'reply' : ''}`}>
          <div className="comment-content">
            <img src={comment.author?.avatarSrc || "/default-avatar.png"} alt={comment.author?.username || "Anonymous"} />
            <div>
              <p>{comment.author?.username || "Anonymous"}</p>
              <p>{comment.content}</p>
            </div>
          </div>
          <button onClick={() => setParentCommentId(comment._id)}>Reply</button>
          {renderComments(comments, comment._id)}
        </div>
      ));
  };

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
    <div className="comment-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-post">
          <h2>{username}</h2>
          <img src={avatarSrc} alt={username}></img>
          <p>{caption}</p>
          {photo && <img src={photo} alt={caption} />}
        </div>
        <div className="comments-section">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Submit</button>
          </form>
          <div className="comments-section">
            {renderComments(comments)}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CommentModal;
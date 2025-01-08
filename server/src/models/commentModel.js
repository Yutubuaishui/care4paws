const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "communityPost",
      required: true, // Link to the related post
    },
    parentCommentId: {
      type: mongoose.Types.ObjectId,
      ref: "comment", // Link to the parent comment (null if top-level comment)
      default: null,
    },
    timestamp: { 
        type: String, 
        required: true },
    date: { 
        type: String, 
        required: true },
  });

module.exports = mongoose.model('comment',commentSchema)
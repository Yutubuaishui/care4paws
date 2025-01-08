/*define endpoints and controllers for community module*/

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const verifyToken = require("../middlewares/authMiddleware");
require("../models/communityPostModel");
const communityPost =  mongoose.model("communityPost");
require("../models/commentModel");
const Comment = mongoose.model("comment");
require("../models/userModel");
const User = mongoose.model("User");
require("../models/eventModel");
const Event = mongoose.model("Event");


router.post('/create-post', verifyToken, async (req, res) => {
    console.log("Request body:", req.body);
    console.log("User from token:", req.user); // Check if user has _id

    const { caption, photo } = req.body;

    if (!caption || !photo) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    if (!photo.startsWith("data:image/")) {
        return res.status(400).json({ error: "Invalid photo format" });
    }

    try {
        const post = new communityPost({
            caption,
            photo,
            timestamp: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            likes: 0,
            comments: 0,
            postedBy: req.user._id,
        });
        post.save().then(result=>{
            res.json({post:result})})
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/fetch-all-post', verifyToken, async(req, res) => {
    communityPost
        .find({ postedBy: req.user._id })
        .populate("postedBy", "username")
        .populate("likes", "_id") // Populate the likes field to get the full array
        .then(posts => {
            // Transform the posts to match frontend structure
            const transformedPosts = posts.map(post => ({
                _id: post._id,
                avatarSrc: post.postedBy.avatarSrc?.avatarSrc || "",
                username: post.postedBy.username,
                photo: post.photo, 
                caption: post.caption,
                timestamp: post.timestamp,
                date: post.date,
                likes: Array.isArray(post.likes) ? post.likes.length : 0,
                userLikes: post.likes.map(user => user._id),
                comments: post.comments,
            }));
        res.json({ posts: transformedPosts });
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        });
      });

router.get('/fetch-post/:id', verifyToken, async (req, res) => {
    const { id } = req.params; // Extract the post ID from the URL params
    try {
        const post = await communityPost.findById(id).populate('postedBy', 'avatarSrc username'); // Use findById to get the post by ID

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Transform the post to match frontend structure
        const transformedPost = {
            _id: post._id,
            avatarSrc: post.postedBy.avatarSrc || "", // Fallback if avatarSrc is not available
            username: post.postedBy.username,
            photo: post.photo,
            caption: post.caption,
            timestamp: post.timestamp,
            date: post.date,
            likes: Array.isArray(post.likes) ? post.likes.length : 0,
            userLikes: post.likes.map(user => user._id),
            comments: post.comments,
        };

        res.json({ post: transformedPost }); // Return the transformed post
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// router.get('/fetch-userfeed/:userId', verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('following', '_id');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userIds = [user._id, ...user.following.map(followedUser => followedUser._id)];
//     const posts = await communityPost.find({ postedBy: { $in: userIds } }).sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });

router.get('/fetch-userfeed/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('following', '_id');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userIds = [user._id, ...user.following.map(followedUser => followedUser._id)];
    const posts = await communityPost.find({ postedBy: { $in: userIds } })
      .populate('likes', '_id') // Populate likes field
      .populate('postedBy', 'username avatarSrc') // Populate author field with username and avatarSrc
      .sort({ createdAt: -1 });

    // Transform the posts
    const transformedPosts = posts.map(post => ({
      _id: post._id,
      caption: post.caption,
      photo: post.photo,
      timestamp: post.timestamp,
      date: post.date,
      likes: Array.isArray(post.likes) ? post.likes.length : 0,
      userLikes: Array.isArray(post.likes) ? post.likes.map(user => user._id) : [],
      comments: Array.isArray(post.comments) ? post.comments.length : 0,
      postedBy: post.postedBy ? post.postedBy._id : null,
      username: post.postedBy ? post.postedBy.username : null,
      avatarSrc: post.postedBy ? post.postedBy.avatarSrc : null,
    }));

    res.json({ posts: transformedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/fetch-userpost/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User1:", user);
    const posts = await communityPost.find({ postedBy: user._id })
      .populate('likes', '_id') // Populate likes field
      .populate('postedBy', 'username avatarSrc') // Populate author field with username and avatarSrc
      .sort({ createdAt: -1 });

    // Transform the posts
    const transformedPosts = posts.map(post => ({
      _id: post._id,
      caption: post.caption,
      photo: post.photo,
      timestamp: post.timestamp,
      date: post.date,
      likes: Array.isArray(post.likes) ? post.likes.length : 0,
      userLikes: Array.isArray(post.likes) ? post.likes.map(user => user._id) : [],
      comments: Array.isArray(post.comments) ? post.comments.length : 0,
      postedBy: post.postedBy ? post.postedBy._id : null,
      username: post.postedBy ? post.postedBy.username : null,
      avatarSrc: post.postedBy ? post.postedBy.avatarSrc : null,
    }));

    res.json({ posts: transformedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


// router.get('/allPost',verifyToken,(req,res)=>{
//     communityPost.find()
//     .populate("postedBy","_id name")
//     //.populate("comments.postedBy","_id name")
//     .sort('-createdAt')
//     .then((posts)=>{
//         res.json({posts})
//     }).catch(err=>{
//         console.log(err)
//     })
    
// })

// router.get('/get-followed-posts', verifyToken, (req, res) => {
//     communityPost
//       .find({ /* Filter for followed posts */ })
//       .populate("postedBy", "id username role") // Adjust as per your schema
//       .then(posts => res.json(posts))
//       .catch(err => console.log(err));
//   });
  

router.put('/like-post', verifyToken, async (req, res) => {
    const { _id } = req.body;
    console.log("Post Id: ", _id);  
    try {
      // Find the post and add the user's ID to the likes array if not already present
      const updatedPost = await communityPost.findByIdAndUpdate(
        _id,
        { $addToSet: { likes: req.user._id } }, // $addToSet ensures no duplicates
        { new: true } // Return the updated document
      ).populate("likes", "_id"); // Optionally populate likes if needed
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(updatedPost); // Return the updated post
    } catch (error) {
      console.error("Error liking the post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

router.put('/unlike-post',verifyToken, async(req,res)=>{
    const { _id } = req.body;
    console.log("Post Id: ", _id); 
    try {
        // Remove the user's ID from the likes array
        const updatedPost = await communityPost.findByIdAndUpdate(
            _id,
            { $pull: { likes: req.user._id } }, // $pull removes the user's ID
            { new: true } // Return the updated document
        ).populate("likes", "_id"); // Optionally populate likes if needed

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(updatedPost); // Return the updated post
    } catch (error) {
        console.error("Error unliking the post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get("/fetch-comments/:postId", async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Fetch all comments for the post
      const comments = await Comment.find({ postId })
      .populate("author", "username avatarSrc") // Populate only username and avatarSrc
      .exec();
  
      // Organize comments into a nested structure
      const nestedComments = comments.reduce((acc, comment) => {
        if (!comment.parentCommentId) {
          acc.push({ ...comment.toObject(), replies: [] });
        } else {
          const parentComment = acc.find(
            (parent) => parent._id.toString() === comment.parentCommentId.toString()
          );
          if (parentComment) {
            parentComment.replies = parentComment.replies || [];
            parentComment.replies.push(comment.toObject());
          }
        }
        return acc;
      }, []);
  
      res.status(200).json(nestedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  router.post("/post-comment", async (req, res) => {
    const { content, author, postId, reply } = req.body;
  
    // Validate required fields
    if (!content || !author || !postId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      // Create the new comment
      const comment = new Comment({
        content,
        author,
        postId,
        reply: reply || null, // Set parentCommentId as null if not provided
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      });
  
      const savedComment = await comment.save();
  
      // Add the comment's ID to the associated post's comments array
      await communityPost.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });
  
      res.status(201).json({ comment: savedComment });
    } catch (err) {
      console.error("Error creating comment:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get('/comments/count/:postId', async (req, res) => {
    try {
      const count = await Comment.countDocuments({ postId: req.params.postId });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comment count', error: error.message });
    }
  });

  router.delete('/delete-post/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Delete the post
      const deletedPost = await communityPost.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Delete associated comments
      await Comment.deleteMany({ postId });
  
      res.status(200).json({ message: 'Post and associated comments deleted successfully' });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

  router.get('/fetch-coordinators', async (req, res) => {
    try {
      const coordinators = await User.find({ role: 'coordinator' });
      res.json(coordinators);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

  router.post('/create-event', verifyToken, async (req, res) => {
    console.log("Request body:", req.body);
    console.log("User from token:", req.user); // Check if user has _id

    const {
      eventName,
      eventPic,
      eventTags,
      eventType,
      eventStatus,
      eventDate,
      eventTime,
      eventLocation,
      eventFee,
      eventDescription,
      eventOrganizer,
    } = req.body;

    if (!eventName || !eventPic || !eventTags || !eventType || !eventStatus || !eventDate || !eventTime || !eventLocation || !eventFee || !eventDescription || !eventOrganizer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!eventPic.startsWith("data:image/")) {
        return res.status(400).json({ error: "Invalid photo format" });
    }

    try {
      const event = new Event({
        eventName,
        eventPic,
        eventTags,
        eventType,
        eventStatus,
        eventDate,
        eventTime,
        eventLocation,
        eventFee,
        eventDescription,
        eventOrganizer: req.user._id,
        participantsCount: 0, // Initialize participants count to 0
      });
      const savedEvent = await event.save();
      console.log("savedEvent: ", savedEvent);
      res.json({ event: savedEvent });
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/fetch-events', verifyToken, async (req, res) => {
  try {
      const events = await Event.find({ eventStatus: { $ne: 'Done' } }).populate('eventOrganizer', 'username avatarSrc');
      const transformedEvents = events.map(event => ({
        id: event._id,
        organizerPic: event.eventOrganizer.avatarSrc,
        organizerName: event.eventOrganizer.username,
        eventTitle: event.eventName,
        eventDate: new Date(event.eventDate).toLocaleDateString(),
        eventTime: event.eventTime,
        eventLocation: event.eventLocation,
        eventFee: event.eventFee,
        participantsCount: event.participantsCount,
        eventPic: event.eventPic,
        eventTags: event.eventTags,
        eventType: event.eventType,
        registrationStatus: event.eventStatus,
        eventDescription: event.eventDescription,
    }));
    res.json(transformedEvents);
  } catch (err) {
      console.error("Error fetching events:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/fetch-coordinator-events', verifyToken, async (req, res) => {
  try {
      const events = await Event.find({ eventOrganizer: req.user._id }).populate('eventOrganizer', 'username avatarSrc');
      const transformedEvents = events.map(event => ({
        id: event._id,
        organizerPic: event.eventOrganizer.avatarSrc,
        organizerName: event.eventOrganizer.username,
        eventTitle: event.eventName,
        eventDate: new Date(event.eventDate).toLocaleDateString(),
        eventTime: event.eventTime,
        eventLocation: event.eventLocation,
        eventFee: event.eventFee,
        participantsCount: event.participantsCount,
        eventPic: event.eventPic,
        eventTags: event.eventTags,
        eventType: event.eventType,
        registrationStatus: event.eventStatus,
        eventDescription: event.eventDescription,
    }));
    res.json(transformedEvents);
  } catch (err) {
      console.error("Error fetching coordinator events:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router
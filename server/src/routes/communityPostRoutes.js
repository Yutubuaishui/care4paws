/*define endpoints and controllers for community module*/

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const verifyToken = require("../middlewares/authMiddleware");
require("../models/communityPostModel");
const communityPost =  mongoose.model("communityPost");
require("../models/commentModel");
const Comment = mongoose.model("comment");


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
            })
        );

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
      const comments = await Comment.find({ postId });
  
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
    const { context, author, postId, parentCommentId } = req.body;
  
    // Validate required fields
    if (!context || !author || !postId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      // Create the new comment
      const comment = new Comment({
        context,
        author,
        postId,
        parentCommentId: parentCommentId || null, // Set parentCommentId as null if not provided
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


// router.put('/comment',verifyToken,(req,res)=>{
//     const comment = {
//         text:req.body.text,
//         postedBy:req.user._id
//     }
//     communityPost.findByIdAndUpdate(req.body.postId,{
//         $push:{comments:comment}
//     },{
//         new:true
//     })
//     .populate("comments.postedBy","_id name")
//     .populate("postedBy","_id name")
//     .exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })

// router.delete('/deletePost/:postId',verifyToken,(req,res)=>{
//     communityPost.findOne({_id:req.params.postId})
//     .populate("postedBy","_id")
//     .exec((err,post)=>{
//         if(err || !post){
//             return res.status(422).json({error:err})
//         }
//         if(post.postedBy._id.toString() === req.user._id.toString()){
//               post.remove()
//               .then(result=>{
//                   res.json(result)
//               }).catch(err=>{
//                   console.log(err)
//               })
//         }
//     })
// })

module.exports = router
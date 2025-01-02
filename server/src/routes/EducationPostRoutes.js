// In educationPostRoutes.js (or a similar file)
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/authMiddleware"); // Middleware to verify JWT token

// Import the EducationPost model
require("../models/EducationPostModel");
const EducationPost = mongoose.model("EducationPost");

// Create an education post
router.post("/create", verifyToken, (req, res) => {
  const { title, content, photo } = req.body; // Extract post data from request body

  // Validate and sanitize input if necessary
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  // Create a new education post
  const newPost = new EducationPost({
    title,
    content,
    photo: req.body.photo || "no photo", // Handle photo (optional)
    postedBy: {
      id: req.user.id, // The user ID from JWT
      username: req.user.username, // The username from JWT
      role: req.user.role, // The role from JWT
    },
  });

  newPost
    .save()
    .then((post) => {
      res
        .status(201)
        .json({ message: "Education post created successfully", post });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error creating education post", error: err.message });
    });
});

module.exports = router;

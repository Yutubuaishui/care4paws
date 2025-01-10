import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEducationPosts } from "../api"; // Import the API function to get posts
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./EducationHub.css";

const colors = [
  "#FCFFC1",
  "#FFE893",
  "#FBB4A5",
  "#FFD700",
  "#F5EFFF",
  "#E5D9F2",
  "#CDC1FF",
  "#D9EAFD",
  "#C6E7FF",
];

// Function to get a random color from the predefined colors
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const EducationHub = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const data = await getEducationPosts(); // Fetch posts from API
        setPosts(data); // Store posts in state
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="EducationHub">
      <Navbar />

      <div className="EducationHubBottom">
        <Sidebar />

        <div>
          <h2>Education Hub</h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            <div className="posts-container">
              {posts.map((post) => (
                <Link
                  to={`/coordinator/be-pet-experts/viewContent/${post._id}`}
                  key={post._id}
                  className="post-link"
                >
                  <div
                    key={post._id}
                    className="post-card"
                    style={{ backgroundColor: getRandomColor() }} // Apply random color to each card
                  >
                    <div class="post-card-content">
                      <h3>{post.title}</h3>
                      <div className="posted-by">
                        <p>Posted by: {post.postedBy.username}</p>
                        {/* <p>Role: {post.postedBy.role}</p> */}
                        {/* Optionally include a snippet of content */}
                        {/* <p>{post.content.slice(0, 100)}...</p> */}
                        {/* <p>{post.content}</p> */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <button className="add-post-button">
        <Link to="/coordinator/be-pet-experts/create">+</Link>
      </button>
    </div>
  );
};

export default EducationHub;

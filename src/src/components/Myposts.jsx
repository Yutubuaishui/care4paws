import React, { useEffect, useState } from "react";
import "./Mypost.css"; // Import the CSS for styling
import { getUserPosts } from "../api"; // Import your API call

const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getUserPosts(token);
        setPosts(data.lostReports || []); // Use a default empty array
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        posts.map((post, index) => (
          <div className="post-card" key={index}>
            <h3>{post.petName || "Unnamed Pet"}</h3>
            <p>
              <strong>Type:</strong> {post.petType}
            </p>
            <p>
              <strong>Gender:</strong> {post.petGender}
            </p>
            <p>
              <strong>Description:</strong> {post.description}
            </p>
            <p>
              <strong>Location:</strong> {post.location}
            </p>
            <button>View Details</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;

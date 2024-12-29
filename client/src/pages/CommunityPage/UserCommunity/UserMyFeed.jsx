import React, { useState, useEffect } from "react";
import { PostCard } from "../../../components/CommunityComponent/PostCard";
import Logo from "../../../assets/logo.png";

function MyFeed() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   // Simulated API Call to fetch posts
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch('/api/get-followed-posts'); // Replace with your API endpoint
  //       const data = await response.json();
  //       setPosts(data);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  return (
    <>
      {/* <h2>Welcome to My Feed</h2>
      <p>Here is your personalized feed!</p> */}
      {/* {posts.length > 0 ? (
        posts.map((post, index) => (
          <PostCard
            key={index}
            avatarSrc={post.avatarSrc}
            username={post.username}
            displayName={post.displayName}
            imageSrc={post.imageSrc}
            description={post.description}
            timestamp={post.timestamp}
            date={post.date}
            likes={post.likes}
            comments={post.comments}
          />
        ))
      ) : ( */}
        {/* <p>No posts to display.</p> */}
        <PostCard
          key="1"
          avatarSrc= {Logo} // Provide a valid image path
          username="user123"
          displayName="User OneTwoThree"
          imageSrc={Logo} // Provide a valid image path
          description="This is a long post description to showcase text wrapping and styling."
          timestamp="10:30 AM"
          date="2024-12-27"
          likes="123"
          comments="45"
        />
        <PostCard
          key="1"
          avatarSrc= {Logo} // Provide a valid image path
          username="user123"
          displayName="User OneTwoThree"
          imageSrc={Logo} // Provide a valid image path
          description="This is a long post description to showcase text wrapping and styling."
          timestamp="10:30 AM"
          date="2024-12-27"
          likes="123"
          comments="45"
        />

      {/* )} */}
    </>
  );
}

export default MyFeed;

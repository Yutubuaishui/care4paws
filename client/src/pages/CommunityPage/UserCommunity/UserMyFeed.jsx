import React, { useState, useEffect } from "react";
import { PostCard } from "../../../components/CommunityComponent/PostCard";
import Logo from "../../../assets/logo.png";
import "./UserMyFeed.css";
import { fetchPosts, createPost } from "../../../api";
import { BiSolidDog } from "react-icons/bi";

function MyFeed() {
    // State to track new post content
    const [newPost, setNewPost] = useState({
      text: "",
      image: null,
    });
  
    // State to retrieve list of posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const loadPosts = async () => {
        const posts = await fetchPosts();
        setPosts(posts);
      };
    
      loadPosts();
    }, []);
  
    // Handle text changes in the new post form
    const handlePostChange = (e) => {
      console.log(e);
      const { name, value } = e.target; //HTML element that triggered the event, destructing -> name = text, value = user input
      setNewPost({ ...newPost, [name]: value }); //dynamically updates all field
    };            //spread operator, copy all properties from newPost
  
    // Handle image upload
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
          setNewPost({ ...newPost, image: reader.result }); // Base64-encoded string
      };
  
      reader.onerror = (error) => {
          console.error("Error reading image file:", error);
      };
  
      reader.readAsDataURL(file); // Converts to Base64
  };
  
    // Handle post submission
    const handlePostSubmit = async (e) => {
      e.preventDefault();
      try {
        const newPostData = {
          caption: newPost.text,
          photo: newPost.image,
        };
    
        await createPost(newPostData);
    
        const updatedPosts = await fetchPosts();
        setPosts(updatedPosts);
    
        setNewPost({ text: "", image: null });
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    };
    

  return (
    <>
      <div className="MyFeed">
      <div className="Greeting">
      <BiSolidDog 
        size={40}
        color="493628"/>
      <h2>Paws-itively happy to see you again !</h2>
      </div>
      <div className="PostCreationForm">     
        <h3>Share Something Today!</h3>
        <form onSubmit={handlePostSubmit}>
          <textarea
            name="text"
            placeholder="What's on your mind?"
            value={newPost.text}
            onChange={handlePostChange}
          />
          <div className="form-actions">
            <input id="choose-file" type="file" accept="image/*" onChange={handleImageUpload} />
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
      <h2>Paws on over to check out what’s new in town !</h2>
      <div className="FeedPosts">
      {posts.length > 0 ? (
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
      ) : (
        <p>No posts to display.</p>)}
        </div>
        </div>
    </>
  );
}

export default MyFeed;

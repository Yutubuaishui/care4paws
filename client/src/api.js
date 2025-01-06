import axios from 'axios'; //send HTTP requests

const BASE_URL = 'http://localhost:8080/api';

/* Handling authentication */
export const loginUser = async (credentials) => {
    try {
        //axios.post needs URL and data (an object)
        const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials);
        return data; // { token, role }
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error; // Ensure errors are propagated to the caller
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData);
        return response.data; // Success response from the backend
    } catch (err) {
        // Return a meaningful error message from the server response
        if (err.response) {
            // Backend error (validation or other issues)
            throw new Error(err.response.data.message || 'Registration failed');
        } else {
            // Network or other issues
            throw new Error('Network error. Please try again later.');
        }
    }
};

/* For Community Module */
export const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      console.log("this is the token " + token);
      const response = await fetch(`${BASE_URL}/communityPost/fetch-all-post`, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + token, // Include token in headers
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Raw response data:", data); // Debug raw response
    return data.posts;
} catch (error) {
    console.error("Error fetching posts:", error);
    return [];
}
};

export const fetchTargetPost = async (postId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const response = await fetch(`${BASE_URL}/communityPost/fetch-post/${postId}`, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + token, // Include token in headers
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched post data:", data); // Debug raw response
      return data.post; // Return the fetched post object
    } catch (error) {
      console.error("Error fetching post:", error);
      return null; // Return null in case of error
    }
  };
  
  
  
  // Create a new post at community module
  export const createPost = async (postData) => {
    console.log("Payload being sent:", postData);
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/communityPost/create-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const likePost = async (_id) => {
    try {
    const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/communityPost/like-post`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: _id }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to like the post");
      }
  
      const data = await response.json();
      console.log("Post liked successfully:", data);
      return data; // Handle response if needed
    } catch (err) {
      console.error("Error liking post:", err.message);
    }
  };

  export const unlikePost = async (_id) => {
    try {
        const token = localStorage.getItem("token");
          const response = await fetch(`${BASE_URL}/communityPost/unlike-post`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ _id: _id }),
          });
      
          if (!response.ok) {
            throw new Error("Failed to unlike the post");
          }

          return await response.json(); // Handle response if needed
        } catch (err) {
          console.error("Error liking post:", err.message);
        }
  }
  
  // Controller to fetch comments for a post
  export const fetchPostComments = async (postId) => {
    try {
      const comments = await Comment.find({ postId }).populate('user', 'username avatarSrc');
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  // Controller to create a comment (including replies)
  export const createComment = async (data) => {
    try {
      const comment = new Comment(data);
      await comment.save();
      return comment;
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  


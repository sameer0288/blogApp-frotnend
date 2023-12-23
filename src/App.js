// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import SignupForm from "./components/User"; // Import your SignupForm component
import "./App.css"; // Import the CSS file

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(() => {
    // Retrieve token from local storage on component mount
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    // Save token to local storage whenever it changes
    localStorage.setItem("token", token);

    // Fetch blog posts when the component mounts or when the token changes
    if (token) {
      axios
        .get("https://blogapp-backend-lmtb.onrender.com/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setPosts(response.data))
        .catch((error) => console.error(error));
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    // Clear token from local storage on logout
    localStorage.removeItem("token");
    setToken("");
  };

  const handleCreatePost = async (title, content) => {
    try {
      const response = await axios.post(
        "https://blogapp-backend-lmtb.onrender.com/api/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts([...posts, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div>
        <div className="auth-buttons">
          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
              <Link to="/signin">
                <button>Signin</button>
              </Link>
            </>
          )}
        </div>

        {/* Define your routes */}
        <Routes>
          {/* Route for Signup */}
          <Route path="/signup" element={<SignupForm />} />

          {/* Route for Login */}
          <Route
            path="/signin"
            element={
              token ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />
            }
          />

          {/* Route for the home page */}
          <Route
            path="/"
            element={
              token ? (
                <>
                  <h2>Create a New Post</h2>
                  <PostForm onCreatePost={handleCreatePost} />
                </>
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
        </Routes>

        <h2>Blog Posts</h2>
        <PostList posts={posts} />
      </div>
    </Router>
  );
};

export default App;

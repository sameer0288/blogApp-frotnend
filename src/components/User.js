// User.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "https://blogapp-backend-lmtb.onrender.com/api/register",
        {
          username,
          password,
        }
      );

      if (response.status === 201) {
        alert("User registered successfully");
        console.log("User registered successfully");

        // Clear input fields after successful registration
        setUsername("");
        setPassword("");
        navigate("/signin");
      } else {
        alert(`Registration failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />

      <button type="button" onClick={registerUser}>
        Register
      </button>
    </div>
  );
};

export default User;

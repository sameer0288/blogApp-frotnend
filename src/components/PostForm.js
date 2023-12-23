// PostForm.js
import React, { useState } from "react";

const PostForm = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = () => {
    onCreatePost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default PostForm;

import React from "react";

const PostList = ({ posts, currentUserId }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>
            Author:{" "}
            {post.author._id === currentUserId ? "You" : post.author.username}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;

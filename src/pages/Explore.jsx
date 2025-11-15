import React, { useEffect, useState } from "react";
import PostCard from "../components/Postcard";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("peer_posts")) || [];
    setPosts(saved);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("peer_posts", JSON.stringify(posts));
  }, [posts]);

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
    }
  };

  
  const handleUpdate = (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Explore Projects
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">
          No projects found. Go to "Create Project" to add one!
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;

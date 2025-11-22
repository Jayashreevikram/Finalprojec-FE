import React, { useEffect, useState } from "react";
import PostCard from "../components/Postcard";
import { API } from "../utils/api";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/api/posts/all");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ------------------- LIKE POST -------------------
  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem("peer_token");
      await API.put(
        `/api/posts/like/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------- DELETE POST -------------------
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("peer_token");
      await API.delete(`/api/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------- UPDATE / EDIT POST -------------------
  const handleUpdate = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("peer_token");
      await API.put(`/api/posts/update/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------- COMMENT POST -------------------
  const handleComment = async (id, commentText) => {
    try {
      const token = localStorage.getItem("peer_token");
      await API.post(
        `/api/posts/comment/${id}`,
        { comment: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Explore Projects
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No projects found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={handleLike}
              onDelete={handleDelete}
              onUpdate={(updatedPost) =>
                handleUpdate(post._id, updatedPost)
              }
              onComment={(commentText) =>
                handleComment(post._id, commentText)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    github: "",
  });

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("peer_posts")) || [];
    setPosts(saved);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("peer_posts", JSON.stringify(posts));
  }, [posts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.github) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github: form.github,
      likes: 0,
      comments: [],
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);

    alert("✅ Project Created Successfully!");
    navigate("/explore"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex justify-center items-start">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Create New Project
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 mb-4 rounded"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Repository Link"
            value={form.github}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;

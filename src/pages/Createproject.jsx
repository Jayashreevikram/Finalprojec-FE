import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api";
import { getAuth } from "firebase/auth";

const CreateProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    github: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    await API.post(
      "/api/posts/create",
      {
        title: form.title,
        description: form.description,
        github: form.github,
        techStack: form.tags.split(",").map(t => t.trim())
,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Project created!");
    navigate("/explore");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Create New Project
        </h1>

        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Project Title" className="w-full border p-2 mb-4 rounded" onChange={handleChange} />
          <textarea name="description" placeholder="Project Description" className="w-full border p-2 mb-4 rounded" onChange={handleChange}></textarea>
          <input type="text" name="tags" placeholder="Tags" className="w-full border p-2 mb-4 rounded" onChange={handleChange} />
          <input type="text" name="github" placeholder="GitHub URL" className="w-full border p-2 mb-4 rounded" onChange={handleChange} />

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;

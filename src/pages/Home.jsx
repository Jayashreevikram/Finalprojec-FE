import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="text-center min-h-screen flex flex-col 
      justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to Peer Project
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        A platform for students to collaborate on coding projects.
      </p>

      <div className="flex gap-6">
        <Link
          to="/explore"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Explore Projects
        </Link>
        <Link
          to="/create"
          className="bg-white border border-blue-600 text-blue-600 px-6 py-3 
          rounded-lg shadow hover:bg-blue-50">
          Create Project
        </Link>
      </div>
    </div>
  );
};

export default Home;

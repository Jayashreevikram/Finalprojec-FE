import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold">Peer Project</h1>
      <ul className="flex gap-6 text-lg">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link to="/create" className="hover:text-gray-200">Create Project</Link></li>
        <li><Link to="/explore" className="hover:text-gray-200">Explore</Link></li>
        <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

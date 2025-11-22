import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  // Check login on component load
  useEffect(() => {
    const token = localStorage.getItem("peer_token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("peer_token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        Peer Project
      </h1>

      <ul className="flex gap-6 text-lg">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link to="/createproject" className="hover:text-gray-200">Create Project</Link></li>
        <li><Link to="/explore" className="hover:text-gray-200">Explore</Link></li>

        {!loggedIn ? (
          <li>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("peer_user"); 
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold">Peer Project</h1>

      <ul className="flex gap-6 text-lg">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        {user && (
          <>
            <li><Link to="/createproject" className="hover:text-gray-200">Create Project</Link></li>
            <li><Link to="/explore" className="hover:text-gray-200">Explore</Link></li>
          </>
        )}

        {!user ? (
          <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
        ) : (
          <li>
            <button 
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
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

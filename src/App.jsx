import {Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import CreateProject from "./pages/Createproject";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Explore from "./pages/Explore";
import RequireAuth from "./components/RequireAuth";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Navbar/>
    
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/createproject"
          element={
            <RequireAuth>
              <CreateProject />
            </RequireAuth>
          }
        />

        <Route
          path="/explore"
          element={
            <RequireAuth>
              <Explore />
            </RequireAuth>
          }
        />

      </Routes>
   
    </>
  );
}

export default App;

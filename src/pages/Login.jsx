import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { API } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const auth = getAuth(app);

      // 1. Firebase login
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // 2. Get ID Token
      const token = await userCred.user.getIdToken();
        localStorage.setItem("peer_token", token);


      // 3. Send to backend
      await API.post(
        "/api/user/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Login successful!");
      navigate("/explore");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          New user?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

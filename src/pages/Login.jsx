import React from "react";
import Signup from "./Signup";
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-2 mb-4 rounded"
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Login
        </button>


       
        <p className="text-center text-gray-600 text-sm mt-4">
          New user?{" "}
          <Link
            to="/Signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
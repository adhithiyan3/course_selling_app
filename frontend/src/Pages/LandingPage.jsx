import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Welcome to Course Platform</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/admin/login" className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700">
          Admin Login
        </Link>
        <Link to="/admin/signup" className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-600">
          Admin Signup
        </Link>
        <Link to="/user/login" className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-green-700">
          User Login
        </Link>
        <Link to="/user/signup" className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-green-600">
          User Signup
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

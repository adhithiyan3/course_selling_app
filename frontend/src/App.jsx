import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AdminLogin from "./Pages/AdminLogin";
import AdminSignup from "./Pages/AdminSignup";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignup";
import AdminDashboard from "./Pages/AdminDashboard";
import CoursePreview from "./Pages/CoursePreview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* User Auth */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserSignup />} />

      {/* Courses */}
      <Route path="/courses/:id" element={<CoursePreview />} />
    </Routes>
  );
}

export default App;

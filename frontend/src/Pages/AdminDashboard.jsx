import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("http://localhost:3000/admin/viewcourses", {
          headers: { token },
        });
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow-md rounded-2xl p-4">
            <img src={course.imageUrl} alt={course.title} className="rounded-xl mb-3 w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600">By {course.adminFirstName} {course.adminLastName}</p>
            <p className="text-gray-700 mt-2">{course.description}</p>
            <Link 
              to={`/courses/${course._id}`} 
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Preview
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

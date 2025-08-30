import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CoursePreview() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:3000/course/${id}`);
        const data = await res.json();
        setCourse(data.course);
      } catch (err) {
        console.error("Failed to fetch course", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <img src={course.imageUrl} alt={course.title} className="rounded-xl mb-6 w-full h-60 object-cover" />
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">By {course.adminFirstName} {course.adminLastName}</p>
      <p className="text-gray-800">{course.description}</p>
    </div>
  );
}

export default CoursePreview;

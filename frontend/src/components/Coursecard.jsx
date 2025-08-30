// src/components/CourseCard.jsx
export default function CourseCard({ course, showBuy, onBuy }) {
  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded mb-3" />
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p className="text-gray-600">{course.description}</p>
      <p className="mt-2 font-bold">₹{course.price}</p>
      <p className="text-sm text-gray-500 mt-1">Created by: {course.creator?.firstname} {course.creator?.lastname}</p>
      {showBuy && (
        <button 
          onClick={() => onBuy(course._id)}
          className="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Buy
        </button>
      )}
    </div>
  );
}

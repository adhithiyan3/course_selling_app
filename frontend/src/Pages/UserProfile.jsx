// src/pages/UserProfile.jsx
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    fetch("http://localhost:3000/user/profile", {
      headers: { token }
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  if (!user) return <p className="p-6 text-gray-600">Loading profile...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <img 
          src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random`} 
          alt="Profile Avatar" 
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold">{user.firstname} {user.lastname}</h2>
        <p className="text-gray-600">{user.email}</p>
        <button 
          onClick={() => {
            localStorage.removeItem("userToken");
            window.location.href = "/";
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

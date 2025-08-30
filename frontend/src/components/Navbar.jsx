// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Course App</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/admin/login" className="hover:underline">Admin</Link>
        <Link to="/user/login" className="hover:underline">User</Link>
      </div>
    </nav>
  );
}

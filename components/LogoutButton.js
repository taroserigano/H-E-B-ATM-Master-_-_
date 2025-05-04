"use client";

import axios from "axios";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded font-semibold"
    >
      Logout
    </button>
  );
}

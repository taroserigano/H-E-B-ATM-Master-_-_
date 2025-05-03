"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include", // 🔁 ensure cookie is included in request
    });

    if (res.ok) {
      window.location.href = "/login";
    } else {
      alert("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 cursor-pointer"
    >
      Logout
    </button>
  );
}

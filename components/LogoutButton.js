"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
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
      className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded font-semibold"
    >
      Logout
    </button>
  );
}

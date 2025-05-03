"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/session/SessionContext";

export default function LoginPage() {
  const [accountId, setAccountIdInput] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setAccountId } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ accountId, pin }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setError("Login failed. Check your Account ID and PIN.");
      return;
    }

    const data = await res.json();
    setAccountId(data.accountId); // update global session context
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">H-E-B ATM Login</h1>

        <input
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountIdInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}

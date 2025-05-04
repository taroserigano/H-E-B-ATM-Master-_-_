"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/session/SessionContext";
import { useAccount } from "@/context/account/AccountContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({ accountId: "1111", pin: "1234" });
  const [error, setError] = useState("");

  const router = useRouter();
  const { setAccountId } = useSession();
  const { dispatch } = useAccount();

  const handleSubmit = useCallback(async () => {
    const { accountId, pin } = formData;
    if (!accountId || !pin) return;

    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, pin }),
      });

      if (!res.ok) {
        setError("Login failed. Check your Account ID and PIN.");
        return;
      }

      setAccountId(accountId);

      const balanceRes = await fetch("/api/balance", {
        credentials: "include",
      });
      const data = await balanceRes.json();

      if (balanceRes.ok && typeof data.balance === "number") {
        dispatch({ type: "SET_BALANCE", payload: data.balance });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: data.error || "Balance fetch failed",
        });
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  }, [formData, dispatch, router, setAccountId]);

  // ⏳ Debounced auto-submit
  useEffect(() => {
    const { accountId, pin } = formData;
    if (!accountId && !pin) return;

    const timeout = setTimeout(() => {
      handleSubmit();
    }, 800);

    return () => clearTimeout(timeout);
  }, [formData, handleSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4">
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <img
          src="/heb-logo.png"
          alt="H-E-B Logo"
          className="mx-auto mb-4 w-28 h-auto"
        />

        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
          H‑E‑B ATM Login
        </h1>

        {/* Dummy inputs to block browser autofill */}
        {/* <input
          type="text"
          name="fake-user"
          autoComplete="username"
          style={{ display: "none" }}
        />
        <input
          type="password"
          name="fake-pass"
          autoComplete="new-password"
          style={{ display: "none" }}
        /> */}

        <input
          name="accountId"
          type="text"
          autoComplete="off"
          placeholder="Account ID"
          value={formData.accountId}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 text-black placeholder-gray-500 
            focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />

        <input
          name="pin"
          type="password"
          autoComplete="new-password"
          placeholder="PIN"
          value={formData.pin}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-black placeholder-gray-500 
            focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold 
            transition duration-200"
        >
          Login
        </button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}

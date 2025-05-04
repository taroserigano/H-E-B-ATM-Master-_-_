"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/session/SessionContext";
import { useAccount } from "@/context/account/AccountContext";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";

export default function LoginPage() {
  const [accountId, setAccountIdInput] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const debouncedPIN = useDebounce(pin, 500);

  const router = useRouter();
  const { setAccountId } = useSession();
  const { dispatch } = useAccount();

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      setError("");

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accountId, pin: debouncedPIN }),
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
    },
    [accountId, debouncedPIN, dispatch, router, setAccountId]
  );

  useDebouncedValue(() => {
    if (accountId && pin) {
      handleSubmit();
    }
  }, [accountId, pin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4">
      <form
        onSubmit={handleSubmit}
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

        <input
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountIdInput(e.target.value)}
          className="w-full p-2 border rounded mb-3 text-black placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
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

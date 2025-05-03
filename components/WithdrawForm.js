"use client";

import { useState } from "react";
import { useAccount } from "@/context/account/AccountContext";

export default function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch } = useAccount();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setError("");

    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Withdraw failed.");
        return;
      }

      dispatch({ type: "SET_BALANCE", payload: data.newBalance });
    } catch {
      setError("Network error. Try again.");
    }

    setAmount("");
  };

  return (
    <form
      onSubmit={handleWithdraw}
      className="bg-white p-4 rounded-xl shadow-lg w-full mt-4 border border-gray-200"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-2">Withdraw Funds</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className={`w-full p-2 rounded border mb-2 text-black placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 
          font-semibold transition duration-200"
      >
        Withdraw
      </button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </form>
  );
}

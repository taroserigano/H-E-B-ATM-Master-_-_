"use client";

import { useState } from "react";
import { useAccount } from "@/context/account/AccountContext";

export default function DepositForm() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { deposit } = useAccount();

  const handleDeposit = async () => {
    setError("");
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    const success = await deposit(value);
    if (!success) setError("Deposit failed. Try again.");
    setAmount("");
  };

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-lg mb-4 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Deposit Funds</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={`w-full p-2 border rounded mb-2 text-black placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      <button
        onClick={handleDeposit}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded 
          transition duration-200 font-semibold"
      >
        Deposit
      </button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}

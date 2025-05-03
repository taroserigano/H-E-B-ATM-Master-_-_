"use client";

import { useState } from "react";
import { useAccount } from "@/context/AccountContext";

export default function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const { state, dispatch } = useAccount();

  const handleWithdraw = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      dispatch({ type: "WITHDRAW", payload: value });
    }
    setAmount("");
  };

  return (
    <form
      onSubmit={handleWithdraw}
      className="bg-white p-4 rounded shadow w-full max-w-xs mt-4"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-2">Withdraw Funds</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border border-gray-300 rounded mb-2 text-black placeholder-gray-500"
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Withdraw
      </button>
      {state.error && (
        <p className="text-sm text-red-500 mt-2">{state.error}</p>
      )}
    </form>
  );
}

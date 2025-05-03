"use client";
import { useContext, useState } from "react";
import { AccountContext } from "@/context/account/AccountContext";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const { state, dispatch } = useContext(AccountContext);

  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;
    dispatch({ type: "WITHDRAW", payload: value });
    setAmount("");
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-bold mb-2">Withdraw Funds</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleWithdraw}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Withdraw
      </button>
      {state.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
    </div>
  );
}

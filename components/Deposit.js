"use client";
import { useContext, useState } from "react";
import { AccountContext } from "@/context/account/AccountContext";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const { state, dispatch } = useContext(AccountContext);

  const handleDeposit = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;
    dispatch({ type: "DEPOSIT", payload: value });
    setAmount("");
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-bold mb-2">Deposit Funds</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleDeposit}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        Deposit
      </button>
    </div>
  );
}

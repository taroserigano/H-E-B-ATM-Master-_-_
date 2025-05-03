"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DepositForm() {
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();

  const depositMutation = useMutation({
    mutationFn: async (amount) => {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error("Deposit failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
      setAmount("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(amount) > 0) depositMutation.mutate(Number(amount));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow w-full max-w-xs"
    >
      <h2 className="text-lg font-semibold mb-2">Deposit Funds</h2>
      <input
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Deposit
      </button>
      {depositMutation.isError && (
        <p className="text-sm text-red-500 mt-2">Deposit failed. Try again.</p>
      )}
    </form>
  );
}

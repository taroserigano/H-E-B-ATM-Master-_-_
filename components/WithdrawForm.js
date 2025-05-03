"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (amount) => {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ important
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Withdraw failed");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
      setAmount("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(amount) > 0) mutation.mutate(Number(amount));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow w-full max-w-xs mt-4"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-2">Withdraw Funds</h2>
      <input
        type="number"
        step="0.01"
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
      {mutation.isError && (
        <p className="text-sm text-red-500 mt-2">{mutation.error.message}</p>
      )}
    </form>
  );
}

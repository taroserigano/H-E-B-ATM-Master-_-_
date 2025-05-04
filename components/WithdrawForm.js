"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: async (value) => {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Withdraw failed");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountBalance"] });
      queryClient.invalidateQueries({ queryKey: ["accountTransactions"] });
      setMessage({ type: "success", text: "Withdraw successful!" });
      setAmount("");
    },
    onError: (err) => {
      setMessage({ type: "error", text: err.message });
    },
  });

  // 🧠 Stable handler
  const handleWithdraw = useCallback(
    (e) => {
      e.preventDefault();
      const value = parseFloat(amount);
      if (isNaN(value) || value <= 0) {
        setMessage({ type: "error", text: "Enter a valid amount." });
        return;
      }
      withdrawMutation.mutate(value);
    },
    [amount, withdrawMutation]
  );

  // 🧼 Auto-clear message
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🧠 Memoize disabled state
  const isDisabled = useMemo(
    () => withdrawMutation.isPending,
    [withdrawMutation.isPending]
  );

  return (
    <form
      onSubmit={handleWithdraw}
      className="bg-white p-4 rounded shadow mb-4"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-2">Withdraw Funds</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border border-gray-300 text-gray-900 placeholder-gray-500 rounded mb-2"
        disabled={isDisabled}
      />

      <button
        type="submit"
        className={`w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition font-semibold cursor-pointer ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDisabled}
      >
        {isDisabled ? "Withdrawing..." : "Withdraw"}
      </button>

      {message.text && (
        <p
          className={`text-sm mt-2 ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}

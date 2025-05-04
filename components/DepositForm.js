"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useDebounce } from "@/lib/hooks/useDebounce";
export default function DepositForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const debouncedAmount = useDebounce(amount, 500);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (value) => {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deposit failed");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountBalance"] });
      queryClient.invalidateQueries({ queryKey: ["accountTransactions"] });
      setMessage({ type: "success", text: "Deposit successful!" });
      setAmount("");
    },
    onError: (err) => {
      setMessage({ type: "error", text: err.message });
    },
  });

  // 🔁 Trigger auto deposit if valid number & debounce is stable
  useEffect(() => {
    const value = parseFloat(debouncedAmount);
    if (!isNaN(value) && value > 0) {
      mutation.mutate(value);
    }
  }, [debouncedAmount]);

  // 🧼 Auto-clear message
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="w-full p-4 bg-white rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Deposit Funds</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 text-gray-900 placeholder-gray-500 rounded mb-2"
        disabled={mutation.isPending}
      />

      <button
        onClick={() => mutation.mutate(parseFloat(amount))}
        disabled={mutation.isPending || isNaN(parseFloat(amount))}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
      >
        {mutation.isPending ? "Depositing..." : "Deposit"}
      </button>

      {message.text && (
        <p
          className={`mt-2 text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function DepositForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const queryClient = useQueryClient();

  const MAX_DEPOSIT = 10000;

  const mutation = useMutation({
    mutationFn: async (value) => {
      const { data } = await axios.post("/api/deposit", { amount: value });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["accountBalance"] });
      queryClient.invalidateQueries({ queryKey: ["accountTransactions"] });
      setMessage({
        type: "success",
        text: `✔ Deposited $${variables.toFixed(2)}`,
      });
      setAmount("");
    },
    onError: (err) => {
      const errorMsg =
        err?.response?.data?.error || err.message || "Deposit failed";
      setMessage({ type: "error", text: errorMsg });
    },
  });

  const handleSubmit = () => {
    const raw = amount.trim();

    if (!raw) {
      setMessage({ type: "error", text: "Amount is required." });
      return;
    }

    const value = parseFloat(raw);

    if (isNaN(value)) {
      setMessage({ type: "error", text: "Amount must be a number." });
      return;
    }

    if (value <= 0) {
      setMessage({ type: "error", text: "Amount must be greater than 0." });
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
      setMessage({ type: "error", text: "Max 2 decimal places allowed." });
      return;
    }

    if (value > MAX_DEPOSIT) {
      setMessage({
        type: "error",
        text: `Max deposit is $${MAX_DEPOSIT.toLocaleString()}.`,
      });
      return;
    }

    mutation.mutate(value);
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="w-full p-4 bg-white rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800">Deposit Funds</h2>
        {message.text && (
          <span
            className={`text-sm ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </span>
        )}
      </div>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 text-gray-900 placeholder-gray-500 rounded mb-2"
        disabled={mutation.isPending}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={mutation.isPending}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
      >
        {mutation.isPending ? "Depositing..." : "Deposit"}
      </button>
    </div>
  );
}

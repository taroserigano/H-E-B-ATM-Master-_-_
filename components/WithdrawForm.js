"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const queryClient = useQueryClient();

  // 🧠 Fetch daily withdrawal limit info
  const {
    data: limitData,
    isLoading: isLimitLoading,
    isError: isLimitError,
    error: limitError,
  } = useQuery({
    queryKey: ["withdrawalLimit"],
    queryFn: async () => {
      const { data } = await axios.get("/api/account/limit", {
        withCredentials: true, // ✅ include cookie
      });
      return data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const withdrawMutation = useMutation({
    mutationFn: async (value) => {
      const { data } = await axios.post("/api/withdraw", { amount: value });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountBalance"] });
      queryClient.invalidateQueries({ queryKey: ["accountTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["withdrawalLimit"] });
      setMessage({ type: "success", text: "Withdraw successful!" });
      setAmount("");
    },
    onError: (err) => {
      const errorMsg = err?.response?.data?.error || err.message;
      setMessage({ type: "error", text: errorMsg });
    },
  });

  const handleWithdraw = useCallback(
    (e) => {
      e.preventDefault();
      const value = parseFloat(amount);
      if (isNaN(value) || value <= 0) {
        setMessage({ type: "error", text: "Enter a valid amount." });
        return;
      }

      if (
        limitData &&
        typeof limitData.remaining === "number" &&
        value > limitData.remaining
      ) {
        setMessage({
          type: "error",
          text: `You can only withdraw up to $${limitData.remaining.toFixed(
            2
          )} today.`,
        });
        return;
      }

      withdrawMutation.mutate(value);
    },
    [amount, withdrawMutation, limitData]
  );

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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

      {/* 🧠 Daily limit status block */}
      {isLimitLoading ? (
        <p className="text-sm text-gray-400 mb-2">Loading daily limit...</p>
      ) : isLimitError ? (
        <p className="text-sm text-red-600 mb-2">
          Error loading limit: {limitError.message}
        </p>
      ) : limitData ? (
        <div className="text-sm mb-3">
          <div className="text-green-600 font-semibold">
            ✅ Remaining: ${limitData.remaining}
          </div>
        </div>
      ) : null}

      <input
        type="text"
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

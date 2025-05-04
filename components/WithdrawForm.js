"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const queryClient = useQueryClient();

  const {
    data: limitData,
    isLoading: isLimitLoading,
    isError: isLimitError,
    error: limitError,
  } = useQuery({
    queryKey: ["withdrawalLimit"],
    queryFn: async () => {
      const { data } = await axios.get("/api/account/limit", {
        withCredentials: true,
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

    // 🧠 Optimistically update cache
    onMutate: async (value) => {
      await queryClient.cancelQueries({ queryKey: ["accountBalance"] });
      await queryClient.cancelQueries({ queryKey: ["accountTransactions"] });
      await queryClient.cancelQueries({ queryKey: ["withdrawalLimit"] });

      const prevBalance = queryClient.getQueryData(["accountBalance"]);
      const prevTransactions = queryClient.getQueryData([
        "accountTransactions",
      ]);
      const prevLimit = queryClient.getQueryData(["withdrawalLimit"]);

      if (prevBalance && typeof prevBalance.balance === "number") {
        queryClient.setQueryData(["accountBalance"], {
          balance: prevBalance.balance - value,
        });
      }

      if (prevTransactions?.transactions) {
        queryClient.setQueryData(["accountTransactions"], {
          transactions: [
            ...prevTransactions.transactions,
            {
              type: "withdraw",
              amount: value,
              balanceAfter: (prevBalance?.balance || 0) - value,
              date: new Date().toISOString(),
            },
          ],
        });
      }

      if (prevLimit) {
        queryClient.setQueryData(["withdrawalLimit"], {
          ...prevLimit,
          withdrawnToday: (prevLimit.withdrawnToday || 0) + value,
          remaining: (prevLimit.remaining || 0) - value,
        });
      }

      return { prevBalance, prevTransactions, prevLimit };
    },

    onError: (err, _, context) => {
      if (context?.prevBalance)
        queryClient.setQueryData(["accountBalance"], context.prevBalance);
      if (context?.prevTransactions)
        queryClient.setQueryData(
          ["accountTransactions"],
          context.prevTransactions
        );
      if (context?.prevLimit)
        queryClient.setQueryData(["withdrawalLimit"], context.prevLimit);

      const errorMsg =
        err?.response?.data?.error || err.message || "Withdraw failed";
      setMessage({ type: "error", text: errorMsg });
    },

    onSuccess: (_, value) => {
      setMessage({
        type: "success",
        text: `✔ Withdrew $${value.toFixed(2)}`,
      });
      setAmount("");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accountBalance"] });
      queryClient.invalidateQueries({ queryKey: ["accountTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["withdrawalLimit"] });
    },
  });

  const handleWithdraw = useCallback(
    (e) => {
      e.preventDefault();

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
        setMessage({
          type: "error",
          text: "Max 2 decimal places allowed.",
        });
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
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800">Withdraw Funds</h2>
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

      {isLimitLoading ? (
        <p className="text-sm text-gray-400 mb-2">Loading daily limit...</p>
      ) : isLimitError ? (
        <p className="text-sm text-red-600 mb-2">
          Error loading limit: {limitError.message}
        </p>
      ) : limitData ? (
        <div className="text-sm mb-3 text-green-600 font-semibold">
          ✅ Remaining: ${limitData.remaining}
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
    </form>
  );
}

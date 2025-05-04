"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";

export default function TransactionHistory() {
  const [visible, setVisible] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["accountTransactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const exportToExcel = () => {
    if (!data?.transactions?.length) return;

    const rows = data.transactions.map((tx) => ({
      Type: tx.type,
      Amount: tx.amount,
      "Balance After": tx.balanceAfter,
      Date: new Date(tx.date).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setVisible((v) => !v)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold py-1 px-3 rounded shadow transition"
        >
          {visible ? "Hide" : "Show"} Last 10 Transactions
        </button>

        {data?.transactions?.length > 0 && visible && (
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1 px-3 rounded shadow transition"
          >
            Export to Excel
          </button>
        )}
      </div>

      {/* Scroll container */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          visible ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="overflow-y-auto max-h-[200px]  scrollbar-thin scrollbar-thumb-gray-300 rounded-md border border-gray-200 bg-white shadow-inner p-2 space-y-2">
          {isLoading ? (
            <p className="text-center text-sm text-gray-400">
              Loading transactions...
            </p>
          ) : isError ? (
            <p className="text-center text-sm text-red-600">
              Error loading transactions
            </p>
          ) : data?.transactions?.length === 0 ? (
            <p className="text-center text-sm text-gray-400">
              No transactions yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {data.transactions.slice(0, 10).map((tx, index) => {
                const dateObj = new Date(tx.date);
                const dateStr = dateObj.toLocaleDateString();
                const timeStr = dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });

                return (
                  <li
                    key={index}
                    className={`px-3 py-2 rounded-md text-sm shadow-sm border font-medium ${
                      tx.type === "deposit"
                        ? "bg-green-100 text-green-900 border-green-300"
                        : "bg-red-100 text-red-900 border-red-300"
                    }`}
                  >
                    <span className="font-semibold capitalize">{tx.type}</span>{" "}
                    ${tx.amount} —{" "}
                    <span className="text-gray-800">{dateStr}</span>,{" "}
                    <span className="text-gray-700">{timeStr}</span> —{" "}
                    <span className="text-gray-900 font-medium">
                      balance: ${tx.balanceAfter}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

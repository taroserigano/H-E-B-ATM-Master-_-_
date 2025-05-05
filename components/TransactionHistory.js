"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as XLSX from "xlsx";

export default function TransactionHistory() {
  const [visible, setVisible] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [exportLimit, setExportLimit] = useState("100");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["accountTransactions"],
    queryFn: async () => {
      const { data } = await axios.get("/api/transactions?limit=1000", {
        withCredentials: true,
      });
      return data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const limitValue =
    exportLimit === "all" ? Infinity : parseInt(exportLimit, 10);

  const filteredTransactions = useMemo(() => {
    if (!data?.transactions) return [];

    return data.transactions
      .filter((tx) => (filterType === "all" ? true : tx.type === filterType))
      .slice(0, limitValue);
  }, [data, filterType, limitValue]);

  const exportToExcel = async () => {
    if (!filteredTransactions.length) return;

    const rows = filteredTransactions.map((tx) => ({
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
      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        <button
          onClick={() => setVisible((v) => !v)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold py-1 px-3 rounded shadow transition"
        >
          {visible ? "Hide" : "Show"} Transactions
        </button>

        {visible && (
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 p-1 rounded"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdraw">Withdrawals</option>
            </select>

            <select
              value={exportLimit}
              onChange={(e) => setExportLimit(e.target.value)}
              className="text-sm border border-gray-300 p-1 rounded"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>

            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1 px-3 rounded shadow transition"
            >
              Export to Excel
            </button>
          </div>
        )}
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          visible ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-300 rounded-md border border-gray-200 bg-white shadow-inner p-2 space-y-2">
          {isLoading ? (
            <p className="text-center text-sm text-gray-400">
              Loading transactions...
            </p>
          ) : isError ? (
            <p className="text-center text-sm text-red-600">
              Error loading transactions
            </p>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-center text-sm text-gray-400">
              No matching transactions.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredTransactions.map((tx, index) => {
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

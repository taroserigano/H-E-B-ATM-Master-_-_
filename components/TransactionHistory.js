"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as XLSX from "xlsx";
import { FixedSizeList as List } from "react-window";

// Transaction history with filter, export, and virtualization
export default function TransactionHistory() {
  const [visible, setVisible] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [exportLimit, setExportLimit] = useState("100");

  // Fetch all transactions (up to 1000)
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

  // Determine export limit
  const limitValue =
    exportLimit === "all" ? Infinity : parseInt(exportLimit, 10);

  // Apply filter and limit
  const filteredTransactions = useMemo(() => {
    if (!data?.transactions) return [];
    return data.transactions
      .filter((tx) => (filterType === "all" ? true : tx.type === filterType))
      .slice(0, limitValue);
  }, [data, filterType, limitValue]);

  // Export filtered transactions to Excel
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

  // Render a single transaction in 2 stacked rows (virtualized)
  const Row = ({ index, style }) => {
    const tx = filteredTransactions[index];
    const dateObj = new Date(tx.date);
    const dateStr = dateObj.toLocaleDateString();
    const timeStr = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const baseClass =
      tx.type === "deposit"
        ? "bg-green-100 text-green-900 border-green-300"
        : "bg-red-100 text-red-900 border-red-300";

    return (
      <div style={{ ...style, padding: "0 12px", boxSizing: "border-box" }}>
        <div
          className={`w-full px-3 py-1 rounded-md text-sm shadow-sm border font-medium ${baseClass}`}
        >
          <div className="flex justify-between">
            <span className="capitalize font-semibold">{tx.type}</span>
            <span>${tx.amount}</span>
          </div>
          <div className="flex justify-between text-gray-700 text-xs pt-1">
            <span>
              {dateStr}, {timeStr}
            </span>
            <span className="font-medium text-gray-900">
              balance: ${tx.balanceAfter}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        {/* Toggle visibility */}
        <button
          onClick={() => setVisible((v) => !v)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold py-1 px-3 rounded shadow transition"
        >
          {visible ? "Hide" : "Show"} Transactions
        </button>

        {visible && (
          <div className="flex flex-wrap gap-2 items-center">
            {/* Filter by type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdraw">Withdrawals</option>
            </select>

            {/* Limit how many rows to export */}
            <select
              value={exportLimit}
              onChange={(e) => setExportLimit(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>

            {/* Export button */}
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1 px-3 rounded shadow transition"
            >
              Export to Excel
            </button>
          </div>
        )}
      </div>

      {/* Transaction list container with smooth expand/collapse */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          visible ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-md border border-gray-200 bg-white shadow-inner">
          {isLoading ? (
            <p className="text-center text-sm text-gray-400 p-2">
              Loading transactions...
            </p>
          ) : isError ? (
            <p className="text-center text-sm text-red-600 p-2">
              Error loading transactions
            </p>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-center text-sm text-gray-400 p-2">
              No matching transactions.
            </p>
          ) : (
            // Virtualized list for performance
            <List
              height={200}
              itemCount={filteredTransactions.length}
              itemSize={58} // Increased to fit 2 rows
              width="100%"
            >
              {Row}
            </List>
          )}
        </div>
      </div>
    </div>
  );
}

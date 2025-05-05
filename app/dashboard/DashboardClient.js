"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DepositForm from "@/components/DepositForm";
import WithdrawForm from "@/components/WithdrawForm";
import LogoutButton from "@/components/LogoutButton";
import TransactionHistory from "@/components/TransactionHistory";

export default function DashboardClient() {
  const [dbConnected, setDbConnected] = useState(null);

  // Memoized balance fetcher for React Query
  const fetchBalance = useMemo(() => {
    return async () => {
      const res = await axios.get("/api/account", {
        withCredentials: true,
      });
      return res.data;
    };
  }, []);

  // Balance query with retries and refetch options
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["accountBalance"],
    queryFn: fetchBalance,
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: true, // automatic re-fetch when user goes back to this tab
  });

  // MongoDB connection check
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data } = await axios.get("/api/status");
        setDbConnected(data.connected);
      } catch {
        setDbConnected(false);
      }
    };
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl border border-gray-200"
        style={{
          height: "940px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-col items-center">
          <img
            src="/heb-logo.png"
            alt="H-E-B Logo"
            className="mx-auto mb-4 w-28 h-auto"
          />
          <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
            Welcome to H‑E‑B ATM
          </h1>

          {(() => {
            if (isLoading) {
              return (
                <p className="text-center text-gray-600 mb-2">
                  Loading balance...
                </p>
              );
            }
            if (isError || typeof data?.balance !== "number") {
              return (
                <p className="text-center text-gray-600 mb-2">
                  {error?.message || "Loading"}
                </p>
              );
            }
            return (
              <p className="text-center text-gray-800 text-lg font-semibold mb-2">
                Current Balance:{" "}
                <span className="text-black">${data.balance.toFixed(2)}</span>
              </p>
            );
          })()}

          {dbConnected !== null && (
            <p
              className={`text-sm text-center mb-4 font-semibold ${
                dbConnected ? "text-green-600" : "text-red-600"
              }`}
            >
              MongoDB Cloud: {dbConnected ? "Connected" : "Not Connected"}
            </p>
          )}
        </div>

        {/* Render core ATM components */}
        <div className="flex-grow pr-1 space-y-4">
          <DepositForm />
          <WithdrawForm />
          <LogoutButton />
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}

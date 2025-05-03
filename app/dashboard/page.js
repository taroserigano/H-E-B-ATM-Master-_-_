"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DepositForm from "@/components/DepositForm";
import WithdrawForm from "@/components/WithdrawForm";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  const [dbConnected, setDbConnected] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["accountBalance"],
    queryFn: async () => {
      const res = await fetch("/api/account", { credentials: "include" });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setDbConnected(data.connected))
      .catch(() => setDbConnected(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <img
          src="/heb-logo.png"
          alt="H-E-B Logo"
          className="mx-auto mb-4 w-28 h-auto"
        />
        <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
          Welcome to H‑E‑B ATM
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600 mb-4">Loading balance...</p>
        ) : isError || !data ? (
          <p className="text-center text-red-600 mb-4">Error loading balance</p>
        ) : (
          <p className="text-center text-gray-700 mb-4">
            Current Balance:{" "}
            <span className="font-bold text-black">
              ${data.balance.toFixed(2)}
            </span>
          </p>
        )}

        {dbConnected !== null && (
          <p
            className={`text-sm text-center mb-4 font-semibold ${
              dbConnected ? "text-green-600" : "text-red-600"
            }`}
          >
            MongoDB: {dbConnected ? "Connected ✅" : "Not Connected ❌"}
          </p>
        )}

        <DepositForm />
        <WithdrawForm />
        <LogoutButton />
      </div>
    </div>
  );
}

"use client";

import { useAccount } from "@/context/account/AccountContext";
import DepositForm from "@/components/DepositForm";
import WithdrawForm from "@/components/WithdrawForm";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  const { state } = useAccount();

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
        <p className="text-center text-gray-700 mb-6">
          Current Balance:{" "}
          <span className="font-bold text-black">
            ${state.balance.toFixed(2)}
          </span>
        </p>

        <DepositForm />
        <WithdrawForm />
        <LogoutButton />
      </div>
    </div>
  );
}

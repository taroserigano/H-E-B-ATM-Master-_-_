"use client";
import { useContext } from "react";
import { AccountContext } from "@/context/account/AccountContext";
import Deposit from "@/components/Deposit";
import Withdraw from "@/components/Withdraw";

import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  const { state } = useContext(AccountContext);

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-center text-2xl font-bold text-red-600 mb-2">
        Welcome to H-E-B ATM
      </h1>
      <p className="text-center text-lg mb-6">
        Current Balance: <strong>${state.balance.toFixed(2)}</strong>
      </p>
      <Deposit />
      <Withdraw />

      <LogoutButton />
    </div>
  );
}

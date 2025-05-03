"use client";

import { useAccount } from "@/context/AccountContext";

export default function Balance() {
  const { state } = useAccount();

  return (
    <div className="text-xl font-medium text-gray-800 my-4">
      Current Balance: ${state.balance.toFixed(2)}
    </div>
  );
}

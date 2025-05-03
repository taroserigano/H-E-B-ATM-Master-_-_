"use client";

import { useAccount } from "@/context/account/AccountContext";

export default function TransactionHistory() {
  const { state } = useAccount();

  // 🔍 Console log for debugging
  console.log("Transactions from context:", state.transactions);

  if (!state.transactions || state.transactions.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400 mt-4">
        No transactions yet.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2 text-gray-700">
        Recent Transactions
      </h3>
      <ul className="text-sm space-y-1">
        {state.transactions
          .slice()
          .reverse()
          .map((tx, index) => (
            <li
              key={index}
              className={`p-2 rounded ${
                tx.type === "deposit" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <span className="font-semibold capitalize">{tx.type}</span> of $
              {tx.amount} on {new Date(tx.date).toLocaleString()} —{" "}
              <span className="text-gray-500">balance: ${tx.balanceAfter}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

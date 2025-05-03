"use client";

import { useQuery } from "@tanstack/react-query";

export default function Balance() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const res = await fetch("/api/balance");
      if (!res.ok) throw new Error("Failed to load balance");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading balance...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <p className="text-xl text-gray-700 mb-6">
      Current Balance: <span className="font-semibold">${data.balance}</span>
    </p>
  );
}

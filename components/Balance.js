"use client";

import { useQuery } from "@tanstack/react-query";

export default function Balance() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["accountBalance"],
    queryFn: async () => {
      const res = await fetch("/api/account", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading balance...</p>;
  }

  if (isError || !data || typeof data.balance !== "number") {
    return <p className="text-center text-red-600">Balance unavailable</p>;
  }

  return (
    <div className="text-lg font-medium text-gray-800 text-center mt-2">
      Current Balance:{" "}
      <span className="font-bold text-black">${data.balance.toFixed(2)}</span>
    </div>
  );
}

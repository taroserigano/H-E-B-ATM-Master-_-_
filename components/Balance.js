"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import axios from "axios";

export default function Balance() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["accountBalance"],
    queryFn: async () => {
      const res = await axios.get("/api/account", {
        withCredentials: true,
      });
      return res.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 10000, // optional performance boost
  });

  const formattedBalance = useMemo(() => {
    if (typeof data?.balance === "number") {
      return `$${data.balance.toFixed(2)}`;
    }
    return null;
  }, [data]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading balance...</p>;
  }

  if (isError || !formattedBalance) {
    return (
      <p className="text-center text-red-600">
        Balance unavailable
        <br />
        {error?.message && (
          <span className="text-sm text-gray-400">({error.message})</span>
        )}
      </p>
    );
  }

  return (
    <div className="text-lg font-medium text-gray-800 text-center mt-2">
      Current Balance:{" "}
      <span className="font-bold text-black">{formattedBalance}</span>
    </div>
  );
}

"use client";

import React, { createContext, useReducer, useContext, useEffect } from "react";
import { accountReducer, initialState } from "./accountReducer";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  // ✅ Fetch initial balance from backend on first mount
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/balance", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.balance !== undefined) {
          dispatch({ type: "SET_BALANCE", payload: data.balance });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: data.error || "Failed to load balance",
          });
        }
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Network error while fetching balance",
        });
      }
    };

    fetchBalance();
  }, []);

  const deposit = async (amount) => {
    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({
          type: "SET_ERROR",
          payload: data.error || "Deposit failed",
        });
        return false;
      }

      dispatch({ type: "SET_BALANCE", payload: data.newBalance });
      return true;
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Network error" });
      return false;
    }
  };

  return (
    <AccountContext.Provider value={{ state, dispatch, deposit }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}

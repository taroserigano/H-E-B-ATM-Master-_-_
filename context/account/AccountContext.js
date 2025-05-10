"use client";

import React, { createContext, useReducer, useContext, useMemo } from "react";
import { accountReducer, initialState } from "./accountReducer";

// Create context
const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  // Stable context value
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
}

// Custom hook with guard
export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}

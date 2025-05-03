"use client";

import React, { createContext, useReducer, useContext } from "react";
import { accountReducer, initialState } from "./accountReducer";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  return (
    <AccountContext.Provider value={{ state, dispatch }}>
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

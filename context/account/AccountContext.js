"use client";

import { createContext, useContext, useReducer } from "react";
import { accountReducer, initialState } from "./accountReducer";

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
}

// Optional: custom hook
export function useAccount() {
  return useContext(AccountContext);
}

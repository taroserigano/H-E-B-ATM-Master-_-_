"use client";
import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [accountId, setAccountId] = useState(null);

  return (
    <SessionContext.Provider value={{ accountId, setAccountId }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);

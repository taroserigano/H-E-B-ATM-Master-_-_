"use client";

import { createContext, useContext, useMemo, useState } from "react";

// Default value is null for strict checking
const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [accountId, setAccountId] = useState(null);

  // Memoize context value to avoid re-renders
  const contextValue = useMemo(
    () => ({ accountId, setAccountId }),
    [accountId]
  );

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

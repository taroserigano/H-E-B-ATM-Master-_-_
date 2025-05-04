"use client";

import { ReactQueryProvider } from "@/lib/reactQueryClient";
import { SessionProvider } from "@/context/session/SessionContext";
import { AccountProvider } from "@/context/account/AccountContext";

export default function ClientLayout({ children }) {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <AccountProvider>{children}</AccountProvider>
      </SessionProvider>
    </ReactQueryProvider>
  );
}

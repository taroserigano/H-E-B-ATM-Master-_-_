"use client";

import "./globals.css";
import { AccountProvider } from "@/context/account/AccountContext";
import { SessionProvider } from "@/context/session/SessionContext";
import { ReactQueryProvider } from "@/lib/reactQueryClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <SessionProvider>
            <AccountProvider>{children}</AccountProvider>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

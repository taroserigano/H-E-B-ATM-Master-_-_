// app/layout.js
"use client";

import "./globals.css";
import { AccountProvider } from "@/context/account/AccountContext";
import { SessionProvider } from "@/context/session/SessionContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <AccountProvider>{children}</AccountProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

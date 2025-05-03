"use client";
import { Inter } from "next/font/google";

import "./globals.css";
import { AccountProvider } from "@/context/account/AccountContext";
import { SessionProvider } from "@/context/session/SessionContext";
import { ReactQueryProvider } from "@/lib/reactQueryClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <ReactQueryProvider>
          <SessionProvider>
            <AccountProvider>{children}</AccountProvider>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

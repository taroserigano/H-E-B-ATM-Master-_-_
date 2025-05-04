// ✅ This is a SERVER COMPONENT in Next.js 15
import dynamic from "next/dynamic";
import { memo } from "react";

// 🌐 Global page metadata
export const metadata = {
  title: "Dashboard | H-E-B ATM",
  description:
    "View your balance, make deposits or withdrawals, and review your transaction history.",
  openGraph: {
    title: "Dashboard | H-E-B ATM",
    description: "Your secure H-E-B ATM dashboard.",
    url: "https://heb-atm.com/dashboard",
    siteName: "H-E-B ATM",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "H-E-B ATM Dashboard",
    description:
      "Securely manage your ATM account with deposits, withdrawals, and history.",
  },
};

// 🧠 Dynamically import the Client Component with a loading fallback
const DashboardClient = dynamic(() => import("./DashboardClient"), {});

// 🚀 Memoize the client-only Dashboard to avoid re-renders
const MemoizedDashboard = memo(function DashboardWrapper() {
  return <DashboardClient />;
});

export default function DashboardPage() {
  return <MemoizedDashboard />;
}

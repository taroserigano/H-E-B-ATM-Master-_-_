// Page metadata for SEO and social sharing
export const metadata = {
  title: "Dashboard | H-E-B ATM",
  description:
    "View your balance, make deposits or withdrawals, and review your transaction history.",
  openGraph: {
    title: "Dashboard | H-E-B ATM",
    description: "Your secure H-E-B ATM dashboard.",
    url: "https://h-e-b-app-atm-master.vercel.app/dashboard",
    siteName: "H-E-B ATM",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "H-E-B ATM Dashboard",
    description:
      "Securely manage your ATM account with deposits, withdrawals, and history.",
  },
  icons: {
    icon: "/heb-logo.png",
  },
};

import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return <DashboardClient />;
}

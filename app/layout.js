import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

// Global metadata applied to all routes
export const metadata = {
  title: {
    default: "H-E-B ATM",
    template: "%s | H-E-B ATM",
  },
  description:
    "Securely manage your H-E-B ATM account. View balance, deposit, and withdraw.",
  metadataBase: "",
  icons: {
    icon: "/heb.png",
  },
  openGraph: {
    title: "H-E-B ATM",
    description:
      "ATM dashboard with secure transactions and real-time balance.",
    url: "",
    siteName: "H-E-B ATM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "H-E-B ATM",
    description:
      "ATM dashboard with secure transactions and real-time balance.",
    creator: "@MR-H-E-B",
  },
};

// Root layout wraps all pages with global styles and providers
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

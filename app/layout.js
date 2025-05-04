import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

// 🌐 Global metadata applied to ALL routes
export const metadata = {
  title: {
    default: "H-E-B ATM",
    template: "%s | H-E-B ATM",
  },

  description:
    "Securely manage your H-E-B ATM account. View balance, deposit, and withdraw.",
  metadataBase: new URL("https://your-domain.com"), // ← important for OG links
  icons: {
    icon: "/heb.png", // ✅ set custom favicon
  },
  openGraph: {
    title: "H-E-B ATM",
    description: "A full-stack ATM dashboard built with Next.js and MongoDB.",
    url: "https://your-domain.com",
    siteName: "H-E-B ATM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "H-E-B ATM",
    description:
      "ATM dashboard with secure transactions and real-time balance.",
    creator: "@heb",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

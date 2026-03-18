import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text-main antialiased">
        <Header />
        <div className="min-h-screen pt-32">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

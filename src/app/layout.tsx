import "./globals.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify OBS",
  description:
    "Display your Spotify status in OBS easily and with real-time updates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>{children}</body>
    </html>
  );
}

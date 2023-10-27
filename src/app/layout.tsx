import "./globals.css";

import type { Metadata } from "next";

import Fathom from "@/components/fathom";

import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify OBS",
  description:
    "Display your Spotify status in OBS easily and with real-time updates.",
  keywords: "spotify, obs, stream, music, now playing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Fathom />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

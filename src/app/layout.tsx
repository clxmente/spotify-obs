import "./globals.css";

import type { Metadata } from "next";

import Script from "next/script";

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
      <head>
        <script
          async
          defer
          src="https://umami.lebron.cloud/script.js"
          data-website-id="2e871321-82d7-40b9-bf4b-b3108ed511cd"
          data-auto-track="false"
        ></script>
      </head>
      <body className={`${inter.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

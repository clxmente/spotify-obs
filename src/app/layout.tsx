import "./globals.css";

import type { Metadata } from "next";

import Nav from "@/components/nav";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify OBS",
  description: "Display your Spotify status as a browser source in OBS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#010313] text-white`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

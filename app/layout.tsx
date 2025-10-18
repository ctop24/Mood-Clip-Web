import "./globals.css";

import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import React from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Toaster, ToasterProvider } from "@/components/ui/toaster";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-sans"
});

export const metadata: Metadata = {
  title: "MoodClip",
  description: "Turn your vibes into animated stickers for Microsoft Teams."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={plexSans.variable} lang="en">
      <body className="flex min-h-screen flex-col">
        <ToasterProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Toaster />
        </ToasterProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { unstable_ViewTransition as ViewTransition } from 'react'

export const metadata: Metadata = {
  title: "Streamly",
  description: "Streamly is a streaming platform that allows you to watch movies and series online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransition>
      <html lang="en">
        <body
          className={`antialiased overflow-y-auto overflow-x-hidden scheme-dark bg-neutral-950`}
      >
        <Navbar />
          {children}
        </body>
      </html>
    </ViewTransition>
  );
}

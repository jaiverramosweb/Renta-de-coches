import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"
import {
  ClerkProvider
} from '@clerk/nextjs'

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin RentalCards",
  description: "Website to rent cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <NextTopLoader color="#000"/>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

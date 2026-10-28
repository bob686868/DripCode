import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ACME Store - High Performance Streetwear & Modern Gear",
  description: "Discover curated high-performance streetwear, apparel, accessories, and AI-assisted shopping.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-neutral-900">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-neutral-900 text-neutral-100 antialiased min-h-screen`}
        >
          {children}
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}

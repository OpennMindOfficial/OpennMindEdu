

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import Script from "next/script"; // Import Script

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "OpennMind Clone",
  description: "A clone of the OpennMind UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
         {/* Desmos API Script - ensure it loads before interactive */}
         <Script
           src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
           strategy="beforeInteractive" // Load before page becomes interactive
         />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased", // Removed overflow-hidden from body
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
           {/* Wrap children for potential page transitions */}
           {children}
           <Toaster /> {/* Add Toaster back */}
        </ThemeProvider>
      </body>
    </html>
  );
}

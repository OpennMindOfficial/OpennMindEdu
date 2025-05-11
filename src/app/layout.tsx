
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "OpennMind Clone", // Will be overridden by landing page, but good default
  description: "A clone of the OpennMind UI", // Will be overridden
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
         {/* Desmos script is not needed for heexo landing page, can be removed if only landing page exists */}
         {/* <Script
           src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
           strategy="beforeInteractive"
         /> */}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Set light theme as default for heexo landing
          enableSystem
          disableTransitionOnChange
        >
           {children}
           {/* <FloatingNav /> Removed as not part of heexo landing page specific request */}
           <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

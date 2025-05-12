
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { FloatingNav } from "@/components/layout/floating-nav"; // Keep if used on specific pages

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "OpennMind Clone", 
  description: "An AI-powered learning platform.", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
         {/* Desmos script is loaded here for calculator tools */}
         <Script
           src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
           strategy="beforeInteractive"
         />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Set dark theme as default for dashboard
          enableSystem
          disableTransitionOnChange
        >
           {children}
           {/* FloatingNav is not globally in root layout, will be added to specific pages if needed */}
           <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

    
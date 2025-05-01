import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingNav } from "@/components/layout/floating-nav";
import Script from "next/script"; // Import Script component

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Desmos API Script */}
        <Script
            src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
            strategy="beforeInteractive" // Load before page is interactive
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
          {/* Added relative positioning and overflow-hidden container for RND bounds */}
          <div className="relative min-h-screen w-full overflow-hidden">
             {children}
             <FloatingNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

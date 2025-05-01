import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingNav } from "@/components/layout/floating-nav";

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-hidden", // Added overflow-hidden to prevent body scroll with RND
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Added relative positioning container for RND bounds */}
          <div className="relative min-h-screen w-full">
             {children}
             <FloatingNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


'use client'; // Make Header a client component for useEffect and refs

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, CircleHelp, Settings, Bug, GraduationCap } from "lucide-react"; // Added GraduationCap back
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { SparkleButton } from '@/components/common/sparkle-button';
import { ShieldQuestion } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image'; // Import next/image
import { useTheme } from 'next-themes'; // Import useTheme

// Import local images for logo
import lightThemeLogo from '@/app/lt.png';
import darkThemeLogo from '@/app/dt.png';

export function Header() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const [currentLogo, setCurrentLogo] = useState(lightThemeLogo); // Default to light theme logo

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        !document.activeElement?.isContentEditable
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Update logo based on theme
    setCurrentLogo(theme === 'dark' ? darkThemeLogo : lightThemeLogo);
  }, [theme]);

  return (
    <motion.header
      className="flex items-center justify-between h-16 px-6 border-b bg-card shrink-0"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4">
         {/* Logo Section */}
         <div className="flex items-center gap-2 font-bold text-lg text-foreground">
            <div className="flex items-center justify-center"> {/* Removed background and padding */}
             <Image
                src={currentLogo}
                alt="OpennMind Logo"
                width={20} 
                height={20} 
                className="w-5 h-5" 
              />
            </div>
             OpennMind
             <ShieldQuestion className="w-4 h-4 text-muted-foreground ml-[-4px]" />
         </div>
      </div>

      {/* Search Bar - Centered and Max Width */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search for anything... (Press '/' to focus)"
            className="pl-10 w-full bg-background md:bg-muted dark:bg-input rounded-lg"
          />
        </div>
      </div>

      {/* Right Side Icons & Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95">
          <CircleHelp className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        <SparkleButton className="px-4 hover:scale-105 active:scale-95">
            Upgrade
        </SparkleButton>

        <ThemeToggle />

        <Link href="/settings" passHref legacyBehavior>
          <a>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
            </Button>
          </a>
        </Link>

        <Link href="/bug-report" passHref legacyBehavior>
           <a>
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:scale-105 active:scale-95 group">
                 <Bug className="h-5 w-5 text-red-400 dark:text-red-500 group-hover:text-destructive" />
                 <span className="sr-only">Report a Bug</span>
             </Button>
           </a>
        </Link>
      </div>
    </motion.header>
  );
}

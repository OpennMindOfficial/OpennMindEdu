
'use client'; // Make Header a client component for useEffect and refs

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, CircleHelp, Settings, GraduationCap, Bug } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { SparkleButton } from '@/components/common/sparkle-button'; // Import the new SparkleButton
import { ShieldQuestion } from 'lucide-react'; // Ensure ShieldQuestion is imported
import { motion } from 'framer-motion'; // Import motion
import React, { useRef, useEffect } from 'react'; // Import useRef and useEffect

export function Header() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key pressed is '/' and the target is not an input/textarea/contentEditable
      if (
        event.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        !document.activeElement?.isContentEditable
      ) {
        event.preventDefault(); // Prevent typing '/' in the body
        searchInputRef.current?.focus(); // Focus the search input
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount


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
            <div className="bg-foreground text-background rounded-md p-1.5"> {/* Adjusted padding and rounding */}
             {/* Using GraduationCap directly */}
             <GraduationCap className="w-5 h-5" strokeWidth={2} />
            </div>
             OpennMind
             {/* Using ShieldQuestion directly */}
             <ShieldQuestion className="w-4 h-4 text-muted-foreground ml-[-4px]" /> {/* Adjusted margin */}
         </div>
      </div>

      {/* Search Bar - Centered and Max Width */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef} // Add ref to the input
            type="search"
            placeholder="Search for anything... (Press '/' to focus)" // Update placeholder
            className="pl-10 w-full bg-background md:bg-muted dark:bg-input rounded-lg" // Changed to rounded-lg
          />
        </div>
      </div>

      {/* Right Side Icons & Buttons */}
      <div className="flex items-center gap-2"> {/* Reduced gap */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95">
          <CircleHelp className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        {/* Upgrade Button - Using SparkleButton */}
        <SparkleButton className="px-4 hover:scale-105 active:scale-95"> {/* Use px-4 for padding and add bubble effect */}
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


        {/* Bug Report Button */}
        <Link href="/bug-report" passHref legacyBehavior>
           <a>
             {/* Apply destructive color on hover */}
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:scale-105 active:scale-95">
                 <Bug className="h-5 w-5 text-red-500 dark:text-red-400 group-hover:text-destructive" /> {/* Direct color + group hover */}
                 <span className="sr-only">Report a Bug</span>
             </Button>
           </a>
        </Link>
      </div>
    </motion.header>
  );
}

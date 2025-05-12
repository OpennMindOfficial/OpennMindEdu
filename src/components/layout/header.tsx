
'use client'; 

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, CircleHelp, Settings, Bug } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { SparkleButton } from '@/components/common/sparkle-button';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';


export function Header() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  // Logo related state removed as logo is now in sidebar

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


  return (
    <motion.header
      className="flex items-center justify-between h-16 px-6 border-b bg-card shrink-0"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Left side of header is now empty or can have a menu toggle if sidebar is collapsible by header button */}
      <div className="flex items-center gap-4">
         {/* Placeholder for potential future use or can be removed if sidebar toggle is solely in sidebar */}
      </div>

      {/* Search Bar - Centered and Max Width */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-2xl"> {/* Increased max-width for search bar */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search for anything... (Press '/' to focus)"
            className="pl-10 w-full bg-background md:bg-muted dark:bg-input rounded-lg h-10" // Increased height if needed
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
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-destructive/10 hover:scale-105 active:scale-95 group">
                 <Bug className="h-5 w-5 text-red-400 dark:text-red-500 group-hover:text-destructive" />
                 <span className="sr-only">Report a Bug</span>
             </Button>
           </a>
        </Link>
      </div>
    </motion.header>
  );
}

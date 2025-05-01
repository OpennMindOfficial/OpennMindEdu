
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Wrench, // For Tools
  HelpCircle, // For Ask Doubt
  Notebook, // For Notes
  Github,
  Slack,
  FileText, // Example icon for demo data
  BookOpen, // Example icon for demo data
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator'; // Import Separator
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion

interface FloatingNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
}

function FloatingNavItem({ href, icon: Icon, label, isActive, onMouseEnter }: FloatingNavItemProps) {
  return (
    <Link href={href} legacyBehavior passHref>
      <a
        onMouseEnter={onMouseEnter}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-200 px-4 py-2 cursor-pointer', // Base styles, added cursor-pointer
          // Active state: Darker background, brighter text
          isActive
            ? 'bg-foreground/10 dark:bg-foreground/20 text-foreground shadow-inner' // Adjusted active style
            // Inactive state: Muted text, subtle gray background on hover
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
        )}
      >
        <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
        <span className="relative z-10">{label}</span>
      </a>
    </Link>
  );
}

// Demo data for the popover content - updated keys and content
const demoData: { [key: string]: { icon: React.ElementType, title: string; date: string; href: string }[] } = {
  Tools: [
    { icon: Wrench, title: 'PDF Converter', date: 'Jul, 2024', href: '#' },
    { icon: Github, title: 'Code Snippets', date: 'Jun, 2024', href: '#' },
  ],
  "Ask Doubt": [
    { icon: HelpCircle, title: 'Ask the Community', date: 'Jul, 2024', href: '#' },
    { icon: Slack, title: 'Chat with AI Tutor', date: 'Jun, 2024', href: '#' },
  ],
  Notes: [
    { icon: Notebook, title: 'My Math Notes', date: 'Jul, 2024', href: '#' },
    { icon: FileText, title: 'Science Chapter 1', date: 'Jun, 2024', href: '#' },
    { icon: BookOpen, title: 'History Timeline', date: 'May, 2024', href: '#' },
  ],
};

export function FloatingNav() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false); // Track hover on the nav itself

  // Updated nav items
  const navItems = [
    { href: '/tools-placeholder', icon: Wrench, label: 'Tools' },
    { href: '/ask-doubt-placeholder', icon: HelpCircle, label: 'Ask Doubt' },
    { href: '/notes-placeholder', icon: Notebook, label: 'Notes' },
  ];

  const popoverVariants = {
    hidden: { opacity: 0, y: 10, height: 0, marginBottom: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', marginBottom: '0.5rem' }, // Add margin-bottom when visible
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      onMouseEnter={() => setIsHoveringNav(true)}
      onMouseLeave={() => {
        setIsHoveringNav(false);
        setHoveredItem(null); // Close popover when leaving the entire nav area
      }}
    >
      {/* Popover Content Area */}
      <AnimatePresence>
        {hoveredItem && demoData[hoveredItem] && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={popoverVariants}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-[320px] bg-secondary/80 dark:bg-secondary/70 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden mb-2" // Style matches image
          >
            <div className="p-4 space-y-2">
              {demoData[hoveredItem].map((item, index) => (
                <React.Fragment key={index}>
                  <Link href={item.href} legacyBehavior passHref>
                    <a className="flex items-center justify-between text-sm text-foreground hover:text-primary group">
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">{item.date}</span>
                    </a>
                  </Link>
                  {index < demoData[hoveredItem].length - 1 && <Separator className="bg-border/50 my-1" />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div
        className="bg-secondary/80 dark:bg-secondary/70 rounded-full shadow-lg backdrop-blur-sm p-1 relative" // Keep padding p-1
      >
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => {
            // Check if the current path matches the item's href. Handle the root path '/' specifically.
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && item.href !== '/';
            return (
              <FloatingNavItem
                key={item.href}
                {...item}
                isActive={isActive}
                onMouseEnter={() => setHoveredItem(item.label)}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}

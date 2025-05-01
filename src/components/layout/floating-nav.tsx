
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  // Use appropriate icons based on the target design
  AppWindow, // For Apps
  Code, // For Components
  Link2, // For Notes
} from 'lucide-react';
import { usePathname } from 'next/navigation'; // Import usePathname

interface FloatingNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

function FloatingNavItem({ href, icon: Icon, label, isActive }: FloatingNavItemProps) {
  return (
    <Link href={href} legacyBehavior passHref>
      <a
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-200 px-4 py-2', // Base styles
          // Active state: Darker text, no specific background unless needed
          isActive
            ? 'text-foreground'
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

export function FloatingNav() {
  const pathname = usePathname(); // Get current path
  const navItems = [
    // Updated items based on the image
    { href: '/', icon: AppWindow, label: 'Apps' },
    { href: '/components-placeholder', icon: Code, label: 'Components' }, // Placeholder link
    { href: '/notes-placeholder', icon: Link2, label: 'Notes' }, // Placeholder link
  ];

  return (
    // Container with slight transparency and blur
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-secondary/80 dark:bg-secondary/70 rounded-full shadow-lg backdrop-blur-sm z-50 p-1" // Keep padding p-1 for visual spacing around items
    >
      <nav className="flex items-center space-x-1 relative">
        {/* Render actual nav items - Hover effect is now handled within FloatingNavItem */}
        {navItems.map((item) => (
          <FloatingNavItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </div>
  );
}


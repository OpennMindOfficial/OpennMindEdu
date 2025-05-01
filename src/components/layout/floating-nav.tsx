
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Home,
  LayoutDashboard, // Used for All Subjects
  MessageSquare, // Used for Chat
  FileText, // Used for Predicted Papers
  Lightbulb, // Used for Predict Grade
  // Icons matching the new design
  AppWindow, // For Apps
  Code, // For Components
  Link2, // For Notes (Link is a good representation)
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
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-300 px-4 py-2', // Adjusted padding
          // Use foreground/background for text/bg
          isActive
            ? 'bg-background text-foreground shadow-inner' // Active state style
            : 'text-muted-foreground hover:text-foreground' // Inactive state style
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
    // Keep original items for reference or future use if needed, commented out
    // { href: '/', icon: Home, label: 'Home' },
    // { href: '/all-subjects', icon: LayoutDashboard, label: 'Subjects' },
    // { href: '/chat', icon: MessageSquare, label: 'Chat' },
    // { href: '/predicted-papers', icon: FileText, label: 'Papers' },
    // { href: '/predict-grade', icon: Lightbulb, label: 'Grade' },
  ];

  // State to track the bounding box of the hovered item
  const [hoveredItemRect, setHoveredItemRect] = useState<DOMRect | null>(null);
  const navRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const navItem = target.closest('a'); // Find the closest link ancestor
    if (navItem && navRef.current) {
      const itemRect = navItem.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      // Calculate relative position
      setHoveredItemRect(new DOMRect(
        itemRect.left - navRect.left,
        itemRect.top - navRect.top,
        itemRect.width,
        itemRect.height
      ));
    }
  };

  const handleMouseLeave = () => {
    setHoveredItemRect(null); // Clear hover state when mouse leaves the container
  };

  return (
    // Container with slight transparency and blur
    <div
      ref={navRef}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-secondary/80 dark:bg-secondary/70 rounded-full shadow-lg backdrop-blur-sm z-50 p-1" // Add padding for the hover effect
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex items-center space-x-1 relative">
        {/* Animated background indicator */}
        {hoveredItemRect && (
          <div
            className="absolute bg-background rounded-full transition-all duration-300 ease-out shadow-md"
            style={{
              left: `${hoveredItemRect.left}px`,
              top: `${hoveredItemRect.top}px`,
              width: `${hoveredItemRect.width}px`,
              height: `${hoveredItemRect.height}px`,
              zIndex: 0, // Ensure it's behind the text/icons
            }}
          />
        )}
        {/* Render actual nav items */}
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

'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Home,
  LayoutDashboard, // Used for All Subjects
  MessageSquare, // Used for Chat
  FileText, // Used for Predicted Papers
  Lightbulb, // Used for Predict Grade
} from 'lucide-react';

interface FloatingNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

function FloatingNavItem({ href, icon: Icon, label, isActive }: FloatingNavItemProps) {
  return (
    <Link href={href} passHref>
      <a
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 focus-visible:scale-105 px-3 py-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/80',
          isActive ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'
        )}
      >
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </a>
    </Link>
  );
}

export function FloatingNav() {
  const pathname = '/'; // Replace with actual path if needed
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/all-subjects', icon: LayoutDashboard, label: 'Subjects' },
    { href: '/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/predicted-papers', icon: FileText, label: 'Papers' },
    { href: '/predict-grade', icon: Lightbulb, label: 'Grade' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-secondary/90 dark:bg-secondary/80 rounded-full shadow-md backdrop-blur-sm z-50 py-2 px-3">
      <nav className="flex items-center space-x-2">
        {navItems.map((item) => (
          <FloatingNavItem key={item.href} {...item} isActive={pathname === item.href} />
        ))}
      </nav>
    </div>
  );
}

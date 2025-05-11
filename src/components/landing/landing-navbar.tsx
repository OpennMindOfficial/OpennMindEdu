'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react'; // Using Layers as a placeholder for four-dot icon

export function LandingNavbar() {
  const navLinks = [
    { href: '#why-heexo', label: 'Why heexo?' },
    { href: '#platform', label: 'Platform' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#changelog', label: 'Changelog' },
  ];

  return (
    <nav className="py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/landing" className="flex items-center gap-2 text-xl font-bold text-foreground">
          {/* Replace with actual four-dot icon or SVG if available */}
          <Layers className="w-6 h-6 text-primary" />
          heexo
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
          Book a demo
        </Button>
      </div>
    </nav>
  );
}

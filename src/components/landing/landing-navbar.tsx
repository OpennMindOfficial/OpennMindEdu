
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react'; // Placeholder logo icon
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import OpennMindLogoLight from '@/app/lt.png';
import OpennMindLogoDark from '@/app/dt.png';
import { type StaticImageData } from 'next/image';


export function LandingNavbar() {
  const { theme } = useTheme();
  const [currentLogo, setCurrentLogo] = useState<StaticImageData>(OpennMindLogoLight);

  useEffect(() => {
    setCurrentLogo(theme === 'dark' ? OpennMindLogoDark : OpennMindLogoLight);
  }, [theme]);

  const navLinks = [
    { href: '#features', label: 'Why OpennMind?' },
    { href: '#platform', label: 'Platform' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#changelog', label: 'Changelog' },
  ];

  return (
    <nav className="py-4 sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/landing" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
          <Image src={currentLogo} alt="OpennMind Logo" width={28} height={28} priority />
          OpennMind
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
          Book a demo
        </Button>
      </div>
    </nav>
  );
}

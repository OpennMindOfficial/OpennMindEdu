'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator"; // Import Separator
import {
  Settings, // Account settings
  ChevronLeft, // For Collapse icon
  Home,
  MessageSquare,
  FileText,
  Lightbulb,
  PlusCircle,
  HelpCircle,
  BookOpen,
  FileStack,
  Bookmark,
  GraduationCap, // OpennMind logo icon
  ChevronDown, // Added for dropdown indicator
  Clock, // Import Clock icon
} from 'lucide-react';
import * as React from 'react';
import { motion } from 'framer-motion'; // Import motion

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badgeCount?: number;
  secondaryText?: string;
  isSubItem?: boolean;
  isActive?: boolean;
  isDropdown?: boolean; // Flag for dropdown items like Q4 updates
}

// Updated NavItem for active state styling and hover animation
function NavItem({
  href,
  icon: Icon,
  label,
  badgeCount,
  secondaryText,
  isSubItem,
  isActive,
  isDropdown,
}: NavItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link href={href} legacyBehavior passHref>
      <motion.a
        className={cn(
          'relative flex items-center justify-between text-sm font-medium transition-colors h-9 px-3 rounded-md group', // Added group class, removed background classes
          isSubItem ? 'pl-9' : '', // Indent sub-items
          isActive
            ? 'text-foreground' // Active text color
            : 'text-muted-foreground hover:text-foreground', // Inactive text color and hover
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Animated Background Highlight */}
        {(isHovered || isActive) && (
            <motion.span
                layoutId="sidebarHighlight" // Unique ID for layout animation
                className="absolute inset-0 z-0 rounded-md bg-muted dark:bg-muted/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
            />
        )}

        {/* Content (Icon, Label, Badge) - Ensure it's above the highlight */}
        <div className="relative z-10 flex items-center overflow-hidden flex-grow"> {/* Use flex-grow */}
            <Icon className={cn("h-4 w-4 mr-3 flex-shrink-0", isActive ? "text-foreground" : "")} />
            <span className="truncate">{label}</span> {/* Truncate long labels */}
            {isDropdown && <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />}
        </div>
        <div className="relative z-10 flex items-center ml-2 flex-shrink-0"> {/* Container for badge/secondary text */}
            {badgeCount && (
                <Badge
                 variant="count" // Use count variant
                 className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-xs font-semibold" // Simplified classes
                 >
                 {badgeCount}
                </Badge>
            )}
            {secondaryText && (
                <span className="text-xs text-muted-foreground">{secondaryText}</span>
            )}
        </div>
      </motion.a>
    </Link>
  );
}

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

function NavSection({ title, children }: NavSectionProps) {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {title}
      </h2>
      <div className="grid items-start gap-0.5">{children}</div>
    </div>
  );
}

export function Sidebar() {
    const pathname = usePathname();

    // OpennMind specific items (Study Tools)
    const opennMindItems = [
        { href: '/chat', icon: MessageSquare, label: 'Chat With Jojo'},
        { href: '/predicted-papers', icon: FileText, label: 'Predicted Papers'},
        { href: '/predict-grade', icon: Lightbulb, label: 'Predict Grade' },
        { href: '/mock-exams', icon: PlusCircle, label: 'Mock Exams'},
        { href: '/timed-exams', icon: Clock, label: 'Timed Exams'}, // Added timed exams
        { href: '/questionbank', icon: HelpCircle, label: 'Questionbank'},
        { href: '/notes', icon: BookOpen, label: 'Notes'},
        { href: '/pdf-to-notes', icon: FileStack, label: 'PDF To Notes'},
        { href: '/saved', icon: Bookmark, label: 'Saved'},
        { href: '/all-subjects', icon: Home, label: 'All Subjects'},
    ];


  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card shrink-0 h-screen"> {/* Adjusted width */}
        {/* Top Section - OpennMind Branding */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center gap-2">
                <div className="bg-foreground text-background rounded-md p-1.5">
                     <GraduationCap className="w-5 h-5" strokeWidth={2} />
                </div>
                 <span className="font-semibold text-sm">OpennMind</span>
                 <Badge variant="outline" className="border-primary/50 text-primary text-[9px] px-1.5 py-0 leading-tight">
                    FREE
                 </Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                 <ChevronLeft className="h-4 w-4" />
                 <ChevronLeft className="h-4 w-4 -ml-2" /> {/* Double chevron */}
            </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
            {/* OpennMind Specific Section */}
             <NavSection title="Study Tools">
                  {opennMindItems.map((item) => (
                    <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                  ))}
             </NavSection>

        </ScrollArea>

        {/* Bottom Section */}
        <div className="mt-auto p-3 border-t">
            <NavItem href="/settings" icon={Settings} label="Account settings" isActive={pathname === '/settings'} />
        </div>
    </aside>
  );
}

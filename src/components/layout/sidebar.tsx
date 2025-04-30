'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  LayoutDashboard, // Used for All Subjects
  MessageSquare, // Used for Chat
  FileText, // Used for Predicted Papers
  Lightbulb, // Used for Predict Grade
  PlusCircle, // Used for Mock Exams
  Clock, // Used for Timed Exams
  HelpCircle, // Used for Questionbank (consider CircleHelp if more appropriate)
  BookOpen, // Used for Notes
  FileStack, // Used for PDF to Notes
  Bookmark, // Used for Saved
  ChevronDown
} from 'lucide-react';
import { Badge } from "@/components/ui/badge"; // Import Badge component
import * as React from 'react';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isNew?: boolean;
  isActive?: boolean;
}

// Updated NavItem for active state styling matching the screenshot
function NavItem({ href, icon: Icon, label, isNew, isActive }: NavItemProps) {
  return (
    <Link href={href} legacyBehavior passHref>
      <Button
        variant={isActive ? 'secondary' : 'ghost'} // Use secondary for active, ghost for inactive
        className={cn(
          'w-full justify-start text-sm font-medium transition-all h-9 px-3', // Use button base styles
          isActive
            ? 'bg-primary/10 text-primary dark:bg-primary dark:text-primary-foreground' // Active state with purple background/text
            : 'text-muted-foreground hover:text-foreground hover:bg-muted', // Inactive state
        )}
      >
        <Icon className={cn("h-4 w-4 mr-3", isActive ? "text-primary dark:text-primary-foreground" : "")} />
        {label}
        {isNew && (
          <Badge variant="default" className="ml-auto flex h-5 shrink-0 items-center justify-center rounded-full bg-blue-500 px-2 text-[10px] font-medium text-white"> {/* Use default badge, style overrides */}
            New
          </Badge>
        )}
      </Button>
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
      <h2 className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70"> {/* Adjusted title style */}
        {title}
      </h2>
      <div className="grid items-start gap-1">{children}</div>
    </div>
  );
}

export function Sidebar() {
    const pathname = usePathname();
    const [isFreePlan] = React.useState(true); // Assuming free plan for styling

    // Adjusted icons based on screenshot
    const navItems = [
        { href: '/', icon: Home, label: 'Home'},
        { href: '/all-subjects', icon: LayoutDashboard, label: 'All Subjects'},
        { href: '/chat', icon: MessageSquare, label: 'Chat With Jojo'},
        { href: '/predicted-papers', icon: FileText, label: 'Predicted Papers', isNew: true },
        { href: '/predict-grade', icon: Lightbulb, label: 'Predict Grade', isNew: true },
    ];

    const examPrepItems = [
        { href: '/mock-exams', icon: PlusCircle, label: 'Mock Exams'},
        { href: '/timed-exams', icon: Clock, label: 'Timed Exams'},
    ];

    const studyWithItems = [
        { href: '/questionbank', icon: HelpCircle, label: 'Questionbank'}, // Changed Icon
        { href: '/notes', icon: BookOpen, label: 'Notes'},
    ];

     const toolsItems = [
        { href: '/pdf-to-notes', icon: FileStack, label: 'PDF To Notes'},
     ];

    const myStuffItems = [
        { href: '/saved', icon: Bookmark, label: 'Saved'},
    ];

  return (
    // Sidebar styling adjustments
    <aside className="hidden md:flex flex-col w-60 border-r bg-card shrink-0 h-screen"> {/* Adjusted width */}
        <ScrollArea className="flex-1 py-4">
            {/* Top Dropdown - Matched styling */}
            <div className="px-4 mb-4">
                <Button variant="outline" className="w-full justify-between border-muted-foreground/30 h-9 text-sm font-normal text-foreground px-3"> {/* Adjusted padding */}
                    <span>CBSE</span>
                    <div className='flex items-center gap-1'>
                        <Badge variant={isFreePlan ? 'secondary' : 'primary'} className={cn(
                          "text-[10px] font-semibold px-1.5 py-0.5 rounded-sm h-auto", // Adjusted styling
                           isFreePlan ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300 border-transparent" : "" // Specific free plan styles
                           )}>
                         {isFreePlan ? "FREE" : "PRO"}
                        </Badge>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                </Button>
            </div>

            {/* Navigation Items - Adjusted gap */}
            <nav className="grid items-start gap-0.5 px-3">
                {navItems.map((item) => (
                <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
            </nav>

            <NavSection title="Exam Prep">
                {examPrepItems.map((item) => (
                <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
            </NavSection>

            <NavSection title="Study With">
                {studyWithItems.map((item) => (
                <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
            </NavSection>

             <NavSection title="Tools">
                 {toolsItems.map((item) => (
                 <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                 ))}
             </NavSection>

             <NavSection title="My Stuff">
                 {myStuffItems.map((item) => (
                 <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                 ))}
             </NavSection>

        </ScrollArea>
         {/* Removed Logout section as it's not in the screenshot */}
    </aside>
  );
}

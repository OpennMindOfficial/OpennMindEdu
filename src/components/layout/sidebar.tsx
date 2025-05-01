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
  LayoutDashboard, // Dashboard
  Bell, // Notifications
  FolderOpen, // Q4 Updates (example)
  BarChart3, // Q4 Conversions (example)
  Users, // Q4 Customers (example)
  BarChartHorizontal, // Weekly Update (example)
  UsersRound, // Non-staff site visit (example)
  Users2, // Cohorts
  Filter, // Funnels
  CheckCircle2, // Conversions
  BarChart2, // Reports
  Clock, // Recent sessions
  Settings, // Account settings
  ChevronDown,
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
} from 'lucide-react';
import * as React from 'react';

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

// Updated NavItem for active state styling matching the screenshot
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
  return (
    <Link href={href} legacyBehavior passHref>
      <a
        className={cn(
          'flex items-center justify-between text-sm font-medium transition-colors h-9 px-3 rounded-md', // Adjusted rounding and height
          isSubItem ? 'pl-9' : '', // Indent sub-items
          isActive
            ? 'bg-muted text-foreground dark:bg-muted/50' // Active state background
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50', // Inactive state
        )}
      >
        <div className="flex items-center overflow-hidden"> {/* Container for icon and label */}
            <Icon className={cn("h-4 w-4 mr-3 flex-shrink-0", isActive ? "text-foreground" : "")} />
            <span className="truncate">{label}</span> {/* Truncate long labels */}
            {isDropdown && <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />}
        </div>
        <div className="flex items-center ml-2 flex-shrink-0"> {/* Container for badge/secondary text */}
            {badgeCount && (
                <Badge
                 variant="secondary" // Use secondary variant for subtle background
                 className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-xs font-semibold bg-muted text-foreground border border-border/50" // Adjust badge style
                 >
                 {badgeCount}
                </Badge>
            )}
            {secondaryText && (
                <span className="text-xs text-muted-foreground">{secondaryText}</span>
            )}
        </div>
      </a>
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

    // Example data structure matching the image
    const mainNavItems = [
        { href: '/', icon: LayoutDashboard, label: 'Dashboard'},
        { href: '/notifications', icon: Bell, label: 'Notifications', badgeCount: 8},
    ];

    const favouritesItems = [
        { href: '#', icon: FolderOpen, label: 'Q4 updates', isDropdown: true }, // Placeholder for dropdown
        { href: '/q4-conversions', icon: BarChart3, label: 'Q4 conversions', secondaryText: 'Report', isSubItem: true },
        { href: '/q4-customers', icon: Users, label: 'Q4 customers', secondaryText: 'Cohort', isSubItem: true },
        { href: '/weekly-update', icon: BarChartHorizontal, label: 'Weekly update', secondaryText: 'Report', isSubItem: true },
        { href: '/non-staff-visits', icon: UsersRound, label: 'Non-staff site visit...', secondaryText: 'Cohort', isSubItem: true },
    ];

    const analysisItems = [
        { href: '/cohorts', icon: Users2, label: 'Cohorts'},
        { href: '/funnels', icon: Filter, label: 'Funnels'},
        { href: '/conversions', icon: CheckCircle2, label: 'Conversions'},
    ];

    const reportsItems = [
        { href: '/reports', icon: BarChart2, label: 'Reports'},
        { href: '/recent-sessions', icon: Clock, label: 'Recent sessions'},
    ];

    // OpennMind specific items (Can be integrated or kept separate)
    const opennMindItems = [
        { href: '/chat', icon: MessageSquare, label: 'Chat With Jojo'},
        { href: '/predicted-papers', icon: FileText, label: 'Predicted Papers', isNew: true },
        { href: '/predict-grade', icon: Lightbulb, label: 'Predict Grade', isNew: true },
        { href: '/mock-exams', icon: PlusCircle, label: 'Mock Exams'},
        { href: '/timed-exams', icon: Clock, label: 'Timed Exams'},
        { href: '/questionbank', icon: HelpCircle, label: 'Questionbank'},
        { href: '/notes', icon: BookOpen, label: 'Notes'},
        { href: '/pdf-to-notes', icon: FileStack, label: 'PDF To Notes'},
        { href: '/saved', icon: Bookmark, label: 'Saved'},
        { href: '/all-subjects', icon: Home, label: 'All Subjects'}, // Example re-integration
    ];


  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card shrink-0 h-screen"> {/* Adjusted width */}
        {/* Top Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center gap-2">
                 <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                         OM {/* Initials for OpennMind */}
                    </AvatarFallback>
                 </Avatar>
                 <span className="font-semibold text-sm">OpennMind</span>
                 <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                 <ChevronLeft className="h-4 w-4" />
                 <ChevronLeft className="h-4 w-4 -ml-2" /> {/* Double chevron */}
            </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
            {/* Main Navigation */}
            <nav className="grid items-start gap-0.5 px-3 mb-4">
                {mainNavItems.map((item) => (
                   <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
            </nav>

            <Separator className="mx-4 mb-4" />

            {/* Favourites Section */}
            <NavSection title="Favourites">
                {favouritesItems.map((item) => (
                   <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
            </NavSection>

            <Separator className="mx-4 my-4" />

             {/* Analysis Section */}
            <NavSection title="Analysis">
                 {analysisItems.map((item) => (
                   <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                 ))}
            </NavSection>

            <Separator className="mx-4 my-4" />

             {/* Reports Section */}
             <NavSection title="Reports">
                  {reportsItems.map((item) => (
                    <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                  ))}
             </NavSection>

            <Separator className="mx-4 my-4" />

            {/* OpennMind Specific Section */}
             <NavSection title="OpennMind Tools">
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

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  Home,
  MessageSquare, // Keep for potential re-use, represents chat
  FileText,
  Lightbulb,
  PlusCircle,
  HelpCircle,
  BookOpen,
  FileStack,
  Bookmark,
  ChevronDown,
  Clock,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  Gamepad2,
  Layers,
  BookOpenCheck,
  Target,
  Send,
} from 'lucide-react';
import * as React from 'react';
import { motion } from 'framer-motion';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badgeCount?: number;
  secondaryText?: string;
  isSubItem?: boolean;
  isActive?: boolean;
  isDropdown?: boolean;
}

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
          'relative flex items-center justify-between text-sm font-medium transition-colors h-9 px-3 rounded-md group',
          isSubItem ? 'pl-9' : '',
          isActive
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {(isHovered || isActive) && (
            <motion.span
                layoutId="sidebarHighlight"
                className="absolute inset-0 z-0 rounded-md bg-muted dark:bg-muted/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
            />
        )}
        <div className="relative z-10 flex items-center overflow-hidden flex-grow">
             <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex-shrink-0 mr-3"
             >
                <Icon className={cn("h-4 w-4", isActive ? "text-foreground" : "")} />
             </motion.div>
            <span className="truncate">{label}</span>
            {isDropdown && <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />}
        </div>
        <div className="relative z-10 flex items-center ml-2 flex-shrink-0">
            {badgeCount && (
                <Badge
                 variant="count"
                 className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-xs font-semibold"
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
    const [suggestion, setSuggestion] = React.useState("");
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const handleSuggestionSubmit = () => {
      console.log("Board change suggestion submitted:", suggestion);
      setSuggestion("");
      setIsPopupOpen(false); // Close popup after submission
      // Add logic to send the suggestion
    };

    // Order based on assumed priority/frequency of use
    const opennMindItems = [
        { href: '/ask-doubt', icon: Lightbulb, label: 'Ask Doubt'}, // Corrected link
        { href: '/notes', icon: BookOpen, label: 'Notes'},
        { href: '/mock-exams', icon: PlusCircle, label: 'Mock Exams'},
        { href: '/timed-exams', icon: Clock, label: 'Timed Exams'},
        { href: '/questionbank', icon: HelpCircle, label: 'Questionbank'},
        { href: '/study-plan', icon: CalendarCheck, label: 'Study Plan'},
        { href: '/performance-tracking', icon: TrendingUp, label: 'Performance Tracking'},
        { href: '/ncert-explanations', icon: BookOpenCheck, label: 'NCERT Explanations'},
        { href: '/pdf-to-notes', icon: FileStack, label: 'PDF To Notes'},
        { href: '/saved', icon: Bookmark, label: 'Saved'},
        { href: '/predicted-papers', icon: FileText, label: 'Predicted Papers'},
        { href: '/predict-grade', icon: Lightbulb, label: 'Predict Grade' },
        { href: '/all-subjects', icon: Home, label: 'All Subjects'},
        { href: '/exam-mode', icon: Target, label: 'Exam Mode'},
        { href: '/extra-courses', icon: Layers, label: 'Extra Courses'},
        { href: '/fun-shun', icon: Gamepad2, label: 'Fun Shun'},
    ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card shrink-0 h-screen">
        <div className="flex items-center justify-between h-16 px-3 border-b">
            <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
              <DialogTrigger asChild>
                 <Button
                     variant="outline"
                     className={cn(
                         "w-full justify-between border-muted-foreground/30 h-9 text-sm font-normal text-foreground px-3",
                         "hover:bg-muted/50",
                         "hover:scale-100 active:scale-100"
                     )}
                 >
                     <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span className="font-medium">CBSE</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                         <Badge variant="free" className="px-1.5 py-0.5 text-[10px] leading-tight">FREE</Badge>
                         <ChevronDown className="h-4 w-4 text-muted-foreground" />
                     </div>
                 </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Changing Board - Under Development
                  </DialogTitle>
                  <DialogDescription>
                    The ability to change your educational board is coming soon!
                    This will allow you to access content tailored to different curricula.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                   <p className="text-sm text-muted-foreground">
                     We appreciate your patience as we work on this feature.
                   </p>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Suggest a Board or Feature</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      What board are you interested in? Or any specific features related to board selection?
                    </p>
                    <Textarea
                      placeholder="E.g., ICSE Board, State Boards, specific exam patterns..."
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      className="mb-3 min-h-[100px] bg-background dark:bg-input"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsPopupOpen(false);
                      setSuggestion(""); // Clear suggestion if cancelled
                    }}
                    className="hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSuggestionSubmit}
                    disabled={!suggestion.trim()}
                    className="hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Suggestion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>

        <ScrollArea className="flex-1 py-4">
             <NavSection title="Study Tools">
                  {opennMindItems.map((item) => (
                    <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                  ))}
             </NavSection>
        </ScrollArea>

        <div className="mt-auto p-3 border-t">
            <NavItem href="/settings" icon={Settings} label="Account settings" isActive={pathname === '/settings'} />
        </div>
    </aside>
  );
}

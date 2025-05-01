'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Wrench, // For Tools
  HelpCircle, // For Ask Doubt
  Notebook, // For Notes
  Calculator as CalculatorIcon, // For Calculator
  FunctionSquare, // For Scientific Calculator
  LineChart, // For Graphing Calculator
  Timer, // For Pomodoro Timer
  BookText, // For Formula booklet
  Github,
  Slack,
  FileText, // Example icon for demo data
  BookOpen, // Example icon for demo data
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { ToolWindow } from '@/components/tools/tool-window'; // Import ToolWindow

// Import tool components
import { Calculator } from '@/components/tools/calculator';
import { ScientificCalculator } from '@/components/tools/scientific-calculator';
import { GraphingCalculator } from '@/components/tools/graphing-calculator';
import { PomodoroTimer } from '@/components/tools/pomodoro-timer';
import { FormulaBooklet } from '@/components/tools/formula-booklet';

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
          isActive
            ? 'bg-foreground/10 dark:bg-foreground/20 text-foreground shadow-inner'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
        )}
      >
        <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
        <span className="relative z-10">{label}</span>
      </a>
    </Link>
  );
}

// Define tool components mapping
const toolComponents: { [key: string]: React.ElementType } = {
  Calculator: Calculator,
  'Scientific Calculator': ScientificCalculator,
  'Graphing Calculator': GraphingCalculator,
  'Pomodoro Timer': PomodoroTimer,
  'Formula booklet': FormulaBooklet,
};

// Demo data structure remains similar, but href is now less important for tools
const demoData: { [key: string]: { icon: React.ElementType, title: string; date?: string; href?: string }[] } = {
  Tools: [
    { icon: CalculatorIcon, title: 'Calculator' },
    { icon: FunctionSquare, title: 'Scientific Calculator' },
    { icon: LineChart, title: 'Graphing Calculator' },
    { icon: Timer, title: 'Pomodoro Timer' },
    { icon: BookText, title: 'Formula booklet' },
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
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  // State to manage the open/closed state of each tool window
  const [openTools, setOpenTools] = useState<{ [key: string]: boolean }>({});

  // Toggle tool window visibility and update switch state
  const handleToggleChange = (toolTitle: string, checked: boolean) => {
    setOpenTools(prev => ({ ...prev, [toolTitle]: checked }));
  };

  // Close tool window function
  const handleCloseTool = (toolTitle: string) => {
    setOpenTools(prev => ({ ...prev, [toolTitle]: false }));
  };

  const navItems = [
    { href: '#', icon: Wrench, label: 'Tools' }, // href can be '#' if it just opens the menu
    { href: '/ask-doubt-placeholder', icon: HelpCircle, label: 'Ask Doubt' },
    { href: '/notes-placeholder', icon: Notebook, label: 'Notes' },
  ];

  const popoverVariants = {
    hidden: { opacity: 0, y: 10, height: 0, marginBottom: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', marginBottom: '0.5rem' },
  };

  return (
    <>
      {/* Tool Windows Area - Rendered outside the nav itself */}
      {/* Added pointer-events-none to allow clicks through this container */}
      <div className="absolute inset-0 pointer-events-none z-40"> {/* Container for positioning */}
          {Object.entries(openTools).map(([toolTitle, isOpen]) => {
            if (!isOpen) return null;
            const ToolComponent = toolComponents[toolTitle];
            if (!ToolComponent) return null; // Handle cases where component might not exist

            // Find the icon for the title
            const toolData = demoData.Tools.find(t => t.title === toolTitle);

            return (
              <ToolWindow
                key={toolTitle}
                title={toolTitle}
                isOpen={isOpen}
                onClose={() => handleCloseTool(toolTitle)}
                // You might want different initial sizes/positions per tool
                initialWidth={toolTitle === 'Graphing Calculator' ? 500 : 350}
                initialHeight={toolTitle === 'Graphing Calculator' ? 400 : 300}
              >
                <ToolComponent />
              </ToolWindow>
            );
          })}
      </div>

      {/* Floating Nav Bar */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => {
          setIsHoveringNav(false);
          setHoveredItem(null);
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
              className="w-[320px] bg-secondary/90 dark:bg-secondary/80 rounded-lg shadow-lg backdrop-blur-md overflow-hidden mb-2 border border-border/30"
            >
              <div className="p-4 space-y-2">
                {demoData[hoveredItem].map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center justify-between text-sm text-foreground group">
                      {/* Link or Button based on type */}
                      {hoveredItem !== 'Tools' && item.href ? (
                        <Link href={item.href} legacyBehavior passHref>
                           <a className="flex items-center flex-grow hover:text-primary cursor-pointer">
                              <item.icon className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary" />
                              <span>{item.title}</span>
                           </a>
                        </Link>
                      ) : (
                         // For Tools, the div itself handles interaction via the Switch
                         <div className="flex items-center flex-grow">
                           <item.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                           <span>{item.title}</span>
                         </div>
                      )}

                      {/* Conditionally render Switch for Tools or date for others */}
                      {hoveredItem === 'Tools' ? (
                         <Switch
                            checked={openTools[item.title] || false}
                            onCheckedChange={(checked) => handleToggleChange(item.title, checked)}
                            aria-label={`Enable ${item.title}`}
                            size="sm" // Use smaller switch if desired
                         />
                      ) : (
                        item.date && <span className="text-muted-foreground text-xs ml-2 flex-shrink-0">{item.date}</span>
                      )}
                    </div>
                    {index < demoData[hoveredItem].length - 1 && <Separator className="bg-border/50 my-1" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div
          className="bg-secondary/80 dark:bg-secondary/70 rounded-full shadow-lg backdrop-blur-sm p-1 relative border border-border/20"
        >
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && item.href !== '/';
              return (
                <FloatingNavItem
                  key={item.label} // Use label as key since href might be '#'
                  {...item}
                  isActive={isActive}
                  onMouseEnter={() => setHoveredItem(item.label)}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

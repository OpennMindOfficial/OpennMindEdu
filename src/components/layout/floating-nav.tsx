
'use client';

import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  // Removed scroll-related hooks: useScroll, useMotionValueEvent
} from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Lightbulb,
  StickyNote,
  BrainCircuit,
  Calculator,
  BookText,
  TestTubeDiagonal,
  Timer,
  BookOpenText, // Added missing icon
  FlaskConical, // Added missing icon
  type LucideIcon,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch'; // Import Switch component
import { ToolWindow } from '@/components/tools/tool-window'; // Import ToolWindow
import { ScientificCalculator } from '@/components/tools/scientific-calculator';
import { GraphingCalculator } from '@/components/tools/graphing-calculator';
import { FormulaBooklet } from '@/components/tools/formula-booklet';
import { PomodoroTimer } from '@/components/tools/pomodoro-timer';
// Removed unused import: usePathname
// Removed unused import: Separator

interface NavItem {
  name: string;
  link: string;
  icon: LucideIcon; // Use LucideIcon type
  subItems?: SubNavItem[]; // Optional sub-items for dropdown
}

interface SubNavItem {
  name: string;
  toolId: string; // Unique identifier for the tool
  icon: LucideIcon;
}

// Define the structure for open tools state
interface OpenToolsState {
  [key: string]: boolean; // key is toolId, value is isOpen
}

// Demo data for nav items
const navItems: NavItem[] = [
  {
    name: 'Tools',
    link: '#', // Main link might not be needed if it's just a trigger
    icon: BrainCircuit,
    subItems: [
      // Removed Basic Calculator as Desmos Scientific covers it
      { name: 'Scientific Calculator', toolId: 'sci-calc', icon: Calculator },
      { name: 'Graphing Calculator', toolId: 'graph-calc', icon: BookText }, // Keep using BookText for Graphing
      { name: 'Formula Booklet', toolId: 'formula', icon: FlaskConical }, // Changed to FlaskConical
      { name: 'Pomodoro Timer', toolId: 'pomodoro', icon: Timer },
      // Add more tools as needed
    ],
  },
  {
    name: 'Ask Doubt',
    link: '/ask-doubt', // Example link
    icon: Lightbulb,
  },
  {
    name: 'Notes',
    link: '/notes', // Example link
    icon: StickyNote,
  },
];

// Tool Components Map
const toolComponents: Record<string, React.ComponentType<any>> = {
  'sci-calc': ScientificCalculator,
  'graph-calc': GraphingCalculator,
  'formula': FormulaBooklet,
  'pomodoro': PomodoroTimer,
  // Add mappings for other tool components
};

export const FloatingNav = ({ className }: { className?: string }) => {
  // Removed scroll-related state and hooks
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openTools, setOpenTools] = useState<OpenToolsState>({}); // State to track open tool windows

  const handleToggleTool = (toolId: string) => {
    setOpenTools(prev => ({ ...prev, [toolId]: !prev[toolId] }));
  };

  const handleCloseTool = (toolId: string) => {
    setOpenTools(prev => ({ ...prev, [toolId]: false }));
  };

  return (
    <>
      {/* Always present, no AnimatePresence needed for visibility toggle */}
      <motion.div
        // Removed animation based on visibility
        initial={{ opacity: 0, y: 100 }} // Start below the view
        animate={{ opacity: 1, y: 0 }} // Animate into view
        transition={{ duration: 0.4, ease: "easeOut" }} // Smooth animation
        className={cn(
          'flex max-w-fit fixed bottom-4 inset-x-0 mx-auto border border-border rounded-lg bg-card/80 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-50 px-4 py-2 items-center justify-center space-x-4',
          className
        )}
      >
        <TooltipProvider delayDuration={0}>
          {navItems.map((navItem: NavItem, idx: number) => (
            <div
              key={`link=${idx}`}
              className="relative"
              onMouseEnter={() => setHoveredItem(navItem.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* Use Link only if it's not a dropdown trigger */}
                  {navItem.subItems ? (
                    <motion.button // Add motion to button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'relative dark:text-neutral-50 items-center flex space-x-1 text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg' // Adjusted padding and rounding
                      )}
                    >
                      <navItem.icon className="h-5 w-5" />
                      <span className="hidden sm:block text-sm font-medium">
                        {navItem.name}
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div // Wrap Link for motion properties
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={navItem.link}
                        className={cn(
                          'relative dark:text-neutral-50 items-center flex space-x-1 text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg' // Adjusted padding and rounding
                        )}
                      >
                        <navItem.icon className="h-5 w-5" />
                        <span className="hidden sm:block text-sm font-medium">
                          {navItem.name}
                        </span>
                      </Link>
                    </motion.div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{navItem.name}</p>
                </TooltipContent>
              </Tooltip>

              {/* Dropdown for sub-items */}
              <AnimatePresence>
                {hoveredItem === navItem.name && navItem.subItems && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }} // Animate from above
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded-lg bg-card border border-border shadow-lg py-1 z-50" // Position above the bar
                  >
                    {navItem.subItems.map((subItem) => {
                       const ToolComponent = toolComponents[subItem.toolId];
                       const isToolOpen = openTools[subItem.toolId] || false;

                       return (
                          <div
                             key={subItem.toolId}
                             className="flex items-center justify-between px-3 py-2 text-sm hover:bg-muted rounded-md mx-1 cursor-default"
                           >
                             <div className="flex items-center gap-2">
                               <subItem.icon className="w-4 h-4 text-muted-foreground" />
                               <span className="text-foreground">{subItem.name}</span>
                             </div>
                             <Switch
                               checked={isToolOpen}
                               onCheckedChange={() => handleToggleTool(subItem.toolId)}
                               aria-label={`Enable ${subItem.name}`}
                               size="sm"
                             />
                          </div>
                       );
                     })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </TooltipProvider>
      </motion.div>
      {/* Tool Windows remain the same */}
      <AnimatePresence>
        {Object.entries(openTools).map(([toolId, isOpen]) => {
          const ToolComponent = toolComponents[toolId];
          const toolData = navItems.flatMap(n => n.subItems || []).find(s => s.toolId === toolId);
          if (isOpen && ToolComponent && toolData) {
            return (
              <motion.div
                key={toolId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <ToolWindow
                  title={toolData.name}
                  isOpen={isOpen}
                  onClose={() => handleCloseTool(toolId)}
                  // Adjust initial position if needed, maybe higher up
                  initialX={window.innerWidth / 2 - 175} // Center horizontally
                  initialY={window.innerHeight / 2 - 200} // Center vertically (adjust offset)
                >
                  <ToolComponent />
                </ToolWindow>
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
    </>
  );
};

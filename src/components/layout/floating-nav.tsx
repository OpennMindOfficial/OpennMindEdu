'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { cn } from '@/lib/utils';
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
  Timer,
  FlaskConical,
  type LucideIcon,
  Settings,
  LayoutDashboard,
  HelpCircle,
  BookOpenText,
  SlidersHorizontal, // Correct Icon for Tools
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ToolWindow } from '@/components/tools/tool-window';
import { ScientificCalculator } from '@/components/tools/scientific-calculator';
import { GraphingCalculator } from '@/components/tools/graphing-calculator';
import { FormulaBooklet } from '@/components/tools/formula-booklet';
import { PomodoroTimer } from '@/components/tools/pomodoro-timer';
import { useRouter } from 'next/navigation';

interface NavItem {
  name: string;
  link?: string;
  icon: LucideIcon;
  subItems?: SubNavItem[];
}

interface SubNavItem {
  name: string;
  toolId: string;
  icon: LucideIcon;
}

interface OpenToolsState {
  [key: string]: boolean;
}

const navItems: NavItem[] = [
  {
    name: 'Tools',
    icon: SlidersHorizontal, // Using SlidersHorizontal for Tools
    subItems: [
      { name: 'Scientific Calculator', toolId: 'sci-calc', icon: Calculator },
      { name: 'Graphing Calculator', toolId: 'graph-calc', icon: BookText },
      { name: 'Formula Booklet', toolId: 'formula', icon: FlaskConical },
      { name: 'Pomodoro Timer', toolId: 'pomodoro', icon: Timer },
    ],
  },
  {
    name: 'Ask Doubt',
    link: '/ask-doubt',
    icon: Lightbulb,
  },
  {
    name: 'Notes',
    link: '/notes',
    icon: StickyNote,
  },
  {
    name: 'Settings',
    link: '/settings',
    icon: Settings
  }
];

const toolComponents: Record<string, React.ComponentType<any>> = {
  'sci-calc': ScientificCalculator,
  'graph-calc': GraphingCalculator,
  'formula': FormulaBooklet,
  'pomodoro': PomodoroTimer,
};

export const FloatingNav = ({ className }: { className?: string }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openTools, setOpenTools] = useState<OpenToolsState>({});
  const router = useRouter();

  const handleToggleTool = (toolId: string) => {
    setOpenTools(prev => ({ ...prev, [toolId]: !prev[toolId] }));
  };

  const handleCloseTool = (toolId: string) => {
    setOpenTools(prev => ({ ...prev, [toolId]: false }));
  };

  const navigate = (link: string) => {
    router.push(link);
  };

  const floatingNavVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const subMenuVariants = {
      open: { opacity: 1, y: 0, scale: 1, display: "block", transition: { duration: 0.2, ease: "easeOut" } },
      closed: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" }, display: "none" },
  };


  return (
    <>
      <TooltipProvider delayDuration={0}>
        <motion.div
          className={cn(
            'fixed bottom-4 inset-x-0 mx-auto w-fit bg-card/80 backdrop-blur-sm shadow-lg z-50 px-3 py-2 rounded-full border border-border',
            'flex items-center justify-center space-x-3',
            className
          )}
          variants={floatingNavVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {navItems.map((navItem: NavItem, idx: number) => (
              <motion.div
                  key={`navitem-${idx}`}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(navItem.name)}
                  onMouseLeave={() => setHoveredItem(null)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                      {navItem.subItems ? (
                         <motion.button
                           className={cn(
                             "group relative flex items-center justify-center p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground",
                             "transition-colors duration-200 ease-in-out"
                           )}
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
                         >
                            <navItem.icon className="w-5 h-5" />
                            <span className="sr-only">{navItem.name}</span>
                         </motion.button>
                       ) : (
                           <motion.button
                             className={cn(
                               "group relative flex items-center justify-center p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground",
                               "transition-colors duration-200 ease-in-out"
                             )}
                             onClick={() => {
                               if (navItem.link) {
                                 navigate(navItem.link);
                               }
                             }}
                             whileHover={{ scale: 1.1 }}
                             whileTap={{ scale: 0.95 }}
                           >
                             <navItem.icon className="w-5 h-5" />
                             <span className="sr-only">{navItem.name}</span>
                           </motion.button>
                       )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{navItem.name}</p>
                  </TooltipContent>
                </Tooltip>

                 <AnimatePresence>
                  {hoveredItem === navItem.name && navItem.subItems && (
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 rounded-md bg-card border border-border shadow-lg p-1 z-50 w-60"
                        variants={subMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                      {navItem.subItems.map((subItem) => {
                        const ToolComponent = toolComponents[subItem.toolId];
                        const isToolOpen = openTools[subItem.toolId] || false;

                        return (
                          <div
                            key={subItem.toolId}
                            className="flex items-center justify-between px-2 py-1.5 text-sm hover:bg-muted rounded-md mx-1 cursor-pointer"
                            onClick={() => handleToggleTool(subItem.toolId)}
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
              </motion.div>
            ))}
        </motion.div>
      </TooltipProvider>

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
                  initialX={window.innerWidth / 2 - 175}
                  initialY={window.innerHeight / 2 - 200}
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

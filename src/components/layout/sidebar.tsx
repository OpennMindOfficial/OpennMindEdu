
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  BarChart2,
  Settings,
  PlusCircle,
  ChevronDown,
  Menu,
  MessageSquareHeart,
  Target,
  Smile,
  BookMarked,
  BookCopy,
  BookHeadphones,
  Sparkles as SparklesIcon,
  ListChecks,
  Pocket,
  Layers,
  FileStack,
  GraduationCap,
  ClipboardCheck,
  Timer,
  Lightbulb,
  LifeBuoy, // Added for Support
  Info,     // Added for About Us
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion'; // Added useAnimation
import Image, { type StaticImageData } from 'next/image';
import MascotImage from '@/app/ChatGPT_Image_May_11__2025__03_07_50_PM-removebg-preview (3).png';
import OpennMindLogoLight from '@/app/lt.png';
import OpennMindLogoDark from '@/app/dt.png';
import { useTheme } from 'next-themes';
import { gsap } from 'gsap';
import { SparkleButton } from '@/components/common/sparkle-button'; // Import SparkleButton


interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isExpanded: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onSubmenuToggle?: () => void;
  subItems?: NavItemProps[];
  level?: number;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon: Icon,
  label,
  isActive,
  isExpanded,
  hasSubmenu,
  isSubmenuOpen,
  onSubmenuToggle,
  subItems,
  level = 0,
}) => {
  const itemPaddingLeft = isExpanded ? `${0.75 + level * 0.75}rem` : '0.75rem';
  const activeClass = isActive ? "sidebar-active-item" : "";
  const controls = useAnimation();
  const itemRef = useRef<HTMLAnchorElement>(null);


  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(itemRef.current,
        { opacity: 0, x: isExpanded ? -10 : 0 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out", delay: level * 0.05 }
      );
    }
  }, [isExpanded, level]);


  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.15, rotate: 5, transition: { type: 'spring', stiffness: 400, damping: 10 } },
    active: { scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  };


  return (
    <motion.li className="flex flex-col mx-2">
      <Link href={href} passHref legacyBehavior>
        <motion.a
          ref={itemRef}
          onClick={(e) => {
            if (hasSubmenu) {
              e.preventDefault();
              onSubmenuToggle?.();
            }
          }}
          className={cn(
            "flex items-center py-2.5 rounded-md transition-all duration-150 ease-in-out group relative",
            "hover:bg-primary/10 dark:hover:bg-primary/15",
            isActive ? `${activeClass} font-medium` : "text-muted-foreground hover:text-foreground dark:hover:text-foreground",
            isExpanded ? "px-3 justify-start" : "px-3 justify-center",
          )}
          style={{ paddingLeft: itemPaddingLeft }}
          whileHover="hover"
          animate={isActive ? "active" : "initial"}
        >
          <motion.div
             variants={iconVariants}
             className="flex-shrink-0"
          >
            <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: 'auto', marginLeft: '0.75rem' }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                transition={{ duration: 0.2, ease: 'circOut' }}
                className="truncate"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
          {isExpanded && hasSubmenu && (
            <ChevronDown
              className={cn(
                "ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground",
                isSubmenuOpen ? "rotate-180" : ""
              )}
            />
          )}
          {!isExpanded && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-card text-card-foreground text-xs font-medium rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none z-50 dark:bg-zinc-800 dark:text-zinc-200 border border-border/20">
              {label}
            </span>
          )}
        </motion.a>
      </Link>
      {hasSubmenu && isSubmenuOpen && isExpanded && subItems && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="ml-4 mt-0.5 space-y-0.5 overflow-hidden"
        >
          {subItems.map((subItem) => (
            <NavItem key={subItem.href} {...subItem} level={level + 1} isExpanded={isExpanded} />
          ))}
        </motion.ul>
      )}
    </motion.li>
  );
};


export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const mascotPopupControls = useAnimation();
  const mascotImageControls = useAnimation();


  const { theme } = useTheme();
  const [currentLogo, setCurrentLogo] = useState(OpennMindLogoLight);
  const [suggestion, setSuggestion] = useState("");
  const [isSuggestionDialogOpen, setIsSuggestionDialogOpen] = useState(false);
  const [currentStudyTipIndex, setCurrentStudyTipIndex] = useState(0);

  const sidebarRef = useRef<HTMLElement>(null);


  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current,
        { x: isExpanded ? -50 : -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isExpanded]);


  useEffect(() => {
    setCurrentLogo(theme === 'dark' ? OpennMindLogoDark : OpennMindLogoLight);
  }, [theme]);


  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

 const navLinks = [
    {
      group: "LEARNING TOOLS",
      icon: SparklesIcon,
      items: [
        { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/all-subjects', icon: BookCopy, label: 'All Subjects' },
        { href: '/ask-doubt', icon: MessageSquareHeart, label: 'Ask Doubt' },
        { href: '/notes', icon: BookOpen, label: 'Notes' },
        { href: '/study-plan', icon: ListChecks, label: 'Study Plan' },
        { href: '/ncert-explanations', icon: BookHeadphones, label: 'NCERT Explanations' },
        { href: '/pdf-to-notes', icon: FileStack, label: 'PDF To Notes' },
        { href: '/saved', icon: BookMarked, label: 'Saved' },
      ]
    },
    {
      group: "TEST PREPARATION",
      icon: ClipboardCheck,
      items: [
        { href: '/mock-exams', icon: PlusCircle, label: 'Mock Exams' },
        { href: '/timed-exams', icon: Timer, label: 'Timed Exams' },
        { href: '/questionbank', icon: HelpCircle, label: 'Questionbank' },
        { href: '/predicted-papers', icon: Target, label: 'Predicted Papers' },
        { href: '/predict-grade', icon: Lightbulb, label: 'Predict Grade' },
        { href: '/exam-mode', icon: Pocket, label: 'Exam Mode' },
        { href: '/performance-tracking', icon: BarChart2, label: 'Performance Tracking' },
      ]
    },
    {
        group: "RESOURCES & MORE",
        icon: Layers,
        items: [
            { href: '/extra-courses', icon: GraduationCap, label: 'Extra Courses' },
            { href: '/fun-shun', icon: Smile, label: 'Fun Shun' },
            { href: '/support', icon: LifeBuoy, label: 'Support'},
            { href: '/about-us', icon: Info, label: 'About Us'},
        ]
    }
  ];

  const accountSettingsLink = { href: '/settings', icon: Settings, label: 'Account settings'};


  const studyTips = [
    "Remember to take a 5-minute break every hour! Your brain will thank you. 😊",
    "Stay hydrated! A glass of water can boost your focus. 💧",
    "Great job on focusing! Keep up the amazing work. ✨",
    "Feeling stuck? Try explaining the concept to a rubber duck! 🦆",
    "Did you know? Spaced repetition is a great way to remember things long-term. 🧠"
  ];

  const showSpecificMascotMessage = useCallback((message: string) => {
    gsap.killTweensOf(mascotImageControls.current); // Stop any ongoing animation
    gsap.to(mascotPopupControls.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "spring(1, 0.5, 260, 20)" // Approximate spring
    });
    gsap.to(mascotImageControls.current, { // Gentle float
      y: "-5px",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    setTimeout(() => {
      gsap.to(mascotPopupControls.current, {
        opacity: 0, y: 20, scale: 0.95,
        duration: 0.3, ease: "easeIn"
      }).then(() => gsap.killTweensOf(mascotImageControls.current)); // Stop floating when hidden
    }, 10000);
  }, [mascotPopupControls, mascotImageControls]);


  const showRandomMascotMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * studyTips.length);
     // showSpecificMascotMessage(studyTips[randomIndex]); // This line was commented out
  }, [studyTips, showSpecificMascotMessage]);

  const cycleToNextMascotMessage = useCallback(() => {
    // showSpecificMascotMessage(studyTips[currentStudyTipIndex]); // This line was commented out
    setCurrentStudyTipIndex((prevIndex) => (prevIndex + 1) % studyTips.length);
  }, [studyTips, currentStudyTipIndex, showSpecificMascotMessage, setCurrentStudyTipIndex]);


  useEffect(() => {
    const handleTriggerCyclePopup = () => {
      // cycleToNextMascotMessage(); // This line was commented out
    };

    window.addEventListener('cycleMascotPopup', handleTriggerCyclePopup);

    return () => {
      window.removeEventListener('cycleMascotPopup', handleTriggerCyclePopup);
    };
  }, [cycleToNextMascotMessage, showRandomMascotMessage]);


  const handleSuggestionSubmit = () => {
    console.log("Suggestion submitted:", suggestion);
    setSuggestion("");
    setIsSuggestionDialogOpen(false);
  };

  const sidebarVariants = {
    expanded: { width: '16rem', transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] } },
    collapsed: { width: '4.5rem', transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] } },
  };

  const groupHeaderVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.05, ease: "circOut" } }
  };

  // Hide sidebar on NCERT explanations page
  if (pathname.startsWith('/ncert-explanations')) {
    return null;
  }

  // Refs for GSAP animations
  const mascotPopupRef = useRef<HTMLDivElement>(null);
  const mascotImageRef = useRef<HTMLDivElement>(null);

  // Update GSAP animations to use refs
  useEffect(() => {
    // Assign refs to GSAP controls for direct manipulation
    mascotPopupControls.current = mascotPopupRef.current;
    mascotImageControls.current = mascotImageRef.current;
  }, [mascotPopupControls, mascotImageControls]);


  return (
    <motion.aside
      ref={sidebarRef}
      variants={sidebarVariants}
      initial={false} // GSAP handles initial animation
      animate={isExpanded ? "expanded" : "collapsed"}
      className={cn(
        "relative flex flex-col h-screen bg-card border-r border-border/50 shadow-lg z-40",
        "transition-width duration-250 ease-in-out"
      )}
    >
       <div className={cn(
        "flex items-center h-16 px-3 border-b border-border/50 shrink-0",
        isExpanded ? "justify-between" : "justify-center"
      )}>
         <AnimatePresence>
           {isExpanded && (
             <motion.div
               initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
               animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
               transition={{ duration: 0.25, ease: "circOut" }}
               className="flex items-center gap-2"
             >
               <Image src={currentLogo} alt="OpennMind Logo" width={28} height={28} priority className="rounded-sm"/>
               <span className="font-bold text-lg text-foreground">OpennMind</span>
             </motion.div>
           )}
         </AnimatePresence>
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-primary/15 rounded-md hover:scale-110 active:scale-95"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Dialog open={isSuggestionDialogOpen} onOpenChange={setIsSuggestionDialogOpen}>
        <DialogTrigger asChild>
          <div className={cn("px-3 py-3 border-b border-border/50", isExpanded ? "" : "hidden")}>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <Button variant="outline" className="w-full justify-between border-muted-foreground/30 h-9 text-sm font-normal text-foreground hover:bg-muted/50 dark:hover:bg-muted/30 px-3 hover:border-primary/50 dark:hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span>CBSE</span>
                    </div>
                    <Badge variant="free" className="px-1.5 py-0.5 text-[10px]">FREE</Badge>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Feature Under Development
            </DialogTitle>
            <DialogDescription>
              This board/exam selection feature is currently under development. What would you like to see?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter your suggestion here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuggestionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSuggestionSubmit} disabled={!suggestion.trim()}>Submit Suggestion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <ScrollArea className="flex-1">
        <nav className="py-3 space-y-1">
          {navLinks.map((group) => (
            <div key={group.group} className="mb-1 last:mb-0">
              <AnimatePresence>
                 {isExpanded && (
                  <motion.h3
                    variants={groupHeaderVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="px-4 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground/70 tracking-wider flex items-center gap-1.5"
                  >
                     <group.icon className="w-3.5 h-3.5 opacity-80" />
                    {group.group}
                  </motion.h3>
                )}
              </AnimatePresence>
              <ul className="space-y-0.5">
                {group.items.map(item => (
                  <NavItem
                    key={item.href}
                    {...item}
                    isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')}
                    isExpanded={isExpanded}
                    isSubmenuOpen={openSubmenus[item.label]}
                    onSubmenuToggle={() => toggleSubmenu(item.label)}
                  />
                ))}
              </ul>
            </div>
          ))}

           <div className="mt-2 border-t border-border/50 pt-2 mx-2">
             <NavItem
                key={accountSettingsLink.href}
                {...accountSettingsLink}
                isActive={pathname === accountSettingsLink.href}
                isExpanded={isExpanded}
              />
           </div>
        </nav>
      </ScrollArea>

      <motion.div
        ref={mascotPopupRef} // Apply ref
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-4 z-50 p-0"
        style={{
          left: isExpanded ? '16.5rem' : '5rem',
          bottom: '1rem',
          pointerEvents: 'none' 
        }}
      >
        <motion.div
          className="bg-card dark:bg-zinc-800 p-3 rounded-xl shadow-xl border border-border/40 flex items-start max-w-xs"
          style={{ pointerEvents: 'auto' }} 
        >
          <motion.div ref={mascotImageRef}> {/* Apply ref */}
            <Image src={MascotImage} alt="Mascot" width={40} height={40} className="mr-2.5 rounded-full flex-shrink-0 mt-0.5 object-contain" />
          </motion.div>
          <div>
            <p className="text-xs text-foreground leading-snug">{studyTips[currentStudyTipIndex]}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => gsap.to(mascotPopupRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.2 })} // Use GSAP to hide
              className="text-xs h-auto p-1 mt-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              Got it!
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'circOut', delay: 0.05 }}
            className="mt-auto p-3 border-t border-border/50"
          >
            <SparkleButton className="w-full">
              Upgrade to Pro
            </SparkleButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

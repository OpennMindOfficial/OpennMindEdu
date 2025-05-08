
'use client'; // Add 'use client' directive for useState, useEffect, and framer-motion

import Image, { type StaticImageData } from 'next/image';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar"; // Updated Sidebar import
import { SubjectCard } from "@/components/ui/subject-card";
import { ExamCard } from "@/components/ui/exam-card";
import { LearnWithCard } from "@/components/ui/learn-with-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card and related components
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bookmark,
  ChevronRight,
  PlusCircle,
  Lightbulb,
  PlayCircle,
  BookOpen,
  HelpCircle,
  ClipboardCheck,
  FileText,
  Layers,
  ChevronLeft, // Import ChevronLeft
  Dices, // Icon for Random Exam
  SlidersHorizontal, // Icon for Custom Exam
  Timer, // Icon for Timed Exam
  PenTool, // Icon for Sketchpad
  GraduationCap, // Icon for Revision Plan
  type LucideIcon,
} from "lucide-react";
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import Link from 'next/link'; // Import Link
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion
import quotesData from './quotes.json'; // Import the quotes JSON file

// Import local images for subjects
import itImage from './it.png';
import englishLitImage from './english_lit.png';
import socialSciImage from './social_sci.png'; // Assuming file name exists
import englishCommImage from './english_comm.png';
import mathImage from './maths.png';
import scienceImage from './science.png'; // Assuming this file exists
import hindiImage from './hindi.png';

// Import images for exam cards
import i1 from './i1.png'; // Random exam
import i2 from './i2.png'; // Custom exam
import i3 from './i3.png'; // Timed exam

interface Quote {
    quote: string;
    author: string;
}

// Data for Subject Cards
const subjects = [
  {
    title: "Information Technology",
    imageUrl: itImage,
    bgColorClass: "bg-blue-100 dark:bg-blue-900/30",
    dataAiHint: "technology computer",
  },
  {
    title: "English Language & Literature",
    imageUrl: englishLitImage,
    bgColorClass: "bg-pink-100 dark:bg-pink-900/30",
    dataAiHint: "english literature book",
  },
  {
    title: "Social Science",
    imageUrl: socialSciImage,
    bgColorClass: "bg-orange-100 dark:bg-orange-900/30",
    dataAiHint: "social science globe",
  },
  {
    title: "English Communicative",
    imageUrl: englishCommImage,
    bgColorClass: "bg-yellow-100 dark:bg-yellow-900/30",
    dataAiHint: "english communication speech",
  },
  {
    title: "Mathematics",
    imageUrl: mathImage,
    bgColorClass: "bg-teal-100 dark:bg-teal-900/30",
    dataAiHint: "math formula",
  },
  {
    title: "Science",
    imageUrl: scienceImage,
    bgColorClass: "bg-indigo-100 dark:bg-indigo-900/30",
    dataAiHint: "science atom",
  },
  {
    title: "Hindi",
    imageUrl: hindiImage,
    bgColorClass: "bg-red-100 dark:bg-red-900/30",
    dataAiHint: "hindi language script",
  },
];

// Data for Exam Cards using icons
const examCards: {
  title: string;
  icon: LucideIcon;
  bgColorClass: string;
  textColorClass: string;
  isNew?: boolean;
  dataAiHint: string;
}[] = [
 {
    title: "Random exam",
    icon: Dices, // Use imported icon
    bgColorClass: "bg-gradient-to-br from-blue-200/50 to-white dark:from-blue-800/30 dark:to-background",
    textColorClass: "text-blue-800 dark:text-blue-300",
    isNew: false,
    dataAiHint: "random dice",
  },
  {
    title: "Custom exam",
    icon: SlidersHorizontal, // Use imported icon
    bgColorClass: "bg-gradient-to-br from-green-200/50 to-white dark:from-green-800/30 dark:to-background",
    textColorClass: "text-green-800 dark:text-green-300",
    isNew: true,
    dataAiHint: "custom settings sliders",
  },
  {
    title: "Timed exam",
    icon: Timer, // Use imported icon
    bgColorClass: "bg-gradient-to-br from-pink-200/50 to-white dark:from-pink-800/30 dark:to-background",
    textColorClass: "text-pink-800 dark:text-pink-300",
    isNew: true,
    dataAiHint: "timed clock stopwatch",
  },
];


// Data for Learn With Cards
const learnWithCards = [
    { title: 'Videos', icon: PlayCircle, bgColorClass: 'bg-learn-purple', textColorClass: 'text-learn-purple-foreground' },
    { title: 'Lessons', icon: BookOpen, bgColorClass: 'bg-learn-blue', textColorClass: 'text-learn-blue-foreground' },
    { title: 'Questions', icon: HelpCircle, bgColorClass: 'bg-learn-yellow', textColorClass: 'text-learn-yellow-foreground' },
    { title: 'Mock exams', icon: ClipboardCheck, bgColorClass: 'bg-learn-green', textColorClass: 'text-learn-green-foreground' },
    { title: 'Notes', icon: FileText, bgColorClass: 'bg-learn-red', textColorClass: 'text-learn-red-foreground' },
    { title: 'Flashcards', icon: Layers, bgColorClass: 'bg-learn-indigo', textColorClass: 'text-learn-indigo-foreground' },
    { title: 'Sketchpad', icon: PenTool, bgColorClass: 'bg-learn-orange', textColorClass: 'text-learn-orange-foreground' },
    { title: 'Revision Plan', icon: GraduationCap, bgColorClass: 'bg-learn-teal', textColorClass: 'text-learn-teal-foreground' },
];


// Motivational Study Quotes are now imported from JSON
// const studyQuotes = [ ... ];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const userName = "Rudransh"; // Mock user name
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [greeting, setGreeting] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for scroll container
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    // Select a random quote from the imported JSON data
    const allQuotes = quotesData.quotes;
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    setRandomQuote(allQuotes[randomIndex]); // Set the entire quote object

    // Determine greeting based on local time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    // Check scroll arrows initially and on resize/scroll
    checkScrollArrows();
    const container = scrollContainerRef.current;
    if (container) {
        container.addEventListener('scroll', checkScrollArrows);
        window.addEventListener('resize', checkScrollArrows);
    }

    // Initial check
    checkScrollArrows();


    return () => {
        if (container) {
            container.removeEventListener('scroll', checkScrollArrows);
            window.removeEventListener('resize', checkScrollArrows);
        }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const checkScrollArrows = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      // Introduce a small tolerance (e.g., 1 pixel) for floating point inaccuracies
      const tolerance = 1;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      setShowLeftArrow(scrollLeft > tolerance);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - tolerance);
  };


  const scroll = (direction: 'left' | 'right') => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of visible width
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // Re-check arrows shortly after starting scroll to update state quickly
      setTimeout(checkScrollArrows, 150);
      setTimeout(checkScrollArrows, 350); // Check again after smooth scroll likely finished
  };



  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar /> {/* Use updated Sidebar */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        {/* Main content area allows vertical scrolling */}
        <motion.main
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
           {/* Greeting with animation */}
           <motion.h1
             className="text-3xl font-bold text-foreground"
             variants={itemVariants}
             initial="hidden"
             animate="show"
           >
             {greeting}, {userName}
           </motion.h1>

           {/* Top Promotional Banner (Quote) with animation */}
           <motion.div
             className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900/80 text-primary-foreground p-6 rounded-xl shadow-lg flex flex-col items-start justify-between relative overflow-hidden min-h-[120px]"
             variants={itemVariants}
             initial="hidden"
             animate="show"
             transition={{ delay: 0.1 }} // Keep a small delay
           >
             <div className="space-y-1">
                 <h2 className="text-xl md:text-2xl font-semibold mb-2">
                 {randomQuote ? `"${randomQuote.quote}"` : "Loading quote..."}
               </h2>
                {randomQuote && (
                    <p className="text-sm md:text-base opacity-80">
                        - {randomQuote.author}
                    </p>
                )}
               {/* Optional: Add a static message if needed */}
               <p className="text-sm md:text-base mt-2">Keep pushing! &lt;3</p>
             </div>
           </motion.div>


            {/* My Subjects Section with animation */}
           <motion.div
             className="space-y-4"
             variants={containerVariants} // Apply container variants
             initial="hidden"
             animate="show"
             transition={{ delay: 0.2 }} // Adjusted delay
           >
             <div className="flex justify-between items-center">
                 <div className="flex items-center space-x-2 cursor-pointer group">
                     <Bookmark className="w-5 h-5 text-primary" />
                     <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">My subjects</h2>
                     <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform"/>
                 </div>
                 <div className="flex items-center space-x-4 text-sm">
                     <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95">Change subjects</Button>
                     <Link href="/all-subjects" passHref legacyBehavior>
                       <a><Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95">Browse all</Button></a>
                    </Link>
                 </div>
             </div>

             {/* Horizontal scroll container with arrows */}
             <div className="relative">
                 <div ref={scrollContainerRef} className="w-full overflow-x-auto scrollbar-hide whitespace-nowrap">
                   <div className="flex w-max space-x-4 pb-4"> {/* Use flex w-max */}
                   {subjects.map((subject, index) => (
                     <motion.div
                        key={index}
                        variants={itemVariants}
                        className="w-[240px] h-[340px] flex-shrink-0 group" // Added group here as well
                     >
                       <SubjectCard
                         title={subject.title} // Keep title for accessibility/data
                         imageUrl={subject.imageUrl}
                         bgColorClass={subject.bgColorClass}
                         data-ai-hint={subject.dataAiHint || subject.title.split(' ')[0].toLowerCase()}
                         className="w-full h-full" // Ensure card fills the container
                       />
                     </motion.div>
                   ))}
                 </div>
                 {/* Removed scrollbar component */}
                 </div>

                 {/* Left Scroll Button */}
                 <AnimatePresence>
                 {showLeftArrow && (
                     <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-3 z-10"
                     >
                        <Button variant="outline" size="icon" className="rounded-full shadow-md w-8 h-8 hover:scale-105 active:scale-95" onClick={() => scroll('left')}>
                           <ChevronLeft className="h-4 w-4" />
                        </Button>
                     </motion.div>
                 )}
                 </AnimatePresence>

                 {/* Right Scroll Button */}
                 <AnimatePresence>
                 {showRightArrow && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-3 z-10"
                     >
                        <Button variant="outline" size="icon" className="rounded-full shadow-md w-8 h-8 hover:scale-105 active:scale-95" onClick={() => scroll('right')}>
                           <ChevronRight className="h-4 w-4" />
                        </Button>
                     </motion.div>
                 )}
                 </AnimatePresence>
             </div>
           </motion.div>


           {/* Learn With Section with animation */}
           <motion.div
             className="space-y-4"
             variants={containerVariants} // Container variants
             initial="hidden"
             animate="show"
             transition={{ delay: 0.3 }} // Further delay
           >
             <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl md:text-2xl font-semibold">Learn With</h2>
             </div>
              {/* Use LearnWithCard component */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {learnWithCards.map((card, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <LearnWithCard
                        title={card.title}
                        icon={card.icon}
                        bgColorClass={card.bgColorClass}
                        textColorClass={card.textColorClass}
                      />
                    </motion.div>
                 ))}
                 {/* Example Placeholder Card */}
                 <motion.div variants={itemVariants}>
                   <Card className="p-4 bg-muted/50 dark:bg-card/80 rounded-xl border-0 h-32 md:h-36 flex items-center justify-center">
                       <CardContent className="text-center p-0">
                         <p className="text-muted-foreground text-sm">More learning tools coming soon...</p>
                       </CardContent>
                   </Card>
                 </motion.div>
              </div>
           </motion.div>

            {/* Mock Exams Section with animation */}
            <motion.div
              className="space-y-4"
              variants={containerVariants} // Apply container variants
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 }} // Adjusted delay
            >
               <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                      <PlusCircle className="w-5 h-5 text-primary" />
                      <h2 className="text-xl md:text-2xl font-semibold">Mock Exams</h2>
                  </div>
                  {/* Add any controls like "View All" if needed */}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {examCards.map((card, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ExamCard
                        title={card.title}
                        icon={card.icon}
                        bgColorClass={card.bgColorClass}
                        textColorClass={card.textColorClass}
                        isNew={card.isNew}
                        data-ai-hint={card.dataAiHint}
                      />
                    </motion.div>
                  ))}
               </div>
            </motion.div>


        </motion.main>
      </div>
    </div>
  );
}

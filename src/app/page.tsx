
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import { LearnWithCard } from "@/components/ui/learn-with-card";
import { ExamCard } from "@/components/ui/exam-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Bookmark,
  ArrowRight,
  BookOpen,
  Brain,
  PenTool,
  Palette,
  Calculator,
  FlaskConical,
  Timer,
  FileText,
  PlusCircle,
  Lightbulb,
  Search,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  RefreshCw,
  TrendingUp,
  Zap,
  FileQuestion,
  ClipboardCheck,
  BookUser,
  GraduationCap as GraduationCapIcon,
  Layers3,
  CircleHelp,
  Settings as SettingsIcon, // Renamed to avoid conflict with component
  Bug,
  Menu,
  Home,
  FolderOpen,
  Grid,
  MessageSquareHeart,
  Target,
  Smile,
  BookMarked,
  Folder,
  BookCopy,
  BookHeadphones,
  Sparkles,
  Briefcase, 
  ListChecks, 
  Wrench, 
  Heart, 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import quotesData from '@/app/quotes.json'; 

// Import local images for subjects
import itImage from './it.png';
import englishLitImage from './english_lit.png';
import socialSciImage from './social_sci.png';
import englishCommImage from './english_comm.png';
import mathImage from './maths.png';
import scienceImage from './science.png';
import hindiImage from './hindi.png';

// Import local images for mock exams
import randomExamImage from './i1.png';
import customExamImage from './i2.png';
import timedExamImage from './i3.png';
import illuImage from './illu.png'; 
import Image from 'next/image';

console.log('src/app/page.tsx module loaded');


const subjects = [
  { title: "Information Technology", imageUrl: itImage, bgColorClass: "bg-blue-100 dark:bg-blue-900/30", dataAiHint: "technology computer" },
  { title: "English Language & Literature", imageUrl: englishLitImage, bgColorClass: "bg-pink-100 dark:bg-pink-900/30", dataAiHint: "english literature book" },
  { title: "Social Science", imageUrl: socialSciImage, bgColorClass: "bg-orange-100 dark:bg-orange-900/30", dataAiHint: "social science globe" },
  { title: "English Communicative", imageUrl: englishCommImage, bgColorClass: "bg-yellow-100 dark:bg-yellow-900/30", dataAiHint: "english communication speech" },
  { title: "Mathematics", imageUrl: mathImage, bgColorClass: "bg-teal-100 dark:bg-teal-900/30", dataAiHint: "math formula" },
  { title: "Science", imageUrl: scienceImage, bgColorClass: "bg-indigo-100 dark:bg-indigo-900/30", dataAiHint: "science atom" },
  { title: "Hindi", imageUrl: hindiImage, bgColorClass: "bg-red-100 dark:bg-red-900/30", dataAiHint: "hindi script" },
];

const learnWithItems = [
  { title: "Ask a doubt", icon: FileQuestion, href: "/ask-doubt", bgColorClass: "bg-learn-purple", textColorClass: "text-learn-purple-foreground", dataAiHint: "doubt question" },
  { title: "Mock Exams", icon: ClipboardCheck, href: "/mock-exams", bgColorClass: "bg-learn-blue", textColorClass: "text-learn-blue-foreground", dataAiHint: "mock exam test" },
  { title: "Revision Plan", icon: BookUser, href: "/study-plan", bgColorClass: "bg-learn-teal", textColorClass: "text-learn-teal-foreground", dataAiHint: "revision plan study" },
  { title: "Sketchpad", icon: PenTool, href: "/sketchpad", bgColorClass: "bg-learn-orange", textColorClass: "text-learn-orange-foreground", dataAiHint: "sketchpad draw" },
];

const mockExams = [
  { title: "Random exam", icon: Zap, bgColorClass: "bg-rose-100 dark:bg-rose-900/30", textColorClass: "text-rose-600", dataAiHint: "random exam", illustration: randomExamImage, isNew: false },
  { title: "Custom exam", icon: PlusCircle, bgColorClass: "bg-sky-100 dark:bg-sky-900/30", textColorClass: "text-sky-600", dataAiHint: "custom exam", illustration: customExamImage, isNew: true },
  { title: "Timed exam", icon: Timer, bgColorClass: "bg-amber-100 dark:bg-amber-900/30", textColorClass: "text-amber-600", dataAiHint: "timed exam clock", illustration: timedExamImage, isNew: true },
];


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Slightly faster stagger
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, // Slightly faster item animation
};


export default function HomePage() {
  const [greeting, setGreeting] = useState("Good day");
  const [userName, setUserName] = useState("Rudransh"); 
  const [quote, setQuote] = useState({ text: "", author: "" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('HomePage component mounted');
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    };
    updateGreeting();
  }, []);

  useEffect(() => {
    if (quotesData && quotesData.quotes && quotesData.quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
      setQuote({
        text: quotesData.quotes[randomIndex].quote,
        author: quotesData.quotes[randomIndex].author,
      });
    } else {
      // Fallback quote if quotesData is not as expected
      setQuote({ text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" });
    }
  }, []);

  const scrollSubjects = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <motion.div initial="hidden" animate="show" variants={containerVariants}>
            {/* Motivational Quote Card */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/5 dark:to-blue-500/5 border-primary/20 dark:border-primary/15 rounded-xl shadow-lg p-5 text-center">
                <CardContent className="p-0">
                  <p className="text-lg font-medium text-foreground mb-1.5">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground">- {quote.author}</p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Greeting */}
            <motion.h1
              className="text-3xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              {greeting}, {userName}!
            </motion.h1>

            {/* My Subjects Section */}
            <motion.div className="space-y-4 mb-8" variants={itemVariants}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <Bookmark className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">My subjects</h2>
                  <Link href="/all-subjects" passHref legacyBehavior>
                    <a><ChevronRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform cursor-pointer" /></a>
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                   <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => scrollSubjects('left')}
                      className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => scrollSubjects('right')}
                      className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95"
                      aria-label="Scroll right"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </Button>
                  <Link href="/all-subjects" passHref legacyBehavior>
                    <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-full hover:scale-105 active:scale-95">Change subjects</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <ScrollArea ref={scrollContainerRef} className="w-full whitespace-nowrap rounded-md scrollbar-hide">
                  <div className="flex w-max space-x-[25px] pb-4"> 
                    {subjects.map((subject, index) => (
                       <motion.div key={index} variants={itemVariants} className="flex-shrink-0 group">
                        <SubjectCard
                          title={subject.title}
                          imageUrl={subject.imageUrl}
                          bgColorClass={subject.bgColorClass}
                          className="w-[240px] h-[320px]"
                          data-ai-hint={subject.dataAiHint}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="h-2" />
                </ScrollArea>
              </div>
            </motion.div>

            {/* Learn With Section */}
            <motion.div className="space-y-4 mb-8" variants={itemVariants}>
              <h2 className="text-xl font-semibold text-foreground flex items-center">
                <GraduationCapIcon className="w-5 h-5 text-primary mr-2" />
                Learn with OpennMind
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {learnWithItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                     <Link href={item.href} passHref legacyBehavior>
                        <a>
                            <LearnWithCard
                            title={item.title}
                            icon={item.icon}
                            bgColorClass={item.bgColorClass}
                            textColorClass={item.textColorClass}
                            data-ai-hint={item.dataAiHint}
                            />
                        </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mock Exams Section */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h2 className="text-xl font-semibold text-foreground flex items-center">
                <FileText className="w-5 h-5 text-primary mr-2" />
                Mock Exams
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockExams.map((exam, index) => (
                   <motion.div key={index} variants={itemVariants}>
                    <ExamCard
                      title={exam.title}
                      icon={exam.icon} // Pass the icon component itself
                      bgColorClass={exam.bgColorClass}
                      textColorClass={exam.textColorClass}
                      isNew={exam.isNew}
                      illustration={exam.illustration} // This prop seems unused in ExamCard, but kept for consistency
                      data-ai-hint={exam.dataAiHint}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Keep Going Section */}
             <motion.div variants={itemVariants} className="mt-10 mb-6">
                <Card className="bg-muted/30 dark:bg-card/60 border-0 rounded-xl shadow-lg overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 p-6 md:p-8 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-foreground mb-3">Keep Pushing Your Limits!</h2>
                            <p className="text-muted-foreground mb-5">
                                Every study session, every solved problem, every new concept learned is a step towards your goal. Stay focused and keep learning!
                            </p>
                            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:scale-105 active:scale-98 transition-all group">
                                Continue Learning <RefreshCw className="ml-2 h-4 w-4 animate-spin group-hover:animate-none" />
                            </Button>
                        </div>
                        <div className="w-full md:w-1/2 h-48 md:h-full relative">
                            <Image
                                src={illuImage}
                                alt="Keep Going Illustration"
                                layout="fill"
                                objectFit="contain" 
                                objectPosition="center" 
                                className="opacity-90"
                                data-ai-hint="motivation study"
                                priority
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

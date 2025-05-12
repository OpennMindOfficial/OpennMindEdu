
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
  PenTool,
  Calculator, // Keep for other tools if any
  FlaskConical,
  Timer,
  FileText,
  PlusCircle,
  Lightbulb, // Keep for other uses
  Search, // Keep for other uses
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  GraduationCap as GraduationCapIcon,
  FileQuestion,
  ClipboardCheck,
  BookUser,
  Layers3, // Existing learn with
  FileStack, // For PDF to Notes
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
  { title: "Revision Plan", icon: BookUser, href: "/study-plan", bgColorClass: "bg-learn-teal", textColorClass: "text-learn-teal-foreground", dataAiHint: "revision plan study" },
  { title: "Sketchpad", icon: PenTool, href: "/sketchpad", bgColorClass: "bg-learn-orange", textColorClass: "text-learn-orange-foreground", dataAiHint: "sketchpad draw" },
  { title: "PDF to Notes", icon: FileStack, href: "/pdf-to-notes", bgColorClass: "bg-learn-green", textColorClass: "text-learn-green-foreground", dataAiHint: "pdf notes" },
];

const mockExams = [
  { title: "Random exam", icon: Layers3, bgColorClass: "bg-rose-100 dark:bg-rose-900/30", textColorClass: "text-rose-700 dark:text-rose-400", dataAiHint: "random exam", illustration: randomExamImage, isNew: false },
  { title: "Custom exam", icon: PlusCircle, bgColorClass: "bg-sky-100 dark:bg-sky-900/30", textColorClass: "text-sky-700 dark:text-sky-400", dataAiHint: "custom exam", illustration: customExamImage, isNew: true },
  { title: "Timed exam", icon: Timer, bgColorClass: "bg-amber-100 dark:bg-amber-900/30", textColorClass: "text-amber-700 dark:text-amber-400", dataAiHint: "timed exam clock", illustration: timedExamImage, isNew: true },
];


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, 
};


export default function HomePage() {
  const [greeting, setGreeting] = useState("Good day");
  const [userName, setUserName] = useState("Rudransh"); 
  const [quote, setQuote] = useState({ text: "", author: "" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    };
    updateGreeting();

    if (quotesData && quotesData.quotes && quotesData.quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
      setQuote({
        text: quotesData.quotes[randomIndex].quote,
        author: quotesData.quotes[randomIndex].author,
      });
    } else {
      setQuote({ text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" });
    }
  }, []);

  const scrollSubjects = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; // Adjust scroll amount as needed
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
            {/* Greeting */}
            <motion.h1
              className="text-3xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              {greeting}, {userName}!
            </motion.h1>

            {/* Motivational Quote Card */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="bg-[hsl(var(--quote-card-bg))] rounded-xl shadow-lg p-5 text-center">
                <CardContent className="p-0">
                  <p className="text-lg font-medium text-[hsl(var(--quote-card-text))] mb-1.5">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-sm text-[hsl(var(--quote-card-author-text))]">- {quote.author}</p>
                </CardContent>
              </Card>
            </motion.div>
            
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
                    <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-full hover:scale-105 active:scale-95">View all subjects</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div ref={scrollContainerRef} className="flex w-full space-x-[25px] pb-4 overflow-x-auto scrollbar-hide"> 
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
                      icon={exam.icon} 
                      bgColorClass={exam.bgColorClass}
                      textColorClass={exam.textColorClass}
                      isNew={exam.isNew}
                      data-ai-hint={exam.dataAiHint}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
          </motion.div>
        </main>
      </div>
    </div>
  );
}


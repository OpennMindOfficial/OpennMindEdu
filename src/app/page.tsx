
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import { LearnWithCard } from "@/components/ui/learn-with-card";
import { ExamCard } from "@/components/ui/exam-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bookmark,
  ChevronRight as ChevronRightIcon,
  PenTool,
  Layers3,
  FileStack,
  Lightbulb,
  MessageSquareHeart,
  ListChecks as ListChecksIcon,
  ChevronLeft,
  GraduationCap as GraduationCapIcon,
  PlusCircle,
  Timer,
  ClipboardCheck,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import quotesData from '@/app/quotes.json';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import MascotImage from '@/app/ChatGPT_Image_May_11__2025__03_07_50_PM-removebg-preview (3).png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  { title: "Ask a doubt", icon: MessageSquareHeart, href: "/ask-doubt", bgColorClass: "bg-learn-purple", textColorClass: "text-learn-purple-foreground", dataAiHint: "doubt question" },
  { title: "Revision Plan", icon: ListChecksIcon, href: "/study-plan", bgColorClass: "bg-learn-teal", textColorClass: "text-learn-teal-foreground", dataAiHint: "revision plan study" },
  { title: "Sketchpad", icon: PenTool, href: "/sketchpad", bgColorClass: "bg-learn-orange", textColorClass: "text-learn-orange-foreground", dataAiHint: "sketchpad draw" },
  { title: "PDF to Notes", icon: FileStack, href: "/pdf-to-notes", bgColorClass: "bg-learn-green", textColorClass: "text-learn-green-foreground", dataAiHint: "pdf notes" },
];

const mockExams = [
  {
    title: "Random exam",
    icon: Layers3,
    isNew: false,
    dataAiHint:"random exam",
    bgColorClass: "bg-sky-100 dark:bg-sky-800/40"
  },
  {
    title: "Custom exam",
    icon: PlusCircle,
    isNew: true,
    dataAiHint: "custom exam",
    bgColorClass: "bg-emerald-100 dark:bg-emerald-800/40"
  },
  {
    title: "Timed exam",
    icon: Timer,
    isNew: true,
    dataAiHint: "timed exam clock",
    bgColorClass: "bg-pink-100 dark:bg-pink-800/40"
  },
];

export default function HomePage() {
  const [greeting, setGreeting] = useState("Good day");
  const [userName, setUserName] = useState("Learner");
  const [quote, setQuote] = useState({ text: "", author: "" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const pageRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const mascotButtonRef = useRef<HTMLButtonElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const subjectsSectionRef = useRef<HTMLDivElement>(null);
  const learnWithSectionRef = useRef<HTMLDivElement>(null);
  const mockExamsSectionRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
        if (!authStatus) {
            setShowAuthPopup(true);
        } else {
            const storedUserName = localStorage.getItem('userName');
            if (storedUserName) {
                setUserName(storedUserName);
            } else {
                setUserName("Learner");
            }
        }
    }

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

 useEffect(() => {
    if (isMounted && isAuthenticated && pageRef.current) {
      const commonFrom = { opacity: 0, y: 30, immediateRender: false };
      const commonTo = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" };

      const elementsToAnimate = [
        greetingRef.current,
        mascotButtonRef.current,
        quoteCardRef.current,
        subjectsSectionRef.current?.querySelector('.section-title'),
        learnWithSectionRef.current?.querySelector('.section-title'),
        mockExamsSectionRef.current?.querySelector('.section-title'),
      ].filter(Boolean);

      gsap.fromTo(elementsToAnimate,
        commonFrom,
        {
          ...commonTo,
          stagger: 0.15,
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
             markers: true, // For debugging general page load
          }
        }
      );
      
      // Subjects Cards Animation
      if (subjectsSectionRef.current) {
        console.log("GSAP Debug: subjectsSectionRef.current exists:", !!subjectsSectionRef.current);
        const subjectCards = gsap.utils.toArray<HTMLElement>(subjectsSectionRef.current.querySelectorAll('.subject-card-item'));
        console.log("GSAP Debug: Found subjectCards:", subjectCards.length, subjectCards);
        if (subjectCards.length > 0) {
          gsap.fromTo(subjectCards,
            { autoAlpha: 0, y: 30, scale: 0.95, immediateRender: false },
            {
              autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
              scrollTrigger: {
                trigger: subjectsSectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reset",
                markers: true,
              }
            }
          );
        } else {
          console.warn("GSAP Warn: No .subject-card-item elements found in subjectsSectionRef.");
        }
      } else {
        console.warn("GSAP Warn: subjectsSectionRef.current is null or undefined.");
      }

      // Learn With Cards Animation
      if (learnWithSectionRef.current) {
        console.log("GSAP Debug: learnWithSectionRef.current exists:", !!learnWithSectionRef.current);
        const learnWithCardNodes = learnWithSectionRef.current.querySelectorAll('.learn-with-card-item');
        console.log("GSAP Debug: Raw learnWithCardNodes NodeList:", learnWithCardNodes);
        const learnWithCards = gsap.utils.toArray<HTMLElement>(learnWithCardNodes);
        console.log("GSAP Debug: Found learnWithCards:", learnWithCards.length, learnWithCards);
        if (learnWithCards.length > 0) {
          gsap.fromTo(learnWithCards,
            { autoAlpha: 0, y: 20, scale: 0.9, immediateRender: false },
            {
              autoAlpha: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07, ease: "power2.out",
              scrollTrigger: {
                trigger: learnWithSectionRef.current,
                start: "top 85%", 
                toggleActions: "play none none reset",
                markers: true, // For specific debugging
                invalidateOnRefresh: true,
              }
            }
          );
        } else {
          console.warn("GSAP Warn: No .learn-with-card-item elements found in learnWithSectionRef.");
        }
      } else {
         console.warn("GSAP Warn: learnWithSectionRef.current is null or undefined.");
      }
      
      // Mock Exams Cards Animation
      if (mockExamsSectionRef.current) {
        console.log("GSAP Debug: mockExamsSectionRef.current exists:", !!mockExamsSectionRef.current);
        const mockExamCardNodes = mockExamsSectionRef.current.querySelectorAll('.exam-card-item');
        console.log("GSAP Debug: Raw mockExamCardNodes NodeList:", mockExamCardNodes);
        const mockExamCards = gsap.utils.toArray<HTMLElement>(mockExamCardNodes);
        console.log("GSAP Debug: Found mockExamCards:", mockExamCards.length, mockExamCards);

        if (mockExamCards.length > 0) {
          gsap.fromTo(mockExamCards,
            { autoAlpha: 0, y: 20, scale: 0.9, immediateRender: false },
            {
              autoAlpha: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07, ease: "power2.out",
              scrollTrigger: {
                trigger: mockExamsSectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reset",
                markers: true, // For specific debugging
                invalidateOnRefresh: true,
              }
            }
          );
        } else {
          console.warn("GSAP Warn: No .exam-card-item elements found in mockExamsSectionRef.");
        }
      } else {
         console.warn("GSAP Warn: mockExamsSectionRef.current is null or undefined.");
      }
    }
  }, [isMounted, isAuthenticated]);


  const handleLoginSuccess = () => {
    if (typeof window !== "undefined") {
        localStorage.setItem('isAuthenticated', 'true');
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        } else {
            setUserName("Learner");
        }
    }
    setIsAuthenticated(true);
    setShowAuthPopup(false);
    toast({
        title: "Login Successful",
        description: "Welcome back!",
    });
  };

  const handleSignupSuccess = (signedUpName: string) => {
    const trimmedName = signedUpName.trim();
    if (!trimmedName) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Name cannot be empty.",
      });
      return;
    }
    if (typeof window !== "undefined") {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', trimmedName);
        setUserName(trimmedName);
    }
    setIsAuthenticated(true);
    setShowAuthPopup(false);
    toast({
        title: "Signup Successful!",
        description: `Welcome to OpennMind, ${trimmedName}!`,
    });
  };


  const scrollSubjects = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCyclePopupClick = () => {
    const event = new CustomEvent('cycleMascotPopup');
    window.dispatchEvent(event);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main
          ref={pageRef}
          className={cn(
            "flex-1 overflow-y-auto p-6 md:p-8 bg-background",
            showAuthPopup && !isAuthenticated ? "blur-sm pointer-events-none" : ""
          )}
        >
          <div className="space-y-8">
            <div ref={quoteCardRef} className="mb-8">
              <Card className="bg-[hsl(var(--quote-card-bg))] rounded-xl shadow-lg p-5 text-center">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="flex items-center justify-center text-[hsl(var(--quote-card-text))] text-lg">
                    <Lightbulb className="w-5 h-5 mr-2 text-[hsl(var(--quote-card-author-text))]" />
                    Quote of the day
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-lg font-medium text-[hsl(var(--quote-card-text))] mb-1.5">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-sm text-[hsl(var(--quote-card-author-text))]">- {quote.author}</p>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <h1
                  ref={greetingRef}
                  className="text-3xl font-bold text-foreground"
                >
                  {greeting}, {userName}!
                </h1>
                 <Button
                  ref={mascotButtonRef}
                  onClick={handleCyclePopupClick}
                  variant="outline"
                  size="sm"
                  className="ml-4 hover:scale-105 active:scale-95 rounded-full"
                >
                  <Brain className="w-4 h-4 mr-2"/>
                  Show Mascot Tip
                </Button>
              </div>
            </div>

            <div ref={subjectsSectionRef} className="space-y-4 mb-8">
              <div className="flex justify-between items-center section-title">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <Bookmark className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">My subjects</h2>
                  <Link href="/all-subjects" passHref legacyBehavior>
                    <a><ChevronRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform cursor-pointer" /></a>
                  </Link>
                </div>
                <div className="flex items-center space-x-1">
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
                    <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-full hover:scale-105 active:scale-95">View all</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div ref={scrollContainerRef} className="flex w-full space-x-[25px] pb-4 overflow-x-auto scrollbar-hide">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex-shrink-0 group subject-card-item">
                      <SubjectCard
                        title={subject.title}
                        imageUrl={subject.imageUrl}
                        bgColorClass={subject.bgColorClass}
                        className="w-[240px] h-[320px]"
                        data-ai-hint={subject.dataAiHint}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={learnWithSectionRef} className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-foreground flex items-center section-title">
                <GraduationCapIcon className="w-5 h-5 text-primary mr-2" />
                Learn with OpennMind
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {learnWithItems.map((item, index) => (
                  <div key={index} className="learn-with-card-item">
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
                  </div>
                ))}
              </div>
            </div>

            <div ref={mockExamsSectionRef} className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center section-title">
                <ClipboardCheck className="w-5 h-5 text-primary mr-2" />
                Mock Exams
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockExams.map((exam, index) => (
                  <div key={index} className="exam-card-item">
                    <ExamCard
                      title={exam.title}
                      icon={exam.icon}
                      isNew={exam.isNew}
                      data-ai-hint={exam.dataAiHint}
                      bgColorClass={exam.bgColorClass}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-8 md:h-12"></div>
        </main>
        <AnimatePresence>
        {showAuthPopup && !isAuthenticated && (
          <Dialog open={showAuthPopup && !isAuthenticated} onOpenChange={(open) => {
            if (!open && !isAuthenticated) {
              setShowAuthPopup(true);
            }
          }}>
            <DialogContent
              className="sm:max-w-md p-0"
              onInteractOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
              hideCloseButton={true}
            >
              {authView === 'login' ? (
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToSignup={() => setAuthView('signup')}
                />
              ) : (
                <SignupForm
                  onSignupSuccess={handleSignupSuccess}
                  onSwitchToLogin={() => setAuthView('login')}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}

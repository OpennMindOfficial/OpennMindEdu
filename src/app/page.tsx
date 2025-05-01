
'use client'; // Add 'use client' directive for useState and useEffect

import Image from 'next/image';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import { ExamCard } from "@/components/ui/exam-card";
import { LearnWithCard } from "@/components/ui/learn-with-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  Layers
} from "lucide-react";
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Link from 'next/link'; // Import Link

// Import local images for subjects
import itImage from './it.png';
import englishLitImage from './english_lit.png';
import socialSciImage from './social_sci.png'; // Assuming file name exists
import englishCommImage from './english_comm.png';
import mathImage from './maths.png';
import scienceImage from './science.png'; // Assuming this file exists
import hindiImage from './hindi.png';

// Import local images for exams
import i1 from './i1.png';
import i2 from './i2.png';
import i3 from './i3.png';

const subjects = [
  {
    title: "Information Technology",
    imageUrl: itImage,
    bgColorClass: "bg-blue-100 dark:bg-blue-900/30", // Example: Light blueish
  },
  {
    title: "English Language & Literature",
    imageUrl: englishLitImage,
    bgColorClass: "bg-pink-100 dark:bg-pink-900/30", // Example: Light pinkish
  },
  {
    title: "Social Science",
    imageUrl: socialSciImage, // Assuming this file exists
    bgColorClass: "bg-orange-100 dark:bg-orange-900/30", // Example: Light orangeish
  },
  {
    title: "English Communicative",
    imageUrl: englishCommImage,
    bgColorClass: "bg-yellow-100 dark:bg-yellow-900/30", // Example: Light yellowish
  },
  {
    title: "Mathematics",
    imageUrl: mathImage,
    bgColorClass: "bg-teal-100 dark:bg-teal-900/30", // Example: Light tealish
  },
  {
    title: "Science",
    imageUrl: scienceImage, // Assuming this file exists
    bgColorClass: "bg-indigo-100 dark:bg-indigo-900/30", // Example: Light indigosh
  },
  {
    title: "Hindi",
    imageUrl: hindiImage,
    bgColorClass: "bg-red-100 dark:bg-red-900/30", // Example: Light reddish
  },
];

// Data for Exam Cards using local images
const examCards = [
  {
    title: "Random exam",
    imageUrl: i1, // Use imported image i1
    bgColorClass: "bg-gradient-to-br from-blue-100/50 to-white dark:from-blue-900/30 dark:to-background",
    isNew: false,
    dataAiHint: "abstract shapes",
  },
  {
    title: "Custom exam",
    imageUrl: i2, // Use imported image i2
    bgColorClass: "bg-gradient-to-br from-green-100/50 to-white dark:from-green-900/30 dark:to-background",
    isNew: true,
    dataAiHint: "gears settings",
  },
  {
    title: "Timed exam",
    imageUrl: i3, // Use imported image i3
    bgColorClass: "bg-gradient-to-br from-pink-100/50 to-white dark:from-pink-900/30 dark:to-background",
    isNew: true,
    dataAiHint: "clock time",
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
];

// Motivational Study Quotes
const studyQuotes = [
    "Believe you can and you're halfway there.",
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "Push yourself, because no one else is going to do it for you.",
    "Your limitation—it's only your imagination.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Study hard, do good, and the good life will follow.",
    "It always seems impossible until it's done."
];

export default function Home() {
  const userName = "Rudransh"; // Mock user name
  const [randomQuote, setRandomQuote] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Select a random quote on client-side mount
    setRandomQuote(studyQuotes[Math.floor(Math.random() * studyQuotes.length)]);

    // Determine greeting based on local time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          {/* Dynamic Greeting */}
          <h1 className="text-3xl font-bold text-foreground">{greeting}, {userName}</h1>

           {/* Top Promotional Banner */}
           <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900/80 text-primary-foreground p-6 rounded-xl shadow-lg flex items-center justify-between relative overflow-hidden">
             <div className="z-10">
               <h2 className="text-xl md:text-2xl font-semibold mb-2">{randomQuote || "Loading quote..."}</h2> {/* Display quote or loading message */}
               <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 text-xs h-auto rounded-full">
                 Keep pushing! &lt;3
               </Button>
             </div>
             <div className="absolute right-0 bottom-[-20px] opacity-70 z-0 w-32 h-32 md:w-40 md:h-40">
                 <svg viewBox="0 0 100 100" fill="currentColor" className="text-blue-400 w-full h-full">
                    <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z M50,10 C66.6,10 80,23.4 80,40 C80,56.6 66.6,70 50,70 C33.4,70 20,56.6 20,40 C20,23.4 33.4,10 50,10 Z M50,80 C38.9,80 30,71.1 30,60 L70,60 C70,71.1 61.1,80 50,80 Z"/>
                 </svg>
              </div>
           </div>

            {/* My Subjects Section */}
            <div className="space-y-4">
             <div className="flex justify-between items-center">
               <div className="flex items-center space-x-2 cursor-pointer group">
                 <Bookmark className="w-5 h-5 text-primary" />
                 <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">My subjects</h2>
                 <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="flex items-center space-x-4 text-sm">
                 <Link href="/all-subjects" passHref>
                   <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Change subjects</Button>
                 </Link>
                 <Link href="/all-subjects" passHref>
                   <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Browse all</Button>
                 </Link>
               </div>
             </div>

             <div className="relative">
               <ScrollArea className="w-full whitespace-nowrap">
                 <div className="flex w-max space-x-4 pb-4">
                   {subjects.map((subject, index) => (
                     <SubjectCard
                       key={index}
                       title={subject.title} // Title still used for alt text
                       imageUrl={subject.imageUrl}
                       bgColorClass={subject.bgColorClass}
                       className="w-[225px] h-[340px] flex-shrink-0" // Increased horizontal size
                       data-ai-hint={subject.title?.toLowerCase().split(" ")[0]} // Use first word of title as hint
                     />
                   ))}
                 </div>
                 <ScrollBar orientation="horizontal" className="h-2" />
               </ScrollArea>
             </div>
           </div>


           {/* Mock Exams Section */}
            <div className="space-y-4">
               <div className="flex items-center space-x-2 cursor-pointer group">
                  <PlusCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">Mock exams</h2>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
               </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {examCards.map((card, index) => (
                    <ExamCard
                      key={index}
                      title={card.title}
                      imageUrl={card.imageUrl}
                      bgColorClass={card.bgColorClass}
                      isNew={card.isNew}
                      dataAiHint={card.dataAiHint}
                    />
                  ))}
                </div>
            </div>

           {/* Learn With Section */}
           <div className="space-y-4">
             <div className="flex items-center space-x-2 cursor-pointer group">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">Learn with</h2>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
             </div>
              {/* Use LearnWithCard component */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {learnWithCards.map((card, index) => (
                    <LearnWithCard
                      key={index}
                      title={card.title}
                      icon={card.icon}
                      bgColorClass={card.bgColorClass}
                      textColorClass={card.textColorClass}
                    />
                 ))}
                 {/* Placeholder Card */}
                 <Card className="p-4 bg-muted/50 dark:bg-card/80 rounded-xl border-0 flex items-center justify-center h-full min-h-[144px] md:min-h-[144px]">
                    <CardContent className="text-center p-0">
                      <p className="text-muted-foreground text-sm">Learning content coming soon...</p>
                    </CardContent>
                 </Card>
              </div>
           </div>


        </main>
      </div>
    </div>
  );
}

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

// Import local images for subjects
import itImage from './it.png';
import englishLitImage from './english_lit.png'; // Added import
import socialSciImage from './social_sci.png'; // Assuming file name exists
import englishCommImage from './english_comm.png'; // Added import
import mathImage from './maths.png'; // Changed to maths.png
import scienceImage from './science.png'; // Assuming file name exists
import hindiImage from './hindi.png'; // Added import

// Import local images for exams
import i1 from './i1.png';
import i2 from './i2.png';
import i3 from './i3.png';

const subjects = [
  {
    title: "Information Technology",
    imageUrl: itImage,
    bgColorClass: "bg-blue-100 dark:bg-blue-900/30", // Example background color
  },
  {
    title: "English Language & Literature",
    imageUrl: englishLitImage, // Use imported local image
    bgColorClass: "bg-pink-100 dark:bg-pink-900/30", // Example background color
  },
  {
    title: "Social Science",
    imageUrl: socialSciImage, // Assuming this file exists
    bgColorClass: "bg-orange-100 dark:bg-orange-900/30", // Example background color
  },
  {
    title: "English Communicative",
    imageUrl: englishCommImage, // Use imported local image
    bgColorClass: "bg-yellow-100 dark:bg-yellow-900/30", // Example background color
  },
  {
    title: "Mathematics",
    imageUrl: mathImage, // Use imported local image
    bgColorClass: "bg-teal-100 dark:bg-teal-900/30", // Example background color
  },
  {
    title: "Science",
    imageUrl: scienceImage, // Assuming this file exists
    bgColorClass: "bg-indigo-100 dark:bg-indigo-900/30", // Example background color
  },
  {
    title: "Hindi",
    imageUrl: hindiImage, // Use imported local image
    bgColorClass: "bg-red-100 dark:bg-red-900/30", // Example background color
  },
];

// Data for Exam Cards using local images
const examCards = [
  {
    title: "Random exam",
    imageUrl: i1, // Use imported image i1
    bgColorClass: "bg-gradient-to-br from-exam-blue-light to-white dark:from-exam-blue-dark/30 dark:to-background",
    isNew: false,
  },
  {
    title: "Custom exam",
    imageUrl: i2, // Use imported image i2
    bgColorClass: "bg-gradient-to-br from-exam-green-light to-white dark:from-exam-green-dark/30 dark:to-background",
    isNew: true,
  },
  {
    title: "Timed exam",
    imageUrl: i3, // Use imported image i3
    bgColorClass: "bg-gradient-to-br from-exam-pink-light to-white dark:from-exam-pink-dark/30 dark:to-background",
    isNew: true,
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


export default function Home() {
  const userName = "Rudransh"; // Mock user name

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Good morning, {userName}</h1>

           {/* Top Promotional Banner */}
           <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900/80 text-primary-foreground p-6 rounded-xl shadow-lg flex items-center justify-between relative overflow-hidden">
             <div className="z-10">
               <h2 className="text-xl md:text-2xl font-semibold mb-2">How did OpennMind help your predicted grades?</h2>
               <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 text-xs h-auto">
                 Share your wins with us &lt;3
               </Button>
             </div>
             <div className="absolute right-0 bottom-[-20px] opacity-70 z-0 w-32 h-32 md:w-40 md:h-40">
                 <svg viewBox="0 0 100 100" fill="currentColor" className="text-purple-400 w-full h-full">
                    <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z M50,10 C66.6,10 80,23.4 80,40 C80,56.6 66.6,70 50,70 C33.4,70 20,56.6 20,40 C20,23.4 33.4,10 50,10 Z M50,80 C38.9,80 30,71.1 30,60 L70,60 C70,71.1 61.1,80 50,80 Z"/>
                 </svg>
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
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Change subjects</Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Browse all</Button>
               </div>
            </div>

            <div className="relative">
               <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 pb-4">
                  {subjects.map((subject, index) => (
                    <SubjectCard
                      key={index}
                      title={subject.title}
                      imageUrl={subject.imageUrl} // Pass the imported image object or URL
                      bgColorClass={subject.bgColorClass} // Pass the background color class
                      className="w-[200px] md:w-[220px] flex-shrink-0"
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-2" />
              </ScrollArea>
             </div>
          </div>

        </main>
      </div>
    </div>
  );
}

    
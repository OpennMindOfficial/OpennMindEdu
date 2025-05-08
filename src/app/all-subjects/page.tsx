
'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion'; // Import motion
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft

// Import local images
import itImage from '../it.png';
import englishLitImage from '../english_lit.png';
import socialSciImage from '../social_sci.png';
import englishCommImage from '../english_comm.png';
import mathImage from '../maths.png';
import scienceImage from '../science.png';
import hindiImage from '../hindi.png';

const allSubjects = [
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


export default function AllSubjectsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" passHref legacyBehavior>
              <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 active:scale-95">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              All Subjects
            </motion.h1>
          </div>

          {/* Animated grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[70px] gap-y-[50px]" // Keep adjusted gaps
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {allSubjects.map((subject, index) => (
              <motion.div key={index} variants={itemVariants}>
                <SubjectCard
                  title={subject.title} // Title might be needed for accessibility or future use
                  imageUrl={subject.imageUrl}
                  bgColorClass={subject.bgColorClass}
                  className="w-full h-[340px]" // Maintain height, width determined by grid
                  data-ai-hint={subject.dataAiHint || subject.title?.toLowerCase().split(" ")[0]}
                />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

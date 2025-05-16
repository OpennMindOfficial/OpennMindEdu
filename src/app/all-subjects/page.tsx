
'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion'; // Import motion
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft
import React, { useEffect, useRef } from 'react'; // Import React hooks
import { gsap } from 'gsap'; // Import GSAP

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

export default function AllSubjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});

    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.1 }
      );
    }

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.subject-card-item');
      if (cards.length > 0) {
        tl.fromTo(cards,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07 },
          "-=0.3"
        );
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main ref={pageRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" passHref legacyBehavior>
              <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 active:scale-95">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1
              ref={titleRef}
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              All Subjects
            </h1>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[70px] gap-y-[50px]" // Keep adjusted gaps
          >
            {allSubjects.map((subject, index) => (
              <div key={index} className="subject-card-item"> {/* Added class for GSAP targeting */}
                <SubjectCard
                  title={subject.title} 
                  imageUrl={subject.imageUrl}
                  bgColorClass={subject.bgColorClass}
                  className="w-full h-[340px]" 
                  data-ai-hint={subject.dataAiHint || subject.title?.toLowerCase().split(" ")[0]}
                />
              </div>
            ))}
          </div >
        </main>
      </div>
    </div>
  );
}

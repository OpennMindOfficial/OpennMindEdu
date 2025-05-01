
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

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
  },
  {
    title: "English Language & Literature",
    imageUrl: englishLitImage,
    bgColorClass: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    title: "Social Science",
    imageUrl: socialSciImage,
    bgColorClass: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    title: "English Communicative",
    imageUrl: englishCommImage,
    bgColorClass: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    title: "Mathematics",
    imageUrl: mathImage,
    bgColorClass: "bg-teal-100 dark:bg-teal-900/30",
  },
  {
    title: "Science",
    imageUrl: scienceImage,
    bgColorClass: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    title: "Hindi",
    imageUrl: hindiImage,
    bgColorClass: "bg-red-100 dark:bg-red-900/30",
  },
];

export default function AllSubjectsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">All Subjects</h1>
          </div>

          {/* Increased grid gap for more uniform spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
            {allSubjects.map((subject, index) => (
              <SubjectCard
                key={index}
                title={subject.title} // Title might be needed for accessibility or future use
                imageUrl={subject.imageUrl}
                bgColorClass={subject.bgColorClass}
                className="w-full h-[340px]" // Maintain height, width determined by grid
                data-ai-hint={subject.title?.toLowerCase().split(" ")[0]}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

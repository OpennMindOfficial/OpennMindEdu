
'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { BookOpen, BarChart2, Filter, ChevronRight, CheckCircle, Clock, FileText } from "lucide-react";
import Image from 'next/image';

const recommendedExams = [
  {
    id: 'rec1',
    title: "Full Syllabus Mock Test - Science",
    subject: "Science",
    chapters: "All Chapters",
    type: "MCQ",
    questions: 50,
    duration: 60,
    imageUrl: "https://picsum.photos/seed/science-mock/400/200",
    dataAiHint: "science laboratory",
  },
  {
    id: 'rec2',
    title: "Algebra Chapter Test - Mathematics",
    subject: "Mathematics",
    chapters: "Algebra",
    type: "Mixed",
    questions: 25,
    duration: 45,
    imageUrl: "https://picsum.photos/seed/math-mock/400/200",
    dataAiHint: "math equations",
  },
  {
    id: 'rec3',
    title: "Grammar & Comprehension - English",
    subject: "English",
    chapters: "Grammar, Comprehension",
    type: "MCQ",
    questions: 40,
    duration: 50,
    imageUrl: "https://picsum.photos/seed/english-mock/400/200",
    dataAiHint: "english books",
  },
];

const pastExams = [
  {
    id: 'past1',
    title: "Physics Mock Exam - Set A",
    subject: "Physics",
    chapters: "Mechanics, Optics",
    type: "MCQ",
    questions: 50,
    duration: 60,
    score: 85,
    date: "2024-04-15",
    imageUrl: "https://picsum.photos/seed/physics-past/400/200",
    dataAiHint: "physics experiment",
  },
  {
    id: 'past2',
    title: "History Mid-Term Revision",
    subject: "Social Science",
    chapters: "Ancient History",
    type: "Theory",
    questions: 20,
    duration: 90,
    score: 72,
    date: "2024-03-20",
    imageUrl: "https://picsum.photos/seed/history-past/400/200",
    dataAiHint: "history map",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ExamCardProps {
  exam: typeof recommendedExams[0] | typeof pastExams[0];
  isPastExam?: boolean;
}

function ExamDisplayCard({ exam, isPastExam = false }: ExamCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-card/80 dark:bg-card/70 border border-border/20 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full">
        <div className="relative w-full h-32 md:h-40">
          <Image
            src={exam.imageUrl}
            alt={exam.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-t-xl"
            data-ai-hint={exam.dataAiHint}
            priority={false}
          />
          {isPastExam && 'score' in exam && exam.score && (
             <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                {exam.score}%
             </div>
          )}
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-base md:text-lg font-semibold text-foreground truncate">{exam.title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {exam.subject} | {exam.chapters} | {exam.type}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-primary" />
              <span>{exam.questions} Questions</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
              <span>{exam.duration} mins</span>
            </div>
          </div>
          {isPastExam && 'date' in exam && (
             <p className="text-xs text-muted-foreground">Attempted: {new Date(exam.date).toLocaleDateString()}</p>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t border-border/20">
          {isPastExam ? (
            <Button variant="outline" className="w-full hover:scale-105 active:scale-95 text-sm">
              View Report
              <BarChart2 className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="w-full hover:scale-105 active:scale-95 text-sm">
              Start Exam
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}


export default function MockExamsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gradient-to-br from-background to-muted/20 dark:from-zinc-900/50 dark:to-background">
          <motion.div
            className="flex items-center gap-3"
            variants={itemVariants}
            initial="hidden"
            animate="show"
          >
            <BookOpen className="w-7 h-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Mock Exams</h1>
          </motion.div>

          {/* Recommended Exams Section */}
          <motion.section
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <Card className="bg-card/70 dark:bg-card/60 border border-border/10 backdrop-blur-md rounded-xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-accent" />
                    Filter Recommended Exams
                  </CardTitle>
                  <CardDescription>
                    Narrow down exams based on your preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="subject-filter" className="block text-sm font-medium text-muted-foreground mb-1">Subject</label>
                    <Select>
                      <SelectTrigger id="subject-filter" className="bg-background/80 dark:bg-input/70 rounded-lg shadow-sm">
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="social_science">Social Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="difficulty-filter" className="block text-sm font-medium text-muted-foreground mb-1">Difficulty</label>
                    <Select>
                      <SelectTrigger id="difficulty-filter" className="bg-background/80 dark:bg-input/70 rounded-lg shadow-sm">
                        <SelectValue placeholder="All Difficulties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="type-filter" className="block text-sm font-medium text-muted-foreground mb-1">Exam Type</label>
                    <Select>
                      <SelectTrigger id="type-filter" className="bg-background/80 dark:bg-input/70 rounded-lg shadow-sm">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_syllabus">Full Syllabus</SelectItem>
                        <SelectItem value="chapter_wise">Chapter Wise</SelectItem>
                        <SelectItem value="mcq">MCQ Based</SelectItem>
                        <SelectItem value="theory">Theory Based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedExams.map((exam) => (
                <ExamDisplayCard key={exam.id} exam={exam} />
              ))}
            </div>
            <motion.div variants={itemVariants} className="flex justify-center">
              <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 hover:scale-105 active:scale-95">
                View All Recommended
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.section>

          {/* Past Exams Section */}
          <motion.section
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            transition={{delay: 0.3}} // Delay this section
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
                <BarChart2 className="w-6 h-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">Past Exams</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastExams.map((exam) => (
                <ExamDisplayCard key={exam.id} exam={exam} isPastExam />
              ))}
               {pastExams.length === 0 && (
                <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
                    <Card className="bg-card/70 dark:bg-card/60 border-border/10 backdrop-blur-md rounded-xl shadow-lg p-6 text-center">
                        <CardTitle className="text-lg font-semibold text-muted-foreground">No Past Exams Yet</CardTitle>
                        <CardDescription className="mt-2 text-sm">
                            Your completed exams and their reports will appear here.
                        </CardDescription>
                    </Card>
                </motion.div>
               )}
            </div>
             {pastExams.length > 0 && (
                <motion.div variants={itemVariants} className="flex justify-center">
                  <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 hover:scale-105 active:scale-95">
                    View All Past Exams
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
             )}
          </motion.section>
        </main>
      </div>
    </div>
  );
}

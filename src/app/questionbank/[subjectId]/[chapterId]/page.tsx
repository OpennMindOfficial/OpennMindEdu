
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  ChevronDown,
  ListFilter,
  FileDown,
  Download,
  BookOpen,
} from "lucide-react";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { QuestionCard } from '@/components/ui/question-card'; // Will create this
import { AnswerModal } from '@/components/ui/answer-modal'; // Will create this
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming this exists

// Mock data (replace with actual data fetching)
const qbSubjects = [
  { id: 'math-10', title: "Mathematics", grade: "Class 10", board: "CBSE"},
  { id: 'science-10', title: "Science", grade: "Class 10", board: "CBSE"},
  // ... other subjects
];

const chaptersBySubject: Record<string, { id: string; name: string; questionCount: number }[]> = {
  'math-10': [
    { id: 'real-numbers', name: "Real Numbers", questionCount: 212 },
    { id: 'polynomials', name: "Polynomials", questionCount: 154 },
    // ... other chapters for math-10
  ],
  'science-10': [
    { id: 'chem-reactions', name: "Chemical Reactions and Equations", questionCount: 180 },
    { id: 'acids-bases', name: "Acids, Bases and Salts", questionCount: 205 },
    // ... other chapters for science-10
  ],
};

interface Question {
  id: string;
  questionNumber: number;
  tags: string[];
  text: string;
  solution: string; // Simple text solution for now
  isBookmarked?: boolean;
  isDone?: boolean;
}

const questionsByChapter: Record<string, Question[]> = {
  'real-numbers': [
    { id: 'rn-q1', questionNumber: 1, tags: ['SL', 'Paper 1'], text: 'In Fig. DE || BC and AD = 1/2 BD. If BC = 4.5 cm, Find DE.', solution: 'Solution for DE || BC question...', isBookmarked: false, isDone: true },
    { id: 'rn-q2', questionNumber: 2, tags: ['SL', 'Paper 1'], text: 'In given figure, AB is the diameter of a circle with center O and AT is a tangent. If ∠AOQ = 58°, Find ∠ATQ.', solution: 'Solution for circle tangent question...', isBookmarked: true, isDone: false },
    { id: 'rn-q3', questionNumber: 3, tags: ['HL', 'Paper 2'], text: 'Prove that √5 is irrational.', solution: 'Proof for √5 irrationality...', isBookmarked: false, isDone: false },
    // Add more questions for this chapter (up to 10 for the first page example)
    ...Array.from({ length: 7 }, (_, i) => ({
      id: `rn-q${i + 4}`,
      questionNumber: i + 4,
      tags: ['SL', 'Paper 1'],
      text: `This is sample question number ${i + 4} for Real Numbers. What is the value of X?`,
      solution: `Solution for sample question ${i + 4}. X = ${Math.random() * 100}.`,
      isBookmarked: Math.random() > 0.7,
      isDone: Math.random() > 0.5,
    })),
  ],
  'polynomials': [
    { id: 'poly-q1', questionNumber: 1, tags: ['SL', 'Paper 1'], text: 'Find the zeroes of the polynomial x² - 3.', solution: 'Zeroes are √3 and -√3.' },
    // ... more questions for polynomials
  ],
   // ... other chapters
};


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.07,
      duration: 0.4,
      ease: "easeOut"
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};


export default function ChapterQuestionsPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;
  const chapterId = params.chapterId as string;

  const [subjectDetails, setSubjectDetails] = useState<typeof qbSubjects[0] | null>(null);
  const [chapterDetails, setChapterDetails] = useState<typeof chaptersBySubject[string][0] | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [allChapterQuestions, setAllChapterQuestions] = useState<Question[]>([]);


  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [selectedQuestionForAnswer, setSelectedQuestionForAnswer] = useState<Question | null>(null);
  
  // States for toggling bookmark and done status locally
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});
  const [doneQuestions, setDoneQuestions] = useState<Record<string, boolean>>({});


  useEffect(() => {
    if (subjectId && chapterId) {
      const subj = qbSubjects.find(s => s.id === subjectId);
      const chap = chaptersBySubject[subjectId]?.find(c => c.id === chapterId);
      const questions = questionsByChapter[chapterId] || [];

      setSubjectDetails(subj || null);
      setChapterDetails(chap || null);
      setAllChapterQuestions(questions);
      
      // Initialize local states from question data
      const initialBookmarks: Record<string, boolean> = {};
      const initialDones: Record<string, boolean> = {};
      questions.forEach(q => {
        if (q.isBookmarked) initialBookmarks[q.id] = true;
        if (q.isDone) initialDones[q.id] = true;
      });
      setBookmarkedQuestions(initialBookmarks);
      setDoneQuestions(initialDones);
    }
  }, [subjectId, chapterId]);

 useEffect(() => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    setCurrentQuestions(allChapterQuestions.slice(startIndex, endIndex));
  }, [allChapterQuestions, currentPage, questionsPerPage]);


  const totalPages = Math.ceil(allChapterQuestions.length / questionsPerPage);

  const handleShowAnswer = (question: Question) => {
    setSelectedQuestionForAnswer(question);
    setIsAnswerModalOpen(true);
  };
  
  const handleToggleBookmark = (questionId: string) => {
    setBookmarkedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
    // Add logic to persist this change if needed
  };

  const handleToggleDone = (questionId: string) => {
    setDoneQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
    // Add logic to persist this change
  };


  if (!subjectDetails || !chapterDetails) {
    return (
        <div className="flex h-screen bg-background text-foreground items-center justify-center">
            <p>Loading chapter details...</p>
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/10 dark:bg-zinc-900/50">
          <motion.div 
            className="container mx-auto max-w-5xl py-6 px-4 md:px-6 lg:px-8"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {/* Top Bar */}
            <motion.div className="mb-6 space-y-3" variants={itemVariants}>
              <Link href="/questionbank" passHref legacyBehavior>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2 hover:scale-105 active:scale-95">
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Chapters
                </Button>
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h1 className="text-xl md:text-2xl font-bold text-foreground">
                        {subjectDetails.title} - {chapterDetails.name}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="hover:scale-105 active:scale-95">
                    <FileDown className="w-3.5 h-3.5 mr-1.5" /> Export PDF
                  </Button>
                  <Button variant="outline" size="sm" className="hover:scale-105 active:scale-95">
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Download Offline
                  </Button>
                </div>
              </div>
               {/* Placeholder for filter buttons from image */}
               <div className="flex flex-wrap gap-2 pt-2">
                 <Select defaultValue="mathematics-class-10">
                    <SelectTrigger className="w-auto h-8 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm hover:scale-105 active:scale-95">
                        <SelectValue placeholder="Select Subject/Class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mathematics-class-10">Mathematics Class 10</SelectItem>
                        {/* Add other subjects/classes */}
                    </SelectContent>
                 </Select>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm hover:scale-105 active:scale-95">
                    <ListFilter className="w-3.5 h-3.5 mr-1.5" /> Select Topics <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70"/>
                 </Button>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm hover:scale-105 active:scale-95">
                    All Papers <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70"/>
                 </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm hover:scale-105 active:scale-95">
                    HL and SL <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70"/>
                 </Button>
               </div>
            </motion.div>

            {/* Question List */}
            <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="show">
              {currentQuestions.map((q, index) => (
                <motion.div key={q.id} variants={itemVariants}>
                  <QuestionCard
                    questionNumber={q.questionNumber}
                    tags={q.tags}
                    questionText={q.text}
                    isBookmarked={bookmarkedQuestions[q.id] || false}
                    isDone={doneQuestions[q.id] || false}
                    onToggleBookmark={() => handleToggleBookmark(q.id)}
                    onToggleDone={() => handleToggleDone(q.id)}
                    onShowAnswer={() => handleShowAnswer(q)}
                    onMoreOptions={() => console.log("More options for", q.id)} // Placeholder
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div className="flex justify-center mt-8" variants={itemVariants}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className="mx-1 hover:scale-105 active:scale-95"
                  >
                    {pageNumber}
                  </Button>
                ))}
              </motion.div>
            )}
          </motion.div>
          <div className="pb-8"></div>
        </main>
      </div>
      {selectedQuestionForAnswer && (
        <AnswerModal
          isOpen={isAnswerModalOpen}
          onClose={() => setIsAnswerModalOpen(false)}
          questionNumber={selectedQuestionForAnswer.questionNumber}
          solution={selectedQuestionForAnswer.solution}
        />
      )}
    </div>
  );
}

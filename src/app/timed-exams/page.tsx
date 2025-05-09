
'use client'; // Add use client for motion

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion'; // Import motion
import { Timer, BookOpen, Brain, Play } from "lucide-react";

const sampleTimedExams = [
  {
    subject: "Mathematics",
    topic: "Chapter 1: Real Numbers",
    duration: "30 minutes",
    icon: <BookOpen className="w-5 h-5 text-blue-500" />,
    dataAiHint: "math numbers"
  },
  {
    subject: "Science",
    topic: "Chemistry: Acids & Bases",
    duration: "45 minutes",
    icon: <Brain className="w-5 h-5 text-green-500" />,
    dataAiHint: "science chemistry"
  },
  {
    subject: "English",
    topic: "Essay Writing Practice",
    duration: "60 minutes",
    icon: <Timer className="w-5 h-5 text-red-500" />,
    dataAiHint: "english essay"
  },
  {
    subject: "History",
    topic: "Ancient Civilizations",
    duration: "40 minutes",
    icon: <BookOpen className="w-5 h-5 text-yellow-500" />,
    dataAiHint: "history ancient"
  }
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

export default function TimedExamsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gradient-to-br from-background to-muted/20 dark:from-zinc-900/50 dark:to-background">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Timer className="w-7 h-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Timed Exams</h1>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {sampleTimedExams.map((exam, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-card/80 dark:bg-card/70 border border-border/20 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-out flex flex-col h-full group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      {exam.icon}
                      <CardTitle className="text-lg font-semibold text-foreground">{exam.subject}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{exam.topic}</p>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-4">Duration: {exam.duration}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 hover:scale-105 active:scale-95"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Exam
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
             <motion.div variants={itemVariants}>
                <Card className="bg-muted/30 dark:bg-card/50 border-2 border-dashed border-border/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out flex flex-col h-full items-center justify-center p-6 text-center">
                  <CardHeader className="p-0 mb-2">
                     <Timer className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <CardTitle className="text-md font-medium text-muted-foreground">More Coming Soon</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-xs text-muted-foreground">
                      We're preparing more timed exams for various subjects and topics.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

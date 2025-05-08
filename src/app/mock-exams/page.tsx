
'use client'; // Add use client for motion

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion'; // Import motion

export default function MockExamsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <motion.h1
            className="text-3xl font-bold text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mock Exams
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl"> {/* Apply styling */}
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Prepare with Mock Exams</CardTitle> {/* Adjust text color */}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground"> {/* Adjust text color */}
                  Take mock exams to assess your knowledge and prepare for upcoming
                  tests. Get detailed feedback on your performance.
                </p>
                 {/* Example mock exam list or options */}
                 <div className="mt-4">
                   <h4 className="font-semibold text-foreground mb-2">Available Mock Exams</h4>
                   <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                     <li>Full Syllabus Mock Test - Science</li>
                     <li>Chapter Mock Test - Mathematics (Algebra)</li>
                     <li>Practice Set - English Grammar</li>
                     {/* Add more items */}
                   </ul>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

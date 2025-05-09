
'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
// Removed unused Card imports: Card, CardContent, CardHeader, CardTitle, CardDescription
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from 'framer-motion';
import { PlusCircle, Zap } from "lucide-react";
import Image from 'next/image';
import OpennMindLogo from '@/app/OpennMind.png'; // Import the logo

const subjects = ["Economics", "Mathematics", "Science", "English", "Social Science", "History", "Geography"];
const questionTypes = ["MCQ", "Short Answer", "Essay", "Mixed (MCQ & Subjective)"];

export default function MockExamsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gradient-to-br from-background to-muted/20 dark:from-zinc-900/50 dark:to-background">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <PlusCircle className="w-7 h-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Exam Builder</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Panel: Exam Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1 space-y-6 p-6 bg-card/80 dark:bg-card/70 border border-border/20 rounded-xl shadow-xl backdrop-blur-md"
            >
              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-muted-foreground mb-1.5 block">Subject</Label>
                <Select>
                  <SelectTrigger id="subject" className="w-full bg-background dark:bg-input rounded-lg shadow-sm">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject.toLowerCase().replace(/\s+/g, '-')}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="question-type" className="text-sm font-medium text-muted-foreground mb-1.5 block">Question type</Label>
                <Select>
                  <SelectTrigger id="question-type" className="w-full bg-background dark:bg-input rounded-lg shadow-sm">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="num-questions" className="text-sm font-medium text-muted-foreground mb-1.5 block">Number of questions</Label>
                <Input
                  id="num-questions"
                  type="number"
                  defaultValue={10}
                  className="w-full bg-background dark:bg-input rounded-lg shadow-sm"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">Skip completed questions</Label>
                <RadioGroup defaultValue="no" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="skip-yes" />
                    <Label htmlFor="skip-yes" className="font-normal text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="skip-no" />
                    <Label htmlFor="skip-no" className="font-normal text-sm">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button size="lg" className="w-full mt-4 hover:scale-105 active:scale-95 py-3 text-base">
                Generate
                <Zap className="ml-2 h-4 w-4 text-yellow-300 fill-yellow-400" />
                <span className="ml-1 font-bold text-yellow-200">7</span>
              </Button>
            </motion.div>

            {/* Right Panel: Exam Paper Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 flex items-center justify-center min-h-[400px] lg:min-h-[500px] relative"
            >
              <div className="relative w-full max-w-lg h-full flex items-center justify-center"> {/* Added flex for centering */}
                {/* Background blur/glow */}
                <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 blur-2xl rounded-full -z-10 transform scale-150"></div>

                {/* Central element displaying OpennMind.png */}
                <motion.div
                  className="relative w-[75%] md:w-[65%] lg:w-[60%] aspect-[3/4] z-10 rounded-xl overflow-hidden flex items-center justify-center" // Removed card-like styles: bg-card, shadow-2xl, border, border-border/30
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
                >
                  <Image
                    src={OpennMindLogo}
                    alt="OpennMind Logo Screen"
                    layout="fill"
                    objectFit="contain"
                    className="p-4 md:p-6" // Add some padding around the logo
                    data-ai-hint="logo brand"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
// Removed extraneous JSX that was causing the syntax error.
// The component now correctly ends with the closing brace of the function.


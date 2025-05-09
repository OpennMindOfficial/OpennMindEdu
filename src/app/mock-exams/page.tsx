
'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
              className="lg:col-span-1 space-y-6 p-6 bg-card/80 dark:bg-card/60 border border-border/20 rounded-xl shadow-xl backdrop-blur-md"
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

                {/* Exam Paper Illustrations - stacked */}
                <motion.div
                  className="absolute w-[70%] md:w-[60%] lg:w-[55%] aspect-[3/4] transform -rotate-[8deg] translate-x-[-15%] translate-y-[5%]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -15, y: 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  <Card className="h-full w-full bg-card shadow-2xl rounded-xl overflow-hidden border border-border/30">
                    <CardHeader className="p-3 border-b border-border/20 bg-muted/30">
                       <div className="flex items-center gap-1.5">
                         <Image src={OpennMindLogo} alt="OpennMind Logo" width={16} height={16} data-ai-hint="logo brand"/>
                         <CardTitle className="text-xs font-semibold text-muted-foreground">OpennMind</CardTitle>
                       </div>
                    </CardHeader>
                    <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                        <p className="text-xs text-muted-foreground mt-1">Question Paper Preview</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-4" data-ai-hint="exam paper test">A fall in income leads to a fall in demand for the good between the demand for the...</p>
                        <div className="mt-4 space-y-2 w-full">
                            <div className="h-2 bg-muted/50 rounded-full w-full"></div>
                            <div className="h-2 bg-muted/50 rounded-full w-3/4"></div>
                            <div className="h-2 bg-muted/50 rounded-full w-full"></div>
                        </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="absolute w-[70%] md:w-[60%] lg:w-[55%] aspect-[3/4] transform rotate-[2deg] translate-x-[5%] translate-y-[-5%]"
                  initial={{ opacity: 0, scale: 0.8, rotate: 10, y: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
                >
                  <Card className="h-full w-full bg-card shadow-2xl rounded-xl overflow-hidden border border-border/30">
                     <CardHeader className="p-3 border-b border-border/20 bg-muted/30">
                        <div className="flex items-center gap-1.5">
                         <Image src={OpennMindLogo} alt="OpennMind Logo" width={16} height={16} data-ai-hint="logo brand"/>
                         <CardTitle className="text-xs font-semibold text-muted-foreground">OpennMind</CardTitle>
                       </div>
                    </CardHeader>
                    <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                        <h2 className="text-sm font-bold text-foreground" data-ai-hint="physics test">Physics Test Paper</h2>
                        <p className="text-xs text-muted-foreground mt-1">15 questions, 45 minutes</p>
                        <div className="mt-4 space-y-2 w-full">
                            <div className="h-2 bg-muted/50 rounded-full w-full"></div>
                            <div className="h-2 bg-muted/50 rounded-full w-3/4"></div>
                        </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="relative w-[75%] md:w-[65%] lg:w-[60%] aspect-[3/4] z-10" // Main card on top
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
                >
                  <Card className="h-full w-full bg-card shadow-2xl rounded-xl overflow-hidden border border-border/30">
                     <CardHeader className="p-4 border-b border-border/20 bg-muted/30">
                       <div className="flex items-center gap-2">
                         <Image src={OpennMindLogo} alt="OpennMind Logo" width={20} height={20} data-ai-hint="logo brand" />
                         <CardTitle className="text-sm font-bold text-foreground">OpennMind</CardTitle>
                       </div>
                    </CardHeader>
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                      <h2 className="text-lg font-bold text-foreground mb-1" data-ai-hint="economics test">Economics Test Paper</h2>
                      <p className="text-xs text-muted-foreground mb-6">10 questions, 1 hour</p>
                      <Button className="hover:scale-105 active:scale-95">Start Exam</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}


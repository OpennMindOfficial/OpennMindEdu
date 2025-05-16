
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, Link as LinkIcon, Sparkles, GraduationCap, FileText, Zap } from "lucide-react";
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes'; 
import { gsap } from 'gsap'; 

const headingOptions = [
  {
    text1: "Instant",
    icon1: GraduationCap,
    text2: "quizzes",
    color2: "text-green-400",
    text3: "from",
    icon2: FileText,
    text4: "PDFs",
    color4: "text-orange-400",
    text5: "with",
    icon3: Sparkles,
    text6: "AI",
    color6: "text-purple-400",
  },
  {
    text1: "Summarize",
    icon1: FileText,
    text2_part1: "docs ", 
    color2_part1: "text-blue-400", 
    text2_part2: "fast", 
    color2_part2: "text-white", // Default for dark theme
    text3: "using",
    icon2: Sparkles,
    text4: "AI",
    color4: "text-purple-400",
    text5: "in seconds.",
    icon3: null,
    text6: "",
    color6: "text-yellow-400", 
  },
  {
    text1: "Extract",
    icon1: null,
    text2: "insights",
    color2: "text-teal-400",
    text3: "from",
    icon2: FileText,
    text4: "articles",
    color4: "text-red-400",
    text5: "with",
    icon3: Sparkles,
    text6: "AI",
    color6: "text-purple-400",
  },
];

export default function PdfToNotesPage() {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme(); 

  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Ref for the main content container

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % headingOptions.length);
    }, 3000); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "application/pdf" && selectedFile.size <= 25 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        alert("Please upload a PDF file smaller than 25MB.");
        event.target.value = ""; 
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const droppedFile = event.dataTransfer.files[0];
       if (droppedFile.type === "application/pdf" && droppedFile.size <= 25 * 1024 * 1024) {
        setFile(droppedFile);
      } else {
        alert("Please upload a PDF file smaller than 25MB.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleGenerate = () => {
    if (!file && !link) {
      alert("Please upload a PDF or paste a link.");
      return;
    }
    setIsGenerating(true);
    console.log("Generating notes from:", file ? file.name : link);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Notes generated (simulated)!");
    }, 2000);
  };

  const currentHeading = headingOptions[currentHeadingIndex];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main ref={pageRef} className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 md:pb-8 pt-6 md:pt-8 flex flex-col items-center justify-start bg-gradient-to-br from-background to-zinc-900/30 dark:from-black dark:to-zinc-900/50 text-foreground">
          <div
            ref={contentRef}
            className="w-full max-w-2xl text-center space-y-4" 
          >
            <AnimatePresence mode="wait">
              <h1
                key={currentHeadingIndex}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight min-h-[3em] flex flex-col justify-center items-center"
                // GSAP will handle animation, Framer Motion props removed from here
              >
                <span>
                  {currentHeading.text1}{' '}
                  {currentHeading.icon1 && (
                    <currentHeading.icon1
                      className={cn(
                        "inline-block w-10 h-10 mb-1 sm:w-12 sm:h-12 md:w-14 md:h-14 align-middle",
                        (currentHeading as any).color2_part1 || currentHeading.color2 || 'text-primary'
                      )}
                    />
                  )}
                  {(currentHeading as any).text2_part1 ? (
                    <>
                      <span className={(currentHeading as any).color2_part1}>{(currentHeading as any).text2_part1}</span>
                      {(currentHeading as any).text2_part2 && (
                        <span className={cn(
                          (currentHeading.text1 === "Summarize" && (currentHeading as any).text2_part2 === "fast")
                            ? (theme === 'light' ? 'text-black' : 'text-white')
                            : (currentHeading as any).color2_part2
                        )}>
                          {(currentHeading as any).text2_part2}
                        </span>
                      )}
                    </>
                  ) : (
                    currentHeading.text2 && <span className={currentHeading.color2}>{currentHeading.text2}</span>
                  )}
                  {' '}
                </span>
                <span>
                  {currentHeading.text3}{' '}
                  {currentHeading.icon2 && <currentHeading.icon2 className={cn("inline-block w-10 h-10 mb-1 sm:w-12 sm:h-12 md:w-14 md:h-14 align-middle", currentHeading.color4 || 'text-primary')} />}
                  <span className={currentHeading.color4}>{currentHeading.text4}</span>{' '}
                  {currentHeading.text5}{' '}
                  {currentHeading.icon3 && <currentHeading.icon3 className={cn("inline-block w-10 h-10 mb-1 sm:w-12 sm:h-12 md:w-14 md:h-14 align-middle", currentHeading.color6 || 'text-primary')} />}
                  <span className={currentHeading.color6}>{currentHeading.text6}</span>
                </span>
              </h1>
            </AnimatePresence>

            <Card className="bg-card/70 dark:bg-zinc-800/60 border border-dashed border-border/50 rounded-xl shadow-xl backdrop-blur-md p-6 md:p-8">
              <CardContent className="p-0 space-y-6">
                <div
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <UploadCloud className="w-12 h-12 text-muted-foreground/70 mb-3" />
                  <p className="text-sm font-medium text-foreground">
                    Drag & drop to upload
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">.pdf • Max 25MB</p>
                  <Button variant="outline" size="sm" className="text-xs pointer-events-none hover:scale-105 active:scale-95">
                    Choose file
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                {file && (
                  <p className="text-sm text-center text-green-500">Selected: {file.name}</p>
                )}

                <div className="flex items-center space-x-3">
                  <LinkIcon className="w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Paste any website link or upload a file"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="flex-1 bg-background/80 dark:bg-input/80 rounded-lg shadow-inner"
                  />
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || (!file && !link.trim())}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold hover:scale-105 active:scale-95"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 mr-1.5" />
                    )}
                    Generate
                    {!isGenerating && <span className="ml-1.5 text-xs bg-purple-700/50 px-1.5 py-0.5 rounded-sm">5</span>}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center">
              By uploading, you agree to our{' '}
              <a href="#" className="underline hover:text-primary">
                terms of service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-primary">
                privacy policy
              </a>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

const Loader2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

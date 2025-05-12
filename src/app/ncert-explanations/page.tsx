
'use client';

import React, { useState } from 'react';
// Header component removed
import { SourcesSidebar, type SourceItem } from "@/components/ncert/sources-sidebar";
import { NotebookGuide } from "@/components/ncert/notebook-guide";
import { AudioOverview } from "@/components/ncert/audio-overview";
import { HelpUnderstand } from "@/components/ncert/help-understand";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Share2, StickyNote, ArrowLeft, Info, Play, ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from "lucide-react";


const initialSources: SourceItem[] = [
  { id: '1', title: 'Action and Reaction: Understanding Newton\'s Third Law in Everyday Life Scenarios and Beyond', type: 'document', checked: true },
  { id: '2', title: 'Balanced and Unbalanced Forces: A Comprehensive Study of Equilibrium and Motion', type: 'document', checked: true },
  { id: '3', title: 'Elemental Physics, Third Edition, Chapter 4: Forces and Motion', type: 'pdf', checked: true },
  { id: '4', title: 'Forces At Play in Complex Mechanical Systems', type: 'document', checked: false },
  { id: '5', title: 'Friction Frenzy: Exploring Surface Interactions and Their Effects on Movement', type: 'document', checked: true },
  { id: '6', title: 'Gravity\'s Grip: The Universal Force That Shapes Worlds and Governs Celestial Bodies', type: 'pdf', checked: false },
  { id: '7', title: 'Inertia In Action: Understanding Motion\'s Resistance to Change and Its Implications', type: 'document', checked: true },
  { id: '8', title: 'Momentum Mania: Investigating Collisions, Impulse, and Conservation Principles in Dynamics', type: 'document', checked: false },
  { id: '9', title: 'Newton\'s Three Laws of Motion: A Foundational Overview with Examples and Applications', type: 'pdf', checked: true },
  { id: '10', title: 'Simple Machines Make Work Easier: Levers, Pulleys, and Inclined Planes Explained', type: 'document', checked: false },
  { id: '11', title: 'Understanding Speed, Velocity, and Acceleration as Key Concepts in Kinematics', type: 'document', checked: true },
];

const helpUnderstandQuestions = [
  "How do Newton's three laws of motion comprehensively explain the diverse ways in which objects move and interact with each other in various physical contexts?",
  "What are the fundamental distinctions between different types of forces, such as gravitational, electromagnetic, and nuclear forces, and how do they uniquely affect objects?",
  "Can you elucidate the intricate relationship between speed, velocity, acceleration, and momentum, and how these vector and scalar quantities are interconnected in dynamics?"
];

export default function NcertExplanationsPage() {
  const [sources, setSources] = useState<SourceItem[]>(initialSources);
  const [chatInput, setChatInput] = useState('');

  const handleSourceToggle = (id: string) => {
    setSources(prevSources =>
      prevSources.map(source =>
        source.id === id ? { ...source, checked: !source.checked } : source
      )
    );
  };

  const selectedSourcesCount = sources.filter(s => s.checked).length;

  return (
    // Removed Header component from here
    <div className="flex h-screen flex-row bg-muted/30 dark:bg-background"> {/* Changed to flex-row */}
      <SourcesSidebar sources={sources} onSourceToggle={handleSourceToggle} />

      <div className="flex flex-1 flex-col overflow-hidden"> {/* This will be the main content area */}
        {/* Page-specific Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between p-4 border-b border-border bg-card dark:bg-zinc-800/50 shadow-sm"
        >
          <div className="flex items-center gap-3">
              <Link href="/" passHref legacyBehavior>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full hover:scale-105 active:scale-95">
                      <ArrowLeft className="w-4 h-4" />
                  </Button>
              </Link>
              <h1 className="text-lg font-semibold text-foreground">Science in motion</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs hover:scale-105 active:scale-95">
              <StickyNote className="w-3.5 h-3.5 mr-1.5" /> Add note
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full hover:scale-105 active:scale-95">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full hover:scale-105 active:scale-95">
              <Share2 className="w-4 h-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/user1/40/40" alt="User Avatar" data-ai-hint="person user"/>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Center Column (Notebook Guide & Chat) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col space-y-6 bg-card dark:bg-zinc-800/70 p-6 rounded-xl shadow-lg border border-border/20"
            >
              <NotebookGuide />
              
              {/* Chat Input Area */}
              <div className="mt-auto pt-4 border-t border-border/20">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10 hover:scale-105 active:scale-95">View chat</Button>
                  <span className="text-xs text-muted-foreground">{selectedSourcesCount} sources</span>
                </div>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Start typing..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 pr-20 bg-muted/50 dark:bg-zinc-700/50 rounded-lg shadow-inner h-10"
                  />
                  <Button size="icon" className="absolute right-11 top-1/2 -translate-y-1/2 h-8 w-8 bg-transparent hover:bg-primary/10 text-primary hover:scale-105 active:scale-95">
                      <Sparkles className="w-4 h-4"/>
                      <span className="sr-only">AI suggestions</span>
                  </Button>
                  <Button type="submit" size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 hover:scale-105 active:scale-95">
                    <ArrowLeft className="w-4 h-4 rotate-180" /> {/* Using ArrowLeft and rotating for send icon */}
                     <span className="sr-only">Send</span>
                  </Button>
                </div>
                 <div className="flex items-center justify-end mt-2">
                      <Button variant="link" size="sm" className="text-xs text-primary hover:scale-105 active:scale-95 px-1">
                          * Notebook guide
                      </Button>
                  </div>
              </div>
            </motion.div>

            {/* Right Column (Audio Overview & Help) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6"
            >
              <AudioOverview title="Science in Motion" currentTime="1:41" totalTime="3:01" />
              <HelpUnderstand questions={helpUnderstandQuestions} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


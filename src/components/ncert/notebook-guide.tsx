
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, ListChecks, FileText, Clock, Brain, HelpCircle } from 'lucide-react'; // Replaced old icons with new ones from image
import { motion } from 'framer-motion';

const helpCreateOptions = [
  { label: "Table of contents", icon: ListChecks },
  { label: "Study guide", icon: Brain },
  { label: "FAQ", icon: HelpCircle },
  { label: "Briefing doc", icon: FileText },
  { label: "Timeline", icon: Clock },
];

export function NotebookGuide() {
  const summaryText = `These sources provide a comprehensive exploration of the fundamental principles of physics, spanning classical mechanics, quantum mechanics, and relativity. The sources analyze forces like gravity, friction, and magnetism, using real-world examples to demonstrate their influence on motion. Newton's Laws of Motion are explored, clarifying concepts such as inertia, action-reaction pairs, and the interplay between force, mass, and acceleration. Momentum's relationship with mass and velocity is also examined in the sources. Additionally, the sources illustrate how simple machines, like levers and ramps, facilitate work.`;

  return (
    <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-foreground">Notebook guide</h2>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2.5">Help me create</h3>
        <div className="flex flex-wrap gap-2">
          {helpCreateOptions.map((opt, index) => (
            <Button key={index} variant="outline" size="sm" className="text-xs h-8 bg-muted/30 dark:bg-zinc-700/60 border-border/50 hover:bg-muted/70 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95">
              <opt.icon className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Summary</h3>
        <Textarea
          value={summaryText}
          readOnly
          className="text-sm text-foreground/90 dark:text-foreground/80 bg-muted/30 dark:bg-zinc-700/40 border-0 min-h-[150px] rounded-lg shadow-inner leading-relaxed"
        />
      </div>
    </motion.div>
  );
}

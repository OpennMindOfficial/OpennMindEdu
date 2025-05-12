
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HelpUnderstandProps {
  questions: string[];
}

export function HelpUnderstand({ questions }: HelpUnderstandProps) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
    >
        <Card className="bg-card dark:bg-zinc-800/70 border border-border/20 rounded-xl shadow-lg">
        <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Help me understand</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-2"> {/* Reduced space-y */}
            {questions.map((question, index) => (
            <Button
                key={index}
                variant="outline"
                className={cn(
                    "w-full justify-start text-left h-auto py-1.5 px-2.5 text-xs text-foreground/90 dark:text-foreground/80 bg-muted/30 dark:bg-zinc-700/60 border-border/50 hover:bg-muted/70 dark:hover:bg-zinc-700 hover:border-primary/30 dark:hover:border-primary/50", // Adjusted padding and font size
                    "block" // Ensure button takes full width to allow text-overflow to work
                )}
                title={question} // Show full question on hover
            >
                <span className="truncate block">{question}</span>
            </Button>
            ))}
        </CardContent>
        </Card>
    </motion.div>
  );
}


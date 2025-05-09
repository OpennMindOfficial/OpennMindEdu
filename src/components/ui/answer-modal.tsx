
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb } from 'lucide-react';

interface AnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionNumber: number;
  solution: string;
}

export function AnswerModal({ isOpen, onClose, questionNumber, solution }: AnswerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-card dark:bg-zinc-800 border-border/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Solution for Question {questionNumber}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <DialogDescription className="text-sm text-foreground/90 dark:text-foreground/80 whitespace-pre-wrap">
            {solution}
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="hover:scale-105 active:scale-95">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

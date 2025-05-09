
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Bookmark as BookmarkIcon, MoreHorizontal, BookOpenCheck, Share2, FileText as FileTextIcon } from "lucide-react";
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QuestionCardProps {
  questionNumber: number;
  tags: string[];
  questionText: string;
  isBookmarked: boolean;
  isDone: boolean;
  onToggleBookmark: () => void;
  onToggleDone: () => void;
  onShowAnswer: () => void;
  onMoreOptions: () => void; // Placeholder for now
}

export function QuestionCard({
  questionNumber,
  tags,
  questionText,
  isBookmarked,
  isDone,
  onToggleBookmark,
  onToggleDone,
  onShowAnswer,
  onMoreOptions,
}: QuestionCardProps) {
  return (
    <Card className={cn(
        "bg-card dark:bg-zinc-800/80 border rounded-xl shadow-lg transition-all duration-300 ease-out",
        isDone ? "border-green-500/70 dark:border-green-600/60" : "border-border/30 dark:border-zinc-700/50"
    )}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Question {questionNumber}</h3>
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5 bg-muted dark:bg-zinc-700 text-muted-foreground dark:text-zinc-400">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
                "h-8 w-8 rounded-full hover:scale-110 active:scale-95",
                isDone ? "text-green-500 hover:bg-green-500/10" : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
            )}
            onClick={onToggleDone}
            aria-label={isDone ? "Mark as not done" : "Mark as done"}
          >
            <CheckCircle2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
                "h-8 w-8 rounded-full hover:scale-110 active:scale-95",
                isBookmarked ? "text-yellow-500 hover:bg-yellow-500/10 fill-yellow-500/30" : "text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10"
            )}
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark question"}
          >
            <BookmarkIcon className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs px-3 bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:scale-105 active:scale-95"
            onClick={onShowAnswer}
          >
            <BookOpenCheck className="w-3.5 h-3.5 mr-1.5" /> Answer
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95" onClick={onMoreOptions}>
                <MoreHorizontal className="w-5 h-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card dark:bg-zinc-800 border-border/30">
              <DropdownMenuItem className="text-xs hover:bg-muted dark:hover:bg-zinc-700/50 cursor-pointer" onClick={() => console.log('Share clicked')}>
                <Share2 className="w-3.5 h-3.5 mr-2" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs hover:bg-muted dark:hover:bg-zinc-700/50 cursor-pointer" onClick={() => console.log('Export PDF clicked')}>
                <FileTextIcon className="w-3.5 h-3.5 mr-2" /> Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-foreground/90 dark:text-foreground/80 leading-relaxed">
          {questionText}
        </p>
      </CardContent>
    </Card>
  );
}

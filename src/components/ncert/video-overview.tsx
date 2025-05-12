
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, ThumbsUp, ThumbsDown, MoreVertical, Info, Youtube } from 'lucide-react'; // Changed Play to Video icon, added Youtube
import { motion } from 'framer-motion';

interface VideoOverviewProps {
  title: string;
  currentTime: string;
  totalTime: string;
}

export function VideoOverview({ title, currentTime, totalTime }: VideoOverviewProps) {
  // Calculate progress based on example times for visual representation
  const parseTimeToSeconds = (time: string) => {
    const parts = time.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };

  const currentSeconds = parseTimeToSeconds(currentTime);
  const totalSeconds = parseTimeToSeconds(totalTime);
  const progressPercentage = totalSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0;

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }} // Adjusted delay
    >
        <Card className="bg-card dark:bg-zinc-800/70 border border-border/20 rounded-xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Video Overview</CardTitle>
            <Info className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
            {/* Video Placeholder */}
            <div className="aspect-video bg-muted dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                <Youtube className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-foreground truncate" title={title}>{title}</p>
            <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10 rounded-full hover:scale-105 active:scale-95">
                <Video className="w-4 h-4 fill-primary" />
            </Button>
            <div className="flex-1 relative h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <span className="text-xs text-muted-foreground min-w-[60px] text-right">{currentTime} / {totalTime}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-full hover:scale-105 active:scale-95">
                    <ThumbsUp className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full hover:scale-105 active:scale-95">
                    <ThumbsDown className="w-3.5 h-3.5" />
                </Button>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-full hover:scale-105 active:scale-95">
                    <MoreVertical className="w-3.5 h-3.5" />
                </Button>
            </div>
        </CardContent>
        </Card>
    </motion.div>
  );
}


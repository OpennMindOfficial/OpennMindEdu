'use client'; // Keep 'use client' if other interactions remain, otherwise can remove

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type LucideProps } from "lucide-react";
import { cn } from '@/lib/utils';
// Removed useState as hover state is no longer needed
// Removed Button and Play icon as they are no longer used

interface ExamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: React.ElementType<LucideProps>;
  bgColorClass: string;
  textColorClass?: string;
  isNew?: boolean;
  className?: string;
  'data-ai-hint'?: string;
}

export function ExamCard({ title, icon: Icon, bgColorClass, textColorClass, isNew, className, ...props }: ExamCardProps) {
  // Removed useState for isHovered

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-xl border-0 shadow-md transition-shadow relative h-[140px] md:h-[160px]", // Decreased height significantly
        "flex flex-col justify-between",
        bgColorClass,
        className
      )}
      // Removed onMouseEnter and onMouseLeave handlers
      {...props}
    >
      <CardHeader className="p-4 pb-2 z-10 relative flex-shrink-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
          {isNew && <Badge variant="new" className="ml-2 self-start text-[10px] h-5 px-1.5">New</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow flex items-end justify-end relative overflow-hidden">
        {/* Icon positioned at bottom right - removed hover scaling */}
        <Icon
          className={cn(
            "absolute right-[-10px] bottom-[-10px] w-16 h-16 opacity-30 z-0 transition-transform duration-300 ease-in-out", // Slightly smaller icon size
            // Removed hover scale class: isHovered ? "scale-110" : "",
            textColorClass || "text-foreground/70"
          )}
          strokeWidth={1.5}
        />

        {/* Removed Hover Overlay & Button */}
        {/* The entire div for overlay and button is removed */}
      </CardContent>
    </Card>
  );
}

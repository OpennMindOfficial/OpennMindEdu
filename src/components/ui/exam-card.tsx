
'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type LucideIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface ExamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: LucideIcon;
  bgColorClass: string;
  textColorClass?: string;
  isNew?: boolean;
  className?: string;
  'data-ai-hint'?: string;
}

export function ExamCard({ title, icon: Icon, bgColorClass, textColorClass, isNew, className, ...props }: ExamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Internal GSAP hover animation removed to simplify and prevent conflicts with page-level entry animations.
  // Hover effects can be re-added via page.tsx if desired or using CSS.

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02]", // Basic CSS hover for now
        className
      )}
      {...props}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-xl border-0 shadow-md transition-all duration-300 ease-in-out",
          "relative h-[144px] md:h-[144px]",
          "flex flex-col justify-between cursor-pointer",
          bgColorClass,
        )}
      >
        <CardHeader className="p-4 pb-2 z-10 relative flex-shrink-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
            {isNew && <Badge variant="new" className="ml-2 self-start text-[10px] h-5 px-1.5">New</Badge>}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow flex items-end justify-end relative overflow-hidden">
          <div className={cn(
              "absolute right-[-10px] bottom-[-10px] w-16 h-16 opacity-30 z-0",
              textColorClass ? textColorClass : "text-foreground/70" // Default color if not provided
             )}>
               <Icon
                 className="w-full h-full"
                 strokeWidth={1.5}
               />
             </div>
        </CardContent>
      </Card>
    </div>
  );
}

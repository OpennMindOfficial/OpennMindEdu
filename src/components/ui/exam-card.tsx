
'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button
import { ArrowRight, type LucideIcon } from "lucide-react"; // Import ArrowRight
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; // Import motion

interface ExamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: LucideIcon; // Use LucideIcon type
  bgColorClass: string;
  textColorClass?: string;
  isNew?: boolean;
  className?: string;
  'data-ai-hint'?: string;
}

export function ExamCard({ title, icon: Icon, bgColorClass, textColorClass, isNew, className, ...props }: ExamCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div // Wrap in motion.div for animation
      className="relative group" // Add group for hover state management
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-xl border-0 shadow-md transition-all duration-300 ease-in-out", // Added transition-all
          "relative h-[140px] md:h-[140px]", // Decreased height further
          "flex flex-col justify-between cursor-pointer", // Added cursor-pointer
          bgColorClass,
          className
        )}
        {...props}
      >
        <CardHeader className="p-4 pb-2 z-10 relative flex-shrink-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
            {isNew && <Badge variant="new" className="ml-2 self-start text-[10px] h-5 px-1.5">New</Badge>}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow flex items-end justify-end relative overflow-hidden">
          {/* Icon positioned at bottom right */}
          <div className={cn(
              "absolute right-[-10px] bottom-[-10px] w-16 h-16 opacity-30 z-0 transition-transform duration-300 ease-in-out group-hover:scale-110", // Slightly smaller icon size
               textColorClass
             )}>
               <Icon
                 className="w-full h-full"
                 strokeWidth={1.5}
               />
             </div>

        </CardContent>

         {/* Hover Button - Removed */}
         {/*
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
           transition={{ duration: 0.2 }}
           className="absolute bottom-3 left-3 z-20"
         >
           <Button size="sm" variant="secondary" className="h-7 text-xs px-2.5 py-1 shadow-md bg-white/80 dark:bg-black/70 text-foreground hover:bg-white dark:hover:bg-black">
             Start Now
             <ArrowRight className="ml-1 h-3 w-3" />
           </Button>
         </motion.div>
         */}
      </Card>
    </motion.div>
  );
}


'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type LucideIcon } from "lucide-react";
import { cn } from '@/lib/utils';
// Removed GSAP import as hover animation will be simplified or handled by page.tsx entry

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

  // Temporarily removing internal GSAP hover to simplify and avoid conflicts
  // useEffect(() => {
  //   if (cardRef.current) {
  //     const tl = gsap.timeline({ paused: true });
  //     tl.to(cardRef.current, { y: -5, scale: 1.03, duration: 0.2, ease: "power1.out" });

  //     const currentCardRef = cardRef.current; 
  //     const playAnimation = () => tl.play();
  //     const reverseAnimation = () => tl.reverse();

  //     currentCardRef.addEventListener('mouseenter', playAnimation);
  //     currentCardRef.addEventListener('mouseleave', reverseAnimation);
      
  //     return () => {
  //       if (currentCardRef) {
  //         currentCardRef.removeEventListener('mouseenter', playAnimation);
  //         currentCardRef.removeEventListener('mouseleave', reverseAnimation);
  //       }
  //     };
  //   }
  // }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02]", // Simplified CSS hover
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
              textColorClass ? textColorClass : "text-foreground/70"
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

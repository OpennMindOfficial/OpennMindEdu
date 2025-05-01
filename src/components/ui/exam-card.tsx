
'use client'; // Add 'use client' for state and event handling

import Image, { type StaticImageData } from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button
import { Play, type LucideProps } from "lucide-react"; // Import Play icon and LucideProps type
import { cn } from '@/lib/utils';
import { useState } from 'react'; // Import useState

interface ExamCardProps extends React.HTMLAttributes<HTMLDivElement> { // Extend HTML attributes
  title: string;
  icon: React.ElementType<LucideProps>; // Use Lucide icon component type
  bgColorClass: string; // Tailwind class for background gradient/color
  textColorClass?: string; // Optional text color class for icon
  isNew?: boolean;
  className?: string;
  // Add data-ai-hint prop
  'data-ai-hint'?: string;
}

export function ExamCard({ title, icon: Icon, bgColorClass, textColorClass, isNew, className, ...props }: ExamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-xl border-0 shadow-md hover:shadow-lg transition-shadow relative h-[250px] md:h-[280px]", // Adjusted height
        "flex flex-col", // Use flex column layout
        bgColorClass, // Apply background color class
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props} // Spread the rest of the props including data-ai-hint
    >
      <CardHeader className="p-4 pb-2 z-10 relative flex-shrink-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          {isNew && <Badge variant="new" className="ml-2 self-start">New</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Icon */}
        <div className="relative z-10">
          <Icon
            className={cn(
              "w-24 h-24 md:w-32 md:h-32 opacity-80 transition-transform duration-300 ease-in-out",
              isHovered ? "scale-110" : "",
              textColorClass || "text-foreground/70" // Default or provided text color
            )}
            strokeWidth={1.5}
          />
        </div>

        {/* Hover Overlay & Button */}
        <div className={cn(
             "absolute inset-0 bg-gray-900/30 dark:bg-black/40 flex items-center justify-center rounded-xl transition-opacity duration-300 z-20",
             isHovered ? "opacity-100" : "opacity-0 pointer-events-none" // Show/hide based on hover
             )}>
           <Button
             variant="secondary"
             size="sm"
             className={cn(
                "px-4 font-semibold",
                "hover:scale-110 active:scale-95" // Bubble effect
             )}
           >
             <Play className="mr-2 h-4 w-4" />
             Start Now
           </Button>
         </div>
      </CardContent>
    </Card>
  );
}


    
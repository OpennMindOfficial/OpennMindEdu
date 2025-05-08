'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image, { type StaticImageData } from 'next/image'; // Import next/image
import { cn } from '@/lib/utils';

interface ExamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  imageUrl: string | StaticImageData; // Changed from icon to imageUrl
  bgColorClass: string;
  textColorClass?: string; // Keep for potential future use, but not used for image
  isNew?: boolean;
  className?: string;
  'data-ai-hint'?: string;
}

export function ExamCard({ title, imageUrl, bgColorClass, textColorClass, isNew, className, ...props }: ExamCardProps) {

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-xl border-0 shadow-md transition-shadow relative h-[140px] md:h-[160px]", // Maintain decreased height
        "flex flex-col justify-between",
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
        {/* Image positioned at bottom right */}
        <div className={cn(
            "absolute right-[-15px] bottom-[-15px] w-20 h-20 opacity-80 z-0 transition-transform duration-300 ease-in-out", // Adjusted size and position slightly
             // Removed hover scale effect
           )}>
             <Image
               src={imageUrl}
               alt={title} // Use title for alt text
               width={80} // Provide width
               height={80} // Provide height
               className="object-contain" // Use contain to show the full illustration
               style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} // Optional subtle shadow
             />
           </div>

      </CardContent>
    </Card>
  );
}

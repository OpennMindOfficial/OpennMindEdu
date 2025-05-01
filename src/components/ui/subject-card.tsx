
'use client';

import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface SubjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  imageUrl: string | StaticImageData;
  bgColorClass?: string;
  className?: string;
  'data-ai-hint'?: string;
}

export function SubjectCard({ title, imageUrl, bgColorClass, className, ...props }: SubjectCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-out hover:shadow-xl rounded-xl", // Apply rounding to the container
        className // Allows overriding width/height etc.
      )}
      {...props} // Spread the rest of the props including data-ai-hint
    >
      <Card className={cn(
        "overflow-hidden rounded-xl",
        "border-0", // No border
        bgColorClass || "bg-card/60 dark:bg-muted/40", // Apply bgColorClass or default to the card itself
        "w-full h-full", // Ensure card fills the container
        "relative" // Ensure relative positioning for overlay
      )}>
        <CardContent className="p-0 relative h-full">
          {/* Image */}
          <Image
            src={imageUrl}
            alt={title} // Keep alt text for accessibility
            fill // Use fill to cover the container
            style={{ objectFit: 'cover' }} // Cover ensures image fills space
            className="block w-full h-full rounded-xl" // Image itself fills the div, apply rounding
            priority={false}
          />
          {/* Title Overlay */}
          <div className="absolute inset-0 flex items-start justify-center p-4 bg-gradient-to-b from-black/50 to-transparent rounded-t-xl pointer-events-none">
            <h3 className="text-white text-xl md:text-2xl font-bold text-center mt-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
              {title}
            </h3>
          </div>
          {/* Optional: Add a subtle inner shadow or gradient for depth - matches screenshot border */}
           <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 dark:ring-black/20 pointer-events-none"></div>
        </CardContent>
      </Card>
    </div>
  );
}

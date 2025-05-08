
'use client';

import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SubjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  imageUrl: string | StaticImageData;
  bgColorClass?: string;
  className?: string;
  'data-ai-hint'?: string;
}

export function SubjectCard({ title, imageUrl, bgColorClass, className, ...props }: SubjectCardProps) {
  return (
    // Outer container remains a motion.div for potential future layout animations, but removed whileHover lift
    <motion.div
      className={cn(
        "overflow-visible", // Allow shadow to be visible
        "rounded-xl group", // Add group class here for hover targeting
        "relative",
        className // Apply width/height etc.
      )}
      {...props}
      // Removed whileHover lift effect from the entire card container
      // whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
    >
      <Card className={cn(
        "overflow-hidden rounded-xl", // Rounding and clipping
        "border-0", // No border
        bgColorClass || "bg-card/60 dark:bg-muted/40", // Background
        "w-full h-full", // Fill container
        "relative", // For absolute positioning inside
        "shadow-md group-hover:shadow-xl transition-shadow duration-300 ease-out" // Keep shadow effect on group hover
      )}>
        <CardContent className="p-0 relative h-full">
          {/* Image container */}
          <div
            className="relative w-full h-full overflow-hidden rounded-xl" // Ensure overflow is hidden and rounding matches card
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className={cn(
                  "block w-full h-full",
                  "transition-transform duration-300 ease-out group-hover:scale-105", // Keep image scaling on group hover
                  "transform-style-preserve-3d" // For potential 3D effects if needed later
              )}
              priority={false} // Adjust priority as needed, likely false for multiple images
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
          {/* Optional: Inner shadow/gradient */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none"></div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

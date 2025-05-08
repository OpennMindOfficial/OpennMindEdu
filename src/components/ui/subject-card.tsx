
'use client';

import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; // Import motion

interface SubjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string; // Keep title prop for potential future use or data attributes
  imageUrl: string | StaticImageData;
  bgColorClass?: string;
  className?: string;
  'data-ai-hint'?: string;
}

export function SubjectCard({ title, imageUrl, bgColorClass, className, ...props }: SubjectCardProps) {
  return (
    <motion.div // Wrap the entire card logic in motion.div if individual animation control is needed later
      className={cn(
        "overflow-hidden transition-all duration-300 ease-out hover:shadow-xl rounded-xl group", // Added group for potential hover effects within
        className // Allows overriding width/height etc.
      )}
      {...props} // Spread the rest of the props including data-ai-hint
    >
      <Card className={cn(
        "overflow-hidden rounded-xl",
        "border-0", // No border
        bgColorClass || "bg-card/60 dark:bg-muted/40", // Apply bgColorClass or default to the card itself
        "w-full h-full", // Ensure card fills the container
        "relative" // Ensure relative positioning
      )}>
        <CardContent className="p-0 relative h-full">
          {/* Image */}
           <motion.div
             className="relative w-full h-full"
             whileHover={{ scale: 1.05 }} // Apply scale effect on hover to the image container
             transition={{ type: "spring", stiffness: 300, damping: 15 }}
           >
             <Image
               src={imageUrl}
               alt={title} // Keep alt text for accessibility
               fill // Use fill to cover the container
               style={{ objectFit: 'cover' }} // Cover ensures image fills space
               className={cn(
                   "block w-full h-full rounded-xl", // Apply rounding
                   "transform-style-preserve-3d" // Required for 3D transforms if added later
               )}
               priority={false}
               sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // Provide sizes hint
             />
           </motion.div>
          {/* Optional: Add a subtle inner shadow or gradient for depth */}
           <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 dark:ring-black/20 pointer-events-none"></div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

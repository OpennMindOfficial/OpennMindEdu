
'use client'; // Add 'use client' for state and event handling

import Image, { type StaticImageData } from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button
import { Play } from "lucide-react"; // Import Play icon
import { cn } from '@/lib/utils';
import { useState } from 'react'; // Import useState

interface ExamCardProps {
  title: string;
  imageUrl: string | StaticImageData; // Accept string URL or imported image object
  bgColorClass: string; // Tailwind class for background gradient/color
  isNew?: boolean;
  className?: string;
}

export function ExamCard({ title, imageUrl, bgColorClass, isNew, className }: ExamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-xl border-0 shadow-md hover:shadow-lg transition-shadow relative h-[250px] md:h-[280px]", // Adjusted height
        bgColorClass, // Apply background color class
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4 pb-2 z-10 relative">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          {isNew && <Badge variant="new" className="ml-2">New</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full flex items-end justify-center relative">
        {/* Illustration */}
        <div className="absolute inset-0">
           <Image
              src={imageUrl}
              alt={`${title} illustration`}
              fill
              style={{ objectFit: 'contain', objectPosition: 'center bottom' }} // Contain makes sure image scales down, bottom aligned
              className="opacity-80 p-4 pt-10 transition-opacity duration-300" // Add transition
              priority={false} // Less critical images
              // Removed unoptimized as local images don't need it
           />
        </div>

         {/* Hover Overlay & Button */}
         <div className={cn(
             "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl transition-opacity duration-300 z-20",
             isHovered ? "opacity-100" : "opacity-0 pointer-events-none" // Show/hide based on hover
             )}>
           <Button variant="secondary" size="sm" className="px-4 font-semibold">
             <Play className="mr-2 h-4 w-4" />
             Start Now
           </Button>
         </div>
      </CardContent>
    </Card>
  );
}

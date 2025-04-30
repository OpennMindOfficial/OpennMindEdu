
'use client'; // This component needs client-side JS for interaction

import React, { useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image'; // Import StaticImageData
import { Card, CardContent } from "@/components/ui/card"; // Removed CardFooter import
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  title: string; // Keep title prop for alt text, even if not displayed
  imageUrl: string | StaticImageData; // Allow string or StaticImageData
  bgColorClass?: string; // Background color class prop
  className?: string;
}

export function SubjectCard({ title, imageUrl, bgColorClass, className }: SubjectCardProps) {
  const imageRef = useRef<HTMLDivElement>(null); // Ref for the image container
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Get mouse position relative to the image element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation angles based on mouse position within the image
    const maxRotate = 8; // Reduced rotation angle slightly
    const rotateX = ((mouseY / height) * 2 - 1) * -maxRotate; // Invert Y rotation
    const rotateY = ((mouseX / width) * 2 - 1) * maxRotate;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 }); // Reset rotation on mouse leave
  };

  return (
    <div
      className={cn(
        "overflow-visible transition-all duration-300 ease-out hover:shadow-xl", // Keep hover shadow, changed overflow to visible for 3D effect
        "transform-style-preserve-3d", // Keep 3D context on parent
        className // Allows overriding width/height etc.
      )}
      // Removed inline style and event handlers from here
    >
      <Card className={cn(
        "overflow-hidden rounded-xl",
        "border-0", // No border
        bgColorClass || "bg-card/60 dark:bg-muted/40", // Apply bgColorClass or default to the card itself
        "w-full h-full" // Ensure card fills the container
      )}>
        <CardContent className="p-0 relative h-full" ref={imageRef}>
            <div // Wrapper div for Image to apply transform and handlers
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.08)`, // Adjusted perspective and scale
                    transition: 'transform 0.1s ease-out', // Faster transition for responsiveness
                }}
                className="relative w-full h-full rounded-xl overflow-hidden" // Ensure wrapper takes full height and hides overflow
            >
                <Image
                  src={imageUrl}
                  alt={title} // Keep alt text for accessibility
                  fill // Use fill to cover the container
                  objectFit="cover" // Cover ensures image fills space, might crop
                  className="block w-full h-full rounded-xl transition-transform duration-300" // Image itself fills the div, apply rounding
                  priority={false} // Setting priority to false as these might be many images
                  style={{
                      // Removed translateZ from here, handled by wrapper now
                  }}
                />
                {/* Optional: Add a subtle inner shadow or gradient for depth */}
                 <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10"></div>
            </div>
        </CardContent>
         {/* CardFooter removed entirely */}
      </Card>
    </div>
  );
}

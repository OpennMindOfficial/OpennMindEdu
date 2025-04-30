
'use client'; // This component needs client-side JS for interaction

import React, { useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image'; // Import StaticImageData
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  title: string;
  imageUrl: string | StaticImageData; // Allow string or StaticImageData
  className?: string;
}

export function SubjectCard({ title, imageUrl, className }: SubjectCardProps) {
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
    const maxRotate = 10; // Max rotation angle (e.g., 10 degrees)
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
        "overflow-hidden transition-all duration-300 ease-out hover:shadow-xl rounded-xl", // Keep hover shadow on the main container
        "border-0 bg-card/60 dark:bg-muted/40",
        "transform-style-preserve-3d", // Keep 3D context on parent
        className
      )}
      // Removed inline style and event handlers from here
    >
      <Card className={cn(
        "overflow-hidden rounded-xl",
        "border-0 bg-transparent", // Make inner card transparent
        "w-full h-full"
      )}>
        <CardContent className="p-0 relative" ref={imageRef}>
            <div // Wrapper div for Image to apply transform and handlers
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05)`, // Apply 3D rotation and scale on hover
                    transition: 'transform 0.1s ease-out', // Faster transition for responsiveness
                }}
                className="relative w-full h-auto rounded-t-xl overflow-hidden" // Ensure overflow hidden for rounded corners on transform
            >
                <Image
                  src={imageUrl}
                  alt={title}
                  width={300}
                  height={200}
                  className="block w-full h-auto rounded-t-xl transition-transform duration-300" // Removed group-hover scale
                  priority={false}
                  style={{
                      // Removed translateZ from here, handled by wrapper now
                  }}
                />
                {/* Optional: Add a subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-xl"></div>
            </div>
        </CardContent>
        <CardFooter
           className="p-3 bg-transparent backdrop-blur-sm rounded-b-xl mt-[-4px] transition-all duration-300"
           style={
             {
               // Removed translateZ, keep footer static relative to card base
             }
           }
         >
          <h3 className="font-semibold text-sm text-center w-full text-foreground transition-all duration-300">
             {title}
          </h3>
        </CardFooter>
      </Card>
    </div>
  );
}


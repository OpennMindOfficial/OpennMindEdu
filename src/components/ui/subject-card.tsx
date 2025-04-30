'use client'; // This component needs client-side JS for interaction

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  title: string;
  imageUrl: string;
  className?: string;
}

export function SubjectCard({ title, imageUrl, className }: SubjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation angles based on mouse position within the card
    // Max rotation angle (e.g., 10 degrees)
    const maxRotate = 10;
    const rotateX = ((mouseY / height) * 2 - 1) * -maxRotate; // Invert Y rotation for natural feel
    const rotateY = ((mouseX / width) * 2 - 1) * maxRotate;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 }); // Reset rotation on mouse leave
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-out hover:shadow-xl rounded-xl group", // Added group class
        "border-0 bg-card/60 dark:bg-muted/40", // Explicitly define background and border here
        "transform-style-preserve-3d", // Enable 3D transformations
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05)`, // Apply 3D rotation and slight scale on hover
        transition: 'transform 0.1s ease-out', // Faster transition for responsiveness
      }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300 ease-out rounded-xl",
        "border-0 bg-transparent", // Make inner card transparent to show parent bg
        "w-full h-full" // Ensure inner card takes full size
      )}>
        <CardContent className="p-0 relative">
            <Image
              src={imageUrl}
              alt={title}
              width={300}
              height={200}
              className="rounded-t-xl w-full h-auto transition-transform duration-300 group-hover:scale-105" // Scale image slightly on hover
              priority={false} // Assuming these are lower priority
              style={{
                transform: 'translateZ(20px)', // Bring image slightly forward
              }}
            />
            {/* Optional: Add a subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-xl"></div>
        </CardContent>
        <CardFooter
           className="p-3 bg-transparent backdrop-blur-sm rounded-b-xl mt-[-4px] transition-all duration-300"
           style={{
              transform: 'translateZ(40px)', // Bring footer forward more
           }}
         >
          <h3 className="font-semibold text-sm text-center w-full text-foreground transition-all duration-300">
             {title}
          </h3>
        </CardFooter>
      </Card>
    </div>
  );
}

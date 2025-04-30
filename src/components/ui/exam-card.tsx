import Image, { type StaticImageData } from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface ExamCardProps {
  title: string;
  imageUrl: string | StaticImageData; // Accept string URL or imported image object
  bgColorClass: string; // Tailwind class for background gradient/color
  isNew?: boolean;
  className?: string;
}

export function ExamCard({ title, imageUrl, bgColorClass, isNew, className }: ExamCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden rounded-xl border-0 shadow-md hover:shadow-lg transition-shadow relative h-[250px] md:h-[280px]", // Adjusted height
      bgColorClass, // Apply background color class
      className
    )}>
      <CardHeader className="p-4 pb-2 z-10 relative">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          {isNew && <Badge variant="new" className="ml-2">New</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full flex items-end justify-center relative">
        {/* Placeholder for the illustration - using a div with background image */}
        <div className="absolute inset-0">
           <Image
              src={imageUrl}
              alt={`${title} illustration`}
              fill
              style={{ objectFit: 'contain', objectPosition: 'center bottom' }} // Contain makes sure image scales down, bottom aligned
              className="opacity-80 p-4 pt-10" // Padding to prevent image touching edges
              priority={false}
           />
        </div>

      </CardContent>
    </Card>
  );
}

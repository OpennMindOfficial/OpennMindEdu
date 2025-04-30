import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Removed unused imports
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  title: string;
  imageUrl: string;
  className?: string;
}

export function SubjectCard({ title, imageUrl, className }: SubjectCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 rounded-xl", // Increased rounding
      "border-0 bg-card/60 dark:bg-muted/40", // Adjusted background and removed border for screenshot look
      className
    )}>
      <CardContent className="p-0">
        <div className="relative aspect-[3/2.2] w-full"> {/* Slightly adjusted aspect ratio */}
          <Image
            src={imageUrl}
            alt={title}
            fill // Changed layout to fill
            objectFit="cover"
            className="rounded-t-xl" // Match card rounding
          />
           {/* Optional: Add a subtle overlay */}
           {/* <div className="absolute inset-0 bg-black/5"></div> */}
        </div>
      </CardContent>
      {/* Adjusted footer styling */}
      <CardFooter className="p-3 bg-transparent backdrop-blur-sm rounded-b-xl mt-[-4px]"> {/* Transparent background, slight blur */}
        <h3 className="font-semibold text-sm text-center w-full text-foreground">{title}</h3>
      </CardFooter>
    </Card>
  );
}

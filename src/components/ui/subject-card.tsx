import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
          {/* Using width/height for explicit sizing */}
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={200}
            className="rounded-t-xl w-full h-auto" // Ensure image scales width-wise, maintaining aspect ratio defined by width/height
            priority={false} // Optional: set to true for images above the fold
          />
      </CardContent>
      {/* Adjusted footer styling */}
      <CardFooter className="p-3 bg-transparent backdrop-blur-sm rounded-b-xl mt-[-4px]"> {/* Transparent background, slight blur */}
        <h3 className="font-semibold text-sm text-center w-full text-foreground">{title}</h3>
      </CardFooter>
    </Card>
  );
}

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
      "overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 rounded-xl",
      "border-0 bg-card/60 dark:bg-muted/40", // Explicitly define background and border here
      className
    )}>
      <CardContent className="p-0">
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={200}
            className="rounded-t-xl w-full h-auto"
            priority={false} // Assuming these are lower priority
          />
      </CardContent>
      <CardFooter className="p-3 bg-transparent backdrop-blur-sm rounded-b-xl mt-[-4px]">
        <h3 className="font-semibold text-sm text-center w-full text-foreground">{title}</h3>
      </CardFooter>
    </Card>
  );
}

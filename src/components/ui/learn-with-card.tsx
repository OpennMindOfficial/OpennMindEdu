
import type React from 'react';
import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';

interface LearnWithCardProps {
  title: string;
  icon: React.ElementType<LucideProps>; 
  bgColorClass: string; 
  textColorClass: string; 
  className?: string;
  'data-ai-hint'?: string;
}

export function LearnWithCard({
  title,
  icon: Icon,
  bgColorClass,
  textColorClass,
  className,
  ...props
}: LearnWithCardProps) {
  return (
    <div // Using a simple div, GSAP will handle animations from page.tsx
      className={cn(
        'rounded-xl p-4 relative overflow-hidden h-32 md:h-36 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-lg', // Simplified hover effects
        bgColorClass,
        textColorClass,
        className
      )}
      {...props}
    >
      <h3 className="text-lg font-semibold z-10">{title}</h3>
      <Icon className="absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-30 z-0 text-inherit" strokeWidth={1.5} />
    </div>
  );
}

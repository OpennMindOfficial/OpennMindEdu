
import type React from 'react';
import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';
// Removed motion import as GSAP will handle entry from page.tsx

interface LearnWithCardProps {
  title: string;
  icon: React.ElementType<LucideProps>; 
  bgColorClass: string; 
  textColorClass: string; 
  className?: string;
  'data-ai-hint'?: string; // Added data-ai-hint
}

export function LearnWithCard({
  title,
  icon: Icon,
  bgColorClass,
  textColorClass,
  className,
  ...props // Spread other props like data-ai-hint
}: LearnWithCardProps) {
  return (
    <div // Changed from motion.div to simple div
      className={cn(
        'rounded-xl p-4 relative overflow-hidden h-32 md:h-36 flex flex-col justify-between transition-transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg',
        bgColorClass,
        textColorClass,
        className
      )}
      // Removed whileHover prop
      {...props} // Spread props here
    >
      <h3 className="text-lg font-semibold z-10">{title}</h3>
      <Icon className="absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-30 z-0 text-inherit" strokeWidth={1.5} />
    </div>
  );
}

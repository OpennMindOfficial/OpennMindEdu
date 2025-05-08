
import type React from 'react';
import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

interface LearnWithCardProps {
  title: string;
  icon: React.ElementType<LucideProps>; // Expect a Lucide icon component
  bgColorClass: string; // Tailwind class for background color
  textColorClass: string; // Tailwind class for text color
  className?: string;
}

export function LearnWithCard({
  title,
  icon: Icon,
  bgColorClass,
  textColorClass,
  className,
}: LearnWithCardProps) {
  return (
    <motion.div // Wrap in motion.div for animation
      className={cn(
        'rounded-xl p-4 relative overflow-hidden h-32 md:h-36 flex flex-col justify-between transition-transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg',
        bgColorClass,
        textColorClass,
        className
      )}
      whileHover={{ y: -5 }} // Example hover effect
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h3 className="text-lg font-semibold z-10">{title}</h3>
      <Icon className="absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-30 z-0 text-inherit" strokeWidth={1.5} />
    </motion.div>
  );
}

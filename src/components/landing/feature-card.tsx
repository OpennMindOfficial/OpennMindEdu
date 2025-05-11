'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  'data-ai-hint'?: string;
}

export function FeatureCard({ icon, title, description, className, "data-ai-hint": dataAiHint }: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "p-6 md:p-8 bg-background dark:bg-card/50 rounded-xl shadow-lg text-left border border-border/30", // text-left
        className
      )}
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300 }}
      data-ai-hint={dataAiHint}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

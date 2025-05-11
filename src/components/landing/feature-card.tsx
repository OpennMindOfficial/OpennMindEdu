
'use client';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  'data-ai-hint'?: string;
}

export function FeatureCard({ icon, title, description, "data-ai-hint": dataAiHint }: FeatureCardProps) {
  return (
    <motion.div 
      className="p-6 md:p-8 bg-slate-100 dark:bg-slate-700/50 rounded-xl shadow-lg text-center"
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      data-ai-hint={dataAiHint}
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  );
}

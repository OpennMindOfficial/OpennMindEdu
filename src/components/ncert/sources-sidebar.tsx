'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, FileType2, ListFilter, Plus, BookText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import OpennMindLogoLight from '@/app/lt.png';
import OpennMindLogoDark from '@/app/dt.png';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export interface SourceItem {
  id: string;
  title: string;
  type: 'document' | 'pdf';
  checked: boolean;
}

interface SourcesSidebarProps {
  sources: SourceItem[];
  onSourceToggle: (id: string) => void;
}

export function SourcesSidebar({ sources, onSourceToggle }: SourcesSidebarProps) {
  const { theme } = useTheme();
  const [currentLogo, setCurrentLogo] = React.useState(OpennMindLogoLight);
   const [isExpanded, setIsExpanded] = React.useState(true); // For future expand/collapse functionality

  React.useEffect(() => {
    setCurrentLogo(theme === 'dark' ? OpennMindLogoDark : OpennMindLogoLight);
  }, [theme]);


  const getIconForType = (type: SourceItem['type']) => {
    switch (type) {
      case 'pdf':
        return <FileType2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />; // Slightly smaller icon
      case 'document':
      default:
        return <FileText className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />; // Slightly smaller icon
    }
  };

  return (
    <motion.aside 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
            "flex flex-col h-full border-r border-border bg-card dark:bg-zinc-800/30 shadow-md",
            isExpanded ? "w-72" : "w-20" 
        )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-2">
          <Image src={currentLogo} alt="OpennMind Logo" width={24} height={24} className="rounded-sm" />
          {isExpanded && <span className="font-semibold text-sm text-foreground">OpennMind</span>}
          {isExpanded && <Badge variant="outline" className="text-xs border-orange-400 text-orange-500 bg-orange-500/10">EXPERIMENTAL</Badge>}
        </div>
      </div>

      {/* Sources Section Header */}
      <div className="p-4 pb-2"> {/* Reduced bottom padding */}
        <div className="flex items-center justify-between mb-2"> {/* Reduced bottom margin */}
          <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">Sources</h2> {/* Changed to text-xs */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-md hover:scale-105 active:scale-95">
              <ListFilter className="w-3.5 h-3.5" /> {/* Adjusted icon size */}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-md hover:scale-105 active:scale-95">
              <Plus className="w-3.5 h-3.5" /> {/* Adjusted icon size */}
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-2 pb-4">
        <ul className="space-y-1">
          {sources.map(source => (
            <motion.li 
              key={source.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: sources.indexOf(source) * 0.03 }}
              className="overflow-hidden" 
            >
              <label
                htmlFor={`source-${source.id}`}
                className={cn(
                  "flex items-center gap-2.5 p-2 rounded-md cursor-pointer transition-colors duration-150 overflow-hidden", // Added overflow-hidden
                  "hover:bg-muted/50 dark:hover:bg-zinc-700/40",
                  source.checked ? "bg-primary/10 dark:bg-primary/20" : ""
                )}
                title={source.title} // Show full title on hover
              >
                {getIconForType(source.type)}
                {isExpanded && (
                    <span className="text-[11px] font-medium text-foreground truncate flex-1 min-w-0 leading-tight">
                      {source.title}
                    </span>
                )}
                <Checkbox
                  id={`source-${source.id}`}
                  checked={source.checked}
                  onCheckedChange={() => onSourceToggle(source.id)}
                  className="ml-auto flex-shrink-0 h-3.5 w-3.5" // Smaller checkbox
                />
              </label>
            </motion.li>
          ))}
        </ul>
      </ScrollArea>
      { isExpanded && (
        <div className="p-3 border-t border-border/50 text-center"> {/* Adjusted padding */}
            <Button variant="link" size="sm" className="text-[11px] text-muted-foreground hover:text-primary h-auto py-1"> {/* Custom smaller font */}
                <BookText className="w-3 h-3 mr-1.5"/> {/* Adjusted icon size */}
                View all sources
            </Button>
        </div>
      )}
    </motion.aside>
  );
}

'use client';

import React from 'react';
import { Rnd, type RndResizeCallback, type RndDragCallback } from 'react-rnd';
import { GripVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolWindowProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  minWidth?: number;
  minHeight?: number;
  className?: string;
}

export function ToolWindow({
  title,
  children,
  isOpen,
  onClose,
  initialWidth = 350, // Adjusted default width
  initialHeight = 400, // Adjusted default height for scientific calc
  initialX = 50,
  initialY = 50,
  minWidth = 250, // Adjusted min width
  minHeight = 300, // Adjusted min height
  className,
}: ToolWindowProps) {
  const [zIndex, setZIndex] = React.useState(10); // Basic z-index management

  const handleDragStart = () => {
    // Bring window to front on drag/click
    // In a multi-window setup, you'd manage z-indices globally
    setZIndex(prev => prev + 10); // Increase z-index more significantly
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Rnd
      default={{
        x: initialX,
        y: initialY,
        width: initialWidth,
        height: initialHeight,
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="parent" // Constrain dragging within the viewport or a specific parent
      className={cn(
        "bg-card shadow-2xl rounded-lg overflow-hidden border border-border flex flex-col pointer-events-auto", // Ensure flex-col here
        className
      )}
      style={{ zIndex }}
      onDragStart={handleDragStart}
      onResizeStart={handleDragStart}
      onClick={handleDragStart} // Also bring to front on click
      dragHandleClassName="drag-handle" // Class for the drag handle area
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: true,
        topRight: true,
      }}
    >
      {/* Header Bar - Added drag-handle class and cursor */}
      <div className="drag-handle flex items-center justify-between px-3 py-1.5 bg-secondary border-b border-border cursor-move h-8 shrink-0"> {/* Added shrink-0 */}
        <GripVertical className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground truncate flex-1 text-center mx-2">
          {title}
        </span>
        <button
          onClick={(e) => {
             e.stopPropagation(); // Prevent Rnd click handler
             onClose();
           }}
          className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area - Ensure it can grow */}
      <div className="flex-1 overflow-auto h-full w-full"> {/* Added h-full and w-full */}
        {children}
      </div>
    </Rnd>
  );
}

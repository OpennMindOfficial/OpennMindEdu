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
  initialWidth = 400,
  initialHeight = 300,
  initialX = 50,
  initialY = 50,
  minWidth = 200,
  minHeight = 150,
  className,
}: ToolWindowProps) {
  const [zIndex, setZIndex] = React.useState(10); // Basic z-index management

  const handleDragStart = () => {
    // Bring window to front on drag/click
    // In a multi-window setup, you'd manage z-indices globally
    setZIndex(prev => prev + 1);
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
        "bg-card shadow-2xl rounded-lg overflow-hidden border border-border flex flex-col",
        className
      )}
      style={{ zIndex }}
      onDragStart={handleDragStart}
      onResizeStart={handleDragStart}
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
      {/* Header Bar */}
      <div className="drag-handle flex items-center justify-between px-3 py-1.5 bg-secondary border-b border-border cursor-move h-8">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground truncate flex-1 text-center mx-2">
          {title}
        </span>
        <button
          onClick={onClose}
          className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </Rnd>
  );
}

'use client'; // Required for useEffect and DOM manipulation

import React, { useEffect, useRef } from 'react';

// Declare Desmos globally. Ensure the Desmos script is loaded in layout.tsx
declare const Desmos: any;

export function ScientificCalculator() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const desmosInstance = useRef<any>(null); // To store the Desmos instance

  useEffect(() => {
    // Ensure Desmos is loaded and the ref is available
    if (typeof Desmos !== 'undefined' && calculatorRef.current) {
      // Initialize the calculator only if it hasn't been initialized yet
      if (!desmosInstance.current) {
        // Use ScientificCalculator as requested
        desmosInstance.current = Desmos.ScientificCalculator(calculatorRef.current, {
          // Optional: Add Desmos configuration options here if needed
          // e.g., keypad: false, expressions: false (though keypad is usually desired for scientific)
        });
        // Make sure the container div has size. Flex-grow helps fill ToolWindow.
        calculatorRef.current.style.width = '100%';
        calculatorRef.current.style.height = '100%';
      }
    }

    // Cleanup function to destroy the calculator instance when the component unmounts
    return () => {
      if (desmosInstance.current) {
        console.log("Destroying Desmos scientific calculator instance");
        desmosInstance.current.destroy();
        desmosInstance.current = null; // Clear the ref
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="p-0 h-full w-full overflow-hidden bg-background text-foreground flex flex-col">
      {/* Container for the Desmos calculator */}
      {/* Use flex-grow to make it fill available space within ToolWindow */}
      <div
        id="desmos-scientific-calculator-container" // Unique ID
        ref={calculatorRef}
        className="w-full h-full flex-grow" // Use flex-grow and h-full/w-full
        style={{ minHeight: '200px' }} // Ensure it has some minimum height initially
      ></div>
       {/* ToolWindow controls the outer size and resizing */}
    </div>
  );
}

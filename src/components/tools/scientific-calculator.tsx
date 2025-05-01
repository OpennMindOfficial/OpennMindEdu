'use client'; // Required for useEffect and DOM manipulation

import React, { useEffect, useRef } from 'react';

// Declare Desmos globally or install @types/desmos if available
declare const Desmos: any;

export function ScientificCalculator() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const desmosInstance = useRef<any>(null); // To store the Desmos instance

  useEffect(() => {
    // Ensure Desmos is loaded and the ref is available
    if (typeof Desmos !== 'undefined' && calculatorRef.current) {
      // Initialize the calculator only if it hasn't been initialized yet
      if (!desmosInstance.current) {
         // Using GraphingCalculator as per user's provided script
         // If Scientific Calculator is needed, use Desmos.ScientificCalculator(calculatorRef.current);
        desmosInstance.current = Desmos.GraphingCalculator(calculatorRef.current, {
            // Optional: Add Desmos configuration options here if needed
            // e.g., keypad: false, expressions: false
        });
      }
    }

    // Cleanup function to destroy the calculator instance when the component unmounts
    return () => {
      if (desmosInstance.current) {
        desmosInstance.current.destroy();
        desmosInstance.current = null; // Clear the ref
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="p-0 h-full overflow-hidden bg-background text-foreground flex flex-col">
      {/* Container for the Desmos calculator */}
      {/* Use flex-grow to make it fill available space */}
      <div
        id="desmos-calculator-container" // Changed id to avoid potential global conflicts if 'calculator' is used elsewhere
        ref={calculatorRef}
        className="w-full flex-grow" // Use flex-grow and ensure width/height are controlled by parent (ToolWindow)
        style={{ minHeight: '100px' }} // Ensure it has some minimum height
      ></div>
       {/* You might need to adjust ToolWindow's initial/min height/width
           for the Desmos calculator to render correctly */}
    </div>
  );
}

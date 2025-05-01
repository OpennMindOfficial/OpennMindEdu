'use client'; // Required for useEffect and DOM manipulation

import React, { useEffect, useRef } from 'react';

// Declare Desmos globally. Ensure the Desmos script is loaded in layout.tsx
declare const Desmos: any;

export function GraphingCalculator() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const desmosInstance = useRef<any>(null); // To store the Desmos instance

  useEffect(() => {
    // Ensure Desmos is loaded and the ref is available
    if (typeof Desmos !== 'undefined' && calculatorRef.current) {
      // Initialize the calculator only if it hasn't been initialized yet
      if (!desmosInstance.current) {
        console.log("Initializing Desmos graphing calculator instance");
        // Use GraphingCalculator as requested
        desmosInstance.current = Desmos.GraphingCalculator(calculatorRef.current, {
          // Optional Desmos options from the documentation can be added here
          // e.g., keypad: true, expressions: true, settingsMenu: true etc.
          // Default settings are generally good to start with.
        });
        // Make sure the container div fills the ToolWindow space
        calculatorRef.current.style.width = '100%';
        calculatorRef.current.style.height = '100%';
      }
    }

    // Cleanup function to destroy the calculator instance when the component unmounts
    return () => {
      if (desmosInstance.current) {
        console.log("Destroying Desmos graphing calculator instance");
        desmosInstance.current.destroy();
        desmosInstance.current = null; // Clear the ref
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="p-0 h-full w-full overflow-hidden bg-background text-foreground flex flex-col">
      {/* Container for the Desmos Graphing calculator */}
      {/* Use flex-grow to make it fill available space within ToolWindow */}
      <div
        id="desmos-graphing-calculator-container" // Unique ID is good practice
        ref={calculatorRef}
        className="w-full h-full flex-grow" // Use flex-grow and h-full/w-full
        style={{ minHeight: '300px' }} // Ensure it has some minimum height initially
      >
        {/* Desmos calculator will be injected here */}
      </div>
      {/* ToolWindow controls the outer size and resizing */}
    </div>
  );
}

'use server';
/**
 * @fileOverview Initializes the Genkit AI instance with necessary plugins.
 */

import { genkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai'; // Corrected import

// Initialize Genkit with the Google AI plugin
// Ensure GOOGLE_API_KEY is set in your environment variables (.env file)
export const ai = genkit({
  plugins: [
    googleAI(), // Defaults to GOOGLE_API_KEY environment variable
  ],
  logLevel: 'debug', // Optional: Set log level for more detailed debugging
  enableTracingAndMetrics: true, // Optional: Enable tracing and metrics
});

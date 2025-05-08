'use server';
/**
 * @fileOverview AI flow for answering user doubts based on text and optional image.
 *
 * - askDoubt - A function that handles the doubt-solving process.
 * - AskDoubtInput - The input type for the askDoubt function.
 * - AskDoubtOutput - The return type for the askDoubt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema using Zod
const AskDoubtInputSchema = z.object({
  subject: z.string().describe('The subject of the doubt.'),
  doubtText: z.string().optional().describe('The user\'s typed doubt or question.'),
  imageDataUri: z.string().optional().describe(
      "An optional photo related to the doubt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AskDoubtInput = z.infer<typeof AskDoubtInputSchema>;

// Define the output schema using Zod
const AskDoubtOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation addressing the user\'s doubt.'),
  // Optional: Add diagramUrl if the AI can generate diagrams
  // diagramUrl: z.string().optional().describe('A URL to a generated diagram, if applicable.'),
});
export type AskDoubtOutput = z.infer<typeof AskDoubtOutputSchema>;


// Wrapper function to call the Genkit flow
export async function askDoubt(input: AskDoubtInput): Promise<AskDoubtOutput> {
    console.log("Calling askDoubtFlow with input:", { subject: input.subject, doubtText: input.doubtText ? `${input.doubtText.substring(0, 20)}...` : 'N/A', imageProvided: !!input.imageDataUri });
    try {
      const result = await askDoubtFlow(input);
      console.log("askDoubtFlow returned:", result);
      return result;
    } catch (error) {
        console.error("Error in askDoubtFlow:", error);
        // Provide a user-friendly error response
        return { explanation: "Sorry, I encountered an error trying to understand that. Could you please rephrase or try again?" };
    }
}

// Define the Genkit prompt
const doubtPrompt = ai.definePrompt({
    name: 'askDoubtPrompt',
    input: { schema: AskDoubtInputSchema },
    output: { schema: AskDoubtOutputSchema },
    prompt: `You are an expert tutor for the subject: {{{subject}}}.
A student has a doubt. Please provide a clear and detailed explanation to help them understand.

{{#if doubtText}}
The student asked: "{{{doubtText}}}"
{{/if}}

{{#if imageDataUri}}
They also provided this image for context:
{{media url=imageDataUri}}
Analyze the image along with the text (if provided) to give the best possible explanation.
{{else}}
{{#unless doubtText}}
The student did not provide text, only an image (or neither). Please describe what you see if an image was expected but missing, or state you need more information.
{{/unless}}
{{/if}}

Please structure your explanation clearly. If the question involves steps, break them down. If it involves a concept, explain it simply. If relevant, provide examples. Do not refer to the image unless it was provided. Address the user directly as a student.
`,
});

// Define the Genkit flow
const askDoubtFlow = ai.defineFlow(
  {
    name: 'askDoubtFlow',
    inputSchema: AskDoubtInputSchema,
    outputSchema: AskDoubtOutputSchema,
  },
  async (input) => {
      if (!input.doubtText && !input.imageDataUri) {
        return { explanation: "Please provide either a text description of your doubt or an image." };
      }

    const { output } = await doubtPrompt(input);

    if (!output) {
      console.error("askDoubtFlow - Prompt returned no output.");
      throw new Error("AI failed to generate a response."); // Or return a default error explanation
    }

    return output;
  }
);

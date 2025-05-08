'use server';
/**
 * @fileOverview AI flow for checking the status of a doubt previously submitted by the user.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit'; // Use genkit's zod export
import { defineFlow, defineTool } from '@genkit-ai/core'; // Use @genkit-ai/core

// Define the input schema using Zod
const CheckDoubtInputSchema = z.object({
  doubtId: z.string().describe('The unique identifier of the doubt to check.'),
});
export type CheckDoubtInput = z.infer<typeof CheckDoubtInputSchema>;

// Define the output schema using Zod
const CheckDoubtOutputSchema = z.object({
  status: z.string().describe('The current status of the doubt (e.g., "pending", "in_progress", "resolved", "not_found").'),
  response: z.string().optional().describe('The explanation provided by the tutor if the doubt is resolved.'),
});
export type CheckDoubtOutput = z.infer<typeof CheckDoubtOutputSchema>;

// Mock database to store doubt status (replace with actual database interaction in a real implementation)
const mockDoubtDatabase: { [key: string]: { status: string; response?: string } } = {
  'doubt_123': { status: 'resolved', response: 'The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides.' },
  'doubt_456': { status: 'pending' },
  'doubt_789': { status: 'in_progress' },
};

// Define a tool to get the status of a doubt from the mock database
const getDoubtStatusTool = defineTool(
  {
    name: 'getDoubtStatus',
    description: 'Retrieves the status and response for a given doubt ID from the database.',
    inputSchema: CheckDoubtInputSchema,
    outputSchema: CheckDoubtOutputSchema,
  },
  async (input) => {
    console.log(`[getDoubtStatus Tool] Checking doubt ID: ${input.doubtId}`);
    const doubt = mockDoubtDatabase[input.doubtId];
    if (doubt) {
      console.log(`[getDoubtStatus Tool] Found doubt: ${JSON.stringify(doubt)}`);
      return { status: doubt.status, response: doubt.response };
    } else {
       console.log(`[getDoubtStatus Tool] Doubt ID ${input.doubtId} not found.`);
       return { status: 'not_found' };
    }
  }
);


// Define the Genkit flow using the corrected import
const checkDoubtFlow = defineFlow(
  {
    name: 'checkDoubtFlow',
    inputSchema: CheckDoubtInputSchema,
    outputSchema: CheckDoubtOutputSchema,
  },
  async (input) => {
    console.log(`[checkDoubtFlow] Received input: ${JSON.stringify(input)}`);

    // Use the tool to get the doubt status
    const doubtStatusResult = await getDoubtStatusTool(input);
    console.log(`[checkDoubtFlow] Result from tool: ${JSON.stringify(doubtStatusResult)}`);

    if (!doubtStatusResult) {
       console.error("[checkDoubtFlow] Tool call failed or returned undefined.");
       return { status: 'error', response: "Failed to check the doubt status." };
    }


    let responseMessage = '';

    switch (doubtStatusResult.status) {
      case 'resolved':
        responseMessage = `Your doubt (ID: ${input.doubtId}) has been resolved. Here's the explanation: ${doubtStatusResult.response}`;
        break;
      case 'pending':
        responseMessage = `Your doubt (ID: ${input.doubtId}) is still pending. A tutor will review it soon.`;
        break;
      case 'in_progress':
        responseMessage = `A tutor is currently working on your doubt (ID: ${input.doubtId}).`;
        break;
      case 'not_found':
        responseMessage = `Sorry, we couldn't find a doubt with the ID: ${input.doubtId}. Please double-check the ID.`;
        break;
      default:
        responseMessage = `There was an issue checking the status of your doubt (ID: ${input.doubtId}). Please try again later.`;
    }

    console.log(`[checkDoubtFlow] Final response message: ${responseMessage}`);
    // Return only the necessary fields defined in the output schema
    // Note: The response message here includes more than just the optional tutor response.
    // Adjusting to return the *status* and the crafted *responseMessage* based on the status.
    return { status: doubtStatusResult.status, response: responseMessage };
  }
);

// Exported wrapper function
export async function checkDoubt(input: CheckDoubtInput): Promise<CheckDoubtOutput> {
  console.log(`Calling checkDoubt with input: ${JSON.stringify(input)}`);
  try {
    const result = await checkDoubtFlow(input);
    console.log(`checkDoubtFlow returned: ${JSON.stringify(result)}`);
    // Ensure the returned object matches the CheckDoubtOutput schema
    return result;
  } catch (error) {
    console.error("Error in checkDoubt flow:", error);
    // Provide a user-friendly error response matching the schema
    return { status: "error", response: "Sorry, I encountered an error trying to check the status. Could you please try again?" };
  }
}

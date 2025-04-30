'use server';
/**
 * @fileOverview An AI-powered question answering flow for the Tangled EdTech platform.
 *
 * - aiQuestionAnswering - A function that handles question answering on a variety of academic subjects.
 * - AIQuestionAnsweringInput - The input type for the aiQuestionAnswering function.
 * - AIQuestionAnsweringOutput - The return type for the aiQuestionAnswering function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AIQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
  subject: z.string().describe('The academic subject of the question.'),
});
export type AIQuestionAnsweringInput = z.infer<typeof AIQuestionAnsweringInputSchema>;

const AIQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
  explanation: z.string().describe('A detailed explanation of the answer.'),
});
export type AIQuestionAnsweringOutput = z.infer<typeof AIQuestionAnsweringOutputSchema>;

export async function aiQuestionAnswering(input: AIQuestionAnsweringInput): Promise<AIQuestionAnsweringOutput> {
  return aiQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiQuestionAnsweringPrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The question to be answered.'),
      subject: z.string().describe('The academic subject of the question.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the question.'),
      explanation: z.string().describe('A detailed explanation of the answer.'),
    }),
  },
  prompt: `You are an AI assistant for the Tangled EdTech platform. Your goal is to provide accurate and helpful answers to student questions on a variety of academic subjects.

  Subject: {{{subject}}}
  Question: {{{question}}}

  Answer:
  `,
});

const aiQuestionAnsweringFlow = ai.defineFlow<
  typeof AIQuestionAnsweringInputSchema,
  typeof AIQuestionAnsweringOutputSchema
>({
  name: 'aiQuestionAnsweringFlow',
  inputSchema: AIQuestionAnsweringInputSchema,
  outputSchema: AIQuestionAnsweringOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});

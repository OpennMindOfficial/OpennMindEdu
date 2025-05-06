import {genkit} from '@genkit-ai/core';
import {googleAI} from '@genkit-ai/google-ai';
import {z} from 'zod';

export const ai = genkit({
  plugins: [googleAI()],
});



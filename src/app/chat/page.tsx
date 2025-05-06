'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {genkit} from "@/ai/genkit";
import { z } from 'zod';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
}

//genkit related code
const RespondInputSchema = z.object({
  userMessage: z.string().describe('The user\'s message to respond to.'),
  photoDataUri: z.string().optional().describe(
    "A photo related to the user's message, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});

const RespondOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response to the user message.'),
});

const prompt = genkit.definePrompt({
  name: 'tangledAiChat',
  input: { schema: RespondInputSchema },
  output: { schema: RespondOutputSchema },
  prompt: `You are a helpful AI assistant for high school and college students. You can answer questions about a wide variety of subjects.

  Use the following information to respond to the user. Respond in a detailed manner.
  Message: {{{userMessage}}}
  {{#if photoDataUri}}
  Photo: {{media url=photoDataUri}}
  {{/if}}

  `,
});

const flow = genkit.defineFlow(
  {
    name: 'tangledAiChatFlow',
    inputSchema: RespondInputSchema,
    outputSchema: RespondOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function callChatApi(input: {userMessage: string, photoDataUri?: string | null}): Promise<{response: string}> {
  return flow(input);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null); // Data URI of the image
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !photo) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      image: photo || undefined,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    const currentPhoto = photo;
    setPhoto(null); // Clear the photo immediately
    setIsLoading(true);

    try {
      const aiResponse = await callChatApi({ userMessage: input, photoDataUri: currentPhoto || undefined });

      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: aiResponse.response,
      };

      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error calling chat API:", error);
      // Handle error (e.g., display an error message to the user)
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Sorry, I encountered an error processing your request.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Chat With AI</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl flex flex-col h-[calc(100vh-200px)]">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Start a conversation with our AI assistant!</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 scrollbar-hide">
                {messages.map((message) => (
                  <div key={message.id} className={`mb-2 flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={cn("rounded-xl py-2 px-3 max-w-[80%] md:max-w-[60%] break-words",
                        message.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                      {message.text}
                    </div>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Uploaded"
                        className="mt-2 rounded-md max-h-48 object-cover"
                      />
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-2 flex items-start">
                    <Avatar className="w-8 h-8 mr-3">
                      <AvatarImage src="/ai_avatar.png" alt="AI Avatar" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-xl py-2 px-3 bg-secondary text-secondary-foreground">
                      Thinking... <Loader2 className="inline-block animate-spin" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="image-upload">
                  <Input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button variant="ghost" size="icon" asChild>
                    <div className="flex items-center">
                      <ImagePlus className="h-5 w-5" />
                    </div>
                  </Button>
                </label>
                <Textarea
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 rounded-md border-input bg-background"
                />
                <Button onClick={handleSend} disabled={isLoading}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

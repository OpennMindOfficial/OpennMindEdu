"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Copy, Trash2, Loader2, CornerDownLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { aiQuestionAnswering, AIQuestionAnsweringInput, AIQuestionAnsweringOutput } from '@/ai/flows/ai-question-answering';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string | AIQuestionAnsweringOutput;
  timestamp: Date;
  subject?: string;
}

const subjects = [
  'General', 'Computer Science', 'Psychology', 'AI', 'Business', 'Math', 'Physics', 'Language', 'History', 'Communication', 'Design'
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('General');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Function to scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, []);


  // Effect to scroll down when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle message submission
  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      role: 'user',
      content: trimmedMessage,
      timestamp: new Date(),
      subject: selectedSubject,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiInput: AIQuestionAnsweringInput = {
        question: trimmedMessage,
        subject: selectedSubject,
      };
      const aiOutput = await aiQuestionAnswering(aiInput);

      const newAssistantMessage: ChatMessage = {
        id: Date.now().toString() + '-assistant',
        role: 'assistant',
        content: aiOutput,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newAssistantMessage]);

    } catch (error) {
      console.error("Error calling AI function:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + '-error',
        role: 'assistant',
        content: { answer: "Sorry, I encountered an error trying to process your request.", explanation: "Please check your connection or try again later." },
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
       toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to get response from AI. Please try again.",
      });
    } finally {
      setIsLoading(false);
      // Refocus textarea after sending
      textareaRef.current?.focus();
    }
  };

   // Handle Enter key press in textarea
   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline
      handleSendMessage();
    }
  };


  // Copy message content to clipboard
  const handleCopy = (content: string | AIQuestionAnsweringOutput) => {
    let textToCopy = '';
    if (typeof content === 'string') {
      textToCopy = content;
    } else {
      textToCopy = `Answer: ${content.answer}\n\nExplanation: ${content.explanation}`;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
       toast({ title: "Copied to clipboard!" });
    }).catch(err => {
       console.error('Failed to copy text: ', err);
       toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy text to clipboard." });
    });
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([]);
    toast({ title: "Chat cleared." });
  };

  // Toggle Chat Interface Visibility
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <>
      {/* Floating Action Button to open/close chat */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 rounded-full w-14 h-14 shadow-lg z-50"
        onClick={toggleChat}
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">Toggle Chat</span>
      </Button>

      {/* Chat Interface Container - positioned fixed */}
      {isChatOpen && (
        <div className="fixed inset-0 z-40 flex flex-col md:flex-row bg-background/80 backdrop-blur-sm dark:bg-background/90 p-0 md:p-4 lg:p-8">
          {/* Close Button for smaller screens */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 md:hidden z-50"
            onClick={toggleChat}
          >
            <CornerDownLeft className="h-5 w-5" />
            <span className="sr-only">Close Chat</span>
          </Button>

          {/* Sidebar for Subject Selection */}
          <Card className="w-full md:w-64 lg:w-72 flex flex-col border-none md:border md:rounded-l-xl md:rounded-r-none shadow-none md:shadow-md overflow-hidden">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center justify-between">
                Subjects
                <Button variant="ghost" size="icon" onClick={handleClearChat} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Clear Chat</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-grow">
              <CardContent className="p-2">
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    variant={selectedSubject === subject ? 'secondary' : 'ghost'}
                    className={`w-full justify-start mb-1 rounded-md ${selectedSubject === subject ? 'font-semibold' : ''}`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </Button>
                ))}
              </CardContent>
             </ScrollArea>
          </Card>


          {/* Main Chat Area */}
          <Card className="flex-1 flex flex-col border-none md:border md:border-l-0 rounded-r-none md:rounded-r-xl shadow-none md:shadow-md overflow-hidden">
            <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
               <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">Tangled AI Assistant</CardTitle>
                <Badge variant="outline">{selectedSubject}</Badge>
               </div>
                {/* Close button for larger screens */}
               <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
                    onClick={toggleChat}
                >
                    <CornerDownLeft className="h-5 w-5" />
                    <span className="sr-only">Close Chat</span>
                </Button>
            </CardHeader>

            <ScrollArea ref={scrollAreaRef} className="flex-grow p-4 bg-muted/20 dark:bg-muted/10">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === 'assistant' && (
                      <Avatar className="w-8 h-8 border border-primary/50">
                        <AvatarFallback><Bot size={16} /></AvatarFallback>
                      </Avatar>
                    )}
                    <Card className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl shadow-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'}`}>
                      <CardContent className="p-3 text-sm">
                        {typeof message.content === 'string' ? (
                          <p>{message.content}</p>
                        ) : (
                          <div className="space-y-2">
                            <p className="font-medium">{message.content.answer}</p>
                            <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 pt-2 border-t border-border/50">{message.content.explanation}</p>
                          </div>
                        )}
                      </CardContent>
                       <CardFooter className="p-2 pt-0 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground/80 dark:text-muted-foreground/60">
                            {format(message.timestamp, 'p')}
                            {message.subject && message.role === 'user' && ` • ${message.subject}`}
                          </span>
                          {message.role === 'assistant' && (
                             <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground" onClick={() => handleCopy(message.content)}>
                               <Copy className="w-3 h-3" />
                               <span className="sr-only">Copy</span>
                             </Button>
                          )}
                       </CardFooter>
                    </Card>
                    {message.role === 'user' && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback><User size={16} /></AvatarFallback>
                        {/* Add AvatarImage if user profile pic is available */}
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex justify-start gap-3 items-center">
                      <Avatar className="w-8 h-8 border border-primary/50">
                          <AvatarFallback><Bot size={16} /></AvatarFallback>
                      </Avatar>
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                   </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t flex items-center gap-2 bg-background">
              <Textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask anything about ${selectedSubject}... (Shift+Enter for newline)`}
                className="flex-1 resize-none rounded-xl pr-12"
                rows={1}
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="absolute right-6 bottom-6 w-8 h-8 rounded-lg"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

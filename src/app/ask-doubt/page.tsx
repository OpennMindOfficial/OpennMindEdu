
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, ImagePlus, Loader2, Bot, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { askDoubt, type AskDoubtInput, type AskDoubtOutput } from '@/ai/flows/ask-doubt-flow'; // Import the Genkit flow

// Define message structure
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
}

// Example subjects (replace with actual data source if available)
const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
  "Information Technology",
  "Social Science",
  "Hindi",
];

export default function AskDoubtPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null); // Data URI of the image
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !photo) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please type your doubt or upload an image.',
      });
      return;
    }
    if (!selectedSubject) {
      toast({
        variant: 'destructive',
        title: 'Subject Required',
        description: 'Please select a subject for your doubt.',
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      sender: 'user',
      text: input,
      image: photo || undefined,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentInput = input; // Store input and photo before clearing
    const currentPhoto = photo;
    setInput('');
    setPhoto(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input visually
    }
    setIsLoading(true);

    try {
        // Prepare input for the Genkit flow
        const flowInput: AskDoubtInput = {
            subject: selectedSubject,
            doubtText: currentInput || undefined, // Pass undefined if empty
            imageDataUri: currentPhoto || undefined, // Pass undefined if null
        };

        // Call the Genkit flow
        const aiResponse: AskDoubtOutput = await askDoubt(flowInput);

        const aiMessage: ChatMessage = {
          id: Date.now().toString() + '-ai',
          sender: 'ai',
          text: aiResponse.explanation,
          // image: aiResponse.diagramUrl // Handle potential diagram later
        };

       setMessages(prevMessages => [...prevMessages, aiMessage]);

    } catch (error) {
        console.error("Error getting AI response:", error);
        toast({
            variant: 'destructive',
            title: 'AI Error',
            description: 'Sorry, I encountered an error processing your doubt. Please try again.',
        });
        // Optionally add an error message to the chat
        setMessages(prevMessages => [...prevMessages, {
            id: Date.now().toString() + '-error',
            sender: 'ai',
            text: "Apologies, I couldn't process that request right now. Please check the console for details."
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic validation (optional: add size limit, more types)
    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload an image file (e.g., PNG, JPG).',
      });
      return;
    }
     // Size limit (e.g., 4MB) - Gemini limit
     const maxSizeInBytes = 4 * 1024 * 1024;
     if (file.size > maxSizeInBytes) {
       toast({
         variant: 'destructive',
         title: 'Image Too Large',
         description: `Please upload an image smaller than ${maxSizeInBytes / 1024 / 1024}MB.`,
       });
       if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input on error
       return;
     }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.onerror = () => {
        console.error("Error reading file");
        toast({ variant: 'destructive', title: 'File Read Error', description: 'Could not read the selected image.' });
    }
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Ask Doubt</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl flex flex-col h-[calc(100vh-200px)] shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg text-foreground font-semibold">Clear Your Doubts with AI</CardTitle>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px] bg-background dark:bg-input rounded-lg">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 pt-0">
              {/* Chat Message Area */}
              <ScrollArea ref={chatContainerRef} className="flex-1 mb-4 pr-4 -mr-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex items-end space-x-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                         {message.sender === 'ai' && (
                           <Avatar className="w-8 h-8 border">
                             <AvatarImage src="/placeholder-ai.jpg" alt="AI" data-ai-hint="robot ai"/> {/* Placeholder AI avatar */}
                             <AvatarFallback><Bot size={18}/></AvatarFallback>
                           </Avatar>
                         )}
                         <div className={cn("rounded-xl py-2 px-3 max-w-[70%] md:max-w-[60%] break-words shadow-sm whitespace-pre-wrap", // Added whitespace-pre-wrap
                            message.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                           {message.text && <p>{message.text}</p>}
                           {message.image && (
                             <img
                               src={message.image}
                               alt="Uploaded content"
                               className="mt-2 rounded-md max-h-48 w-auto object-contain cursor-pointer"
                               onClick={() => window.open(message.image, '_blank')} // Open image in new tab on click
                             />
                           )}
                         </div>
                         {message.sender === 'user' && (
                             <Avatar className="w-8 h-8 border">
                                 <AvatarImage src="/placeholder-user.jpg" alt="User" data-ai-hint="person user"/> {/* Placeholder User avatar */}
                                 <AvatarFallback><User size={18}/></AvatarFallback>
                             </Avatar>
                         )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-end space-x-2 justify-start">
                         <Avatar className="w-8 h-8 border">
                           <AvatarImage src="/placeholder-ai.jpg" alt="AI" data-ai-hint="robot ai"/>
                           <AvatarFallback><Bot size={18}/></AvatarFallback>
                         </Avatar>
                        <div className="rounded-xl py-2 px-3 bg-secondary text-secondary-foreground shadow-sm inline-flex items-center">
                          Thinking... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="flex items-center space-x-2 border-t pt-4">
                 {/* Hidden file input */}
                 <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*" // Accept only images
                    className="hidden"
                 />
                 {/* Image Upload Button */}
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={triggerImageUpload}
                    className="hover:scale-110 active:scale-95"
                    aria-label="Upload Image"
                    disabled={isLoading}
                 >
                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                 </Button>
                 {/* Text Input */}
                <Textarea
                  placeholder="Type your doubt here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !isLoading) { // Prevent send while loading
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 rounded-lg border-input bg-background min-h-[40px] max-h-[120px] resize-none" // Added max-height
                  rows={1} // Start with 1 row
                  disabled={isLoading}
                />
                {/* Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={isLoading || (!input.trim() && !photo) || !selectedSubject}
                  className="hover:scale-110 active:scale-95"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                  Send
                </Button>
              </div>
              {/* Image Preview */}
              {photo && (
                  <div className="mt-2 p-2 border rounded-md bg-muted/30 relative w-fit">
                      <img
                        src={photo}
                        alt="Preview"
                        className="max-h-24 rounded object-contain" // Increased max-h slightly
                       />
                       <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setPhoto(null);
                                if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input on remove
                            }}
                            className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground rounded-full p-1 h-6 w-6 hover:bg-destructive/90 hover:scale-110"
                            aria-label="Remove image"
                            disabled={isLoading} // Disable remove while loading
                       >
                           <X className="w-3.5 h-3.5" />
                       </Button>
                  </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

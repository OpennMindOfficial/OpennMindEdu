
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
import { Send, ImagePlus, Loader2, Bot, User, X, Brain, FileQuestion } from "lucide-react"; // Added Brain icon, FileQuestion
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { askDoubt, type AskDoubtInput, type AskDoubtOutput } from '@/ai/flows/ask-doubt-flow'; // Import the Genkit flow
import { checkDoubt, type CheckDoubtInput, type CheckDoubtOutput } from '@/ai/flows/ask-doubt-check-job-flow'; // Corrected import path
import Image from 'next/image'; // Import next/image
import { motion, AnimatePresence } from 'framer-motion'; // Import motion

// Define message structure
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
  isStatusCheck?: boolean; // Flag to differentiate status check messages
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

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AskDoubtPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null); // Data URI of the image
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
  const [doubtIdToCheck, setDoubtIdToCheck] = useState(''); // State for doubt ID input
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

   // Add initial AI welcome message
   useEffect(() => {
     setMessages([
       {
         id: 'initial-ai-message',
         sender: 'ai',
         text: 'Hello! Select a subject and ask me anything. You can also upload an image related to your doubt or check the status of a previous doubt using its ID.',
       }
     ]);
   }, []);

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

    // Generate a temporary unique ID for the user message
    const tempDoubtId = `temp_${Date.now()}`;

    const userMessage: ChatMessage = {
      id: tempDoubtId, // Use temporary ID for user message
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

     // Add placeholder AI thinking message
     const thinkingMessage: ChatMessage = {
       id: Date.now().toString() + '-thinking',
       sender: 'ai',
       text: 'Thinking...',
     };
     setMessages(prevMessages => [...prevMessages, thinkingMessage]);


    try {
        // Prepare input for the Genkit flow
        const flowInput: AskDoubtInput = {
            subject: selectedSubject,
            doubtText: currentInput || undefined, // Pass undefined if empty
            imageDataUri: currentPhoto || undefined, // Pass undefined if null
        };

        // Call the Genkit flow
        const aiResponse: AskDoubtOutput = await askDoubt(flowInput);

        // Update the thinking message with the actual AI response
        setMessages(prevMessages => prevMessages.map(msg =>
            msg.id === thinkingMessage.id
            ? { ...msg, id: `ai_${Date.now()}`, text: aiResponse.explanation || "Sorry, I couldn't process that." }
            : msg
        ));

       // Simulating getting a real doubt ID from the backend after submission
       const assignedDoubtId = `doubt_${Math.floor(Math.random() * 1000)}`; // Replace with actual ID generation/retrieval

       // Add a message indicating the doubt ID
       const idMessage: ChatMessage = {
         id: Date.now().toString() + '-id',
         sender: 'ai',
         text: `Your Doubt ID is: ${assignedDoubtId}. You can use this ID to check the status later.`,
       };
       setMessages(prevMessages => [...prevMessages, idMessage]);


    } catch (error) {
        console.error("Error getting AI response:", error);
        // Update the thinking message with an error message
         setMessages(prevMessages => prevMessages.map(msg =>
             msg.id === thinkingMessage.id
             ? { ...msg, id: Date.now().toString() + '-error', text: "Apologies, I couldn't process that request right now. Please check the console for details." }
             : msg
         ));
        toast({
            variant: 'destructive',
            title: 'AI Error',
            description: 'Sorry, I encountered an error processing your doubt. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!doubtIdToCheck.trim()) {
      toast({
        variant: 'destructive',
        title: 'Doubt ID Required',
        description: 'Please enter the Doubt ID you want to check.',
      });
      return;
    }

    const userStatusCheckMessage: ChatMessage = {
        id: Date.now().toString() + '-user-check',
        sender: 'user',
        text: `Check status for Doubt ID: ${doubtIdToCheck}`,
        isStatusCheck: true, // Mark as status check
    };
    setMessages(prevMessages => [...prevMessages, userStatusCheckMessage]);

    setIsCheckingStatus(true); // Use a separate loading state for status check
    const currentDoubtId = doubtIdToCheck;
    setDoubtIdToCheck(''); // Clear the input field


    try {
        const input: CheckDoubtInput = { doubtId: currentDoubtId };
        const result: CheckDoubtOutput = await checkDoubt(input);

        const aiStatusMessage: ChatMessage = {
            id: Date.now().toString() + '-ai-status',
            sender: 'ai',
            text: result.response || 'Could not retrieve status.',
            isStatusCheck: true, // Mark as status check response
        };
        setMessages(prevMessages => [...prevMessages, aiStatusMessage]);

    } catch (error) {
        console.error("Error checking doubt status:", error);
        toast({
            variant: 'destructive',
            title: 'Status Check Error',
            description: 'Sorry, failed to check the status. Please try again.',
        });
        setMessages(prevMessages => [...prevMessages, {
            id: Date.now().toString() + '-error-status',
            sender: 'ai',
            text: `Failed to check status for ID: ${currentDoubtId}.`,
            isStatusCheck: true,
        }]);
    } finally {
        setIsCheckingStatus(false);
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
    <div className="flex h-screen bg-gradient-to-br from-background to-muted/30 dark:from-background dark:to-zinc-900/50 text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-transparent relative"> {/* Made main bg transparent and relative */}
           {/* Background Illustration */}
           <motion.div
             className="absolute inset-0 z-[-1] overflow-hidden opacity-20 dark:opacity-10 pointer-events-none"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
           >
              {/* Large faint brain illustration or abstract pattern */}
              <Brain className="absolute -right-20 -bottom-20 w-96 h-96 text-primary/30 transform rotate-12" strokeWidth={0.5}/>
              {/* Smaller abstract shapes */}
              <svg viewBox="0 0 200 200" className="absolute top-10 left-10 w-60 h-60 text-accent/20">
                <path d="M100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20Z" stroke="currentColor" strokeOpacity="0.1" strokeWidth="4" strokeDasharray="8 8"/>
                <circle cx="100" cy="100" r="30" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>
              </svg>
              <svg viewBox="0 0 100 100" className="absolute bottom-5 right-5 w-40 h-40 text-secondary/30 transform -rotate-45">
                <rect x="10" y="10" width="80" height="80" rx="15" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" fill="none" />
                <line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>
                <line x1="70" y1="30" x2="30" y2="70" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>
              </svg>
           </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             <Brain className="w-7 h-7 text-primary" />
             <h1 className="text-2xl md:text-3xl font-bold text-foreground">Ask Your Doubt</h1>
          </motion.div>

           {/* Doubt Status Check Section with animation */}
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
           >
             <Card className="bg-card/80 dark:bg-card/70 border border-border/20 backdrop-blur-lg rounded-xl shadow-lg p-4 mb-6">
               <div className="flex items-center gap-3 mb-2">
                  <FileQuestion className="w-5 h-5 text-accent" />
                 <h3 className="text-base font-semibold text-foreground">Check Doubt Status</h3>
               </div>
               <div className="flex items-center space-x-2">
                 <Input
                   type="text"
                   placeholder="Enter Doubt ID"
                   value={doubtIdToCheck}
                   onChange={(e) => setDoubtIdToCheck(e.target.value)}
                   className="flex-1 rounded-lg border-input bg-background/80 dark:bg-input/80 text-sm shadow-inner h-9"
                   disabled={isCheckingStatus}
                 />
                 <Button
                   onClick={handleCheckStatus}
                   disabled={isCheckingStatus || !doubtIdToCheck.trim()}
                   className="hover:scale-110 active:scale-95 h-9"
                   size="sm"
                 >
                   {isCheckingStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
                 </Button>
               </div>
             </Card>
           </motion.div>

          {/* Main Chat Card with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/80 dark:bg-card/70 border border-border/20 backdrop-blur-lg rounded-xl flex flex-col h-[calc(100vh-320px)] shadow-xl overflow-hidden"> {/* Adjusted height to account for status check card */}
              {/* Header with Subject Selector */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/20 px-4 py-3 bg-card/90 dark:bg-card/80 sticky top-0 z-10">
                <CardTitle className="text-base md:text-lg text-foreground font-semibold">AI Tutor Session</CardTitle>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-[180px] bg-background dark:bg-input rounded-lg shadow-sm text-sm h-9">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border shadow-lg rounded-lg">
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject} className="cursor-pointer focus:bg-muted">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>

              {/* Chat Message Area */}
              <CardContent className="flex-1 flex flex-col p-4 overflow-hidden"> {/* Removed pt-0 */}
                <ScrollArea ref={chatContainerRef} className="flex-1 mb-4 pr-4 -mr-4">
                  <AnimatePresence initial={false}>
                    <motion.div className="space-y-5"> {/* Increased spacing */}
                        {messages.map((message) => (
                           <motion.div
                              key={message.id}
                              variants={messageVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              layout // Added layout animation
                              className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                           >
                             {message.sender === 'ai' && (
                               <Avatar className="w-8 h-8 border border-border/30 shadow-sm">
                                 {/* Placeholder AI avatar */}
                                 <AvatarImage src="/placeholder-ai.jpg" alt="AI" data-ai-hint="robot ai brain"/>
                                 <AvatarFallback className="bg-primary/20 text-primary"><Bot size={16}/></AvatarFallback>
                               </Avatar>
                             )}
                             <div className={cn("rounded-xl py-2.5 px-4 max-w-[75%] md:max-w-[65%] break-words shadow-md",
                                message.sender === 'user'
                                    ? "bg-primary text-primary-foreground rounded-br-none" // User bubble style
                                    : "bg-secondary dark:bg-muted/70 text-secondary-foreground rounded-bl-none")}> {/* AI bubble style */}
                               {message.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>}
                               {message.image && (
                                 <div className="mt-2 rounded-lg overflow-hidden border border-border/20">
                                   <Image
                                     src={message.image}
                                     alt="Uploaded content"
                                     width={200} // Set explicit width
                                     height={150} // Set explicit height
                                     className="max-h-48 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
                                     onClick={() => window.open(message.image, '_blank')} // Open image in new tab on click
                                     unoptimized // If using base64 Data URI
                                   />
                                 </div>
                               )}
                             </div>
                             {message.sender === 'user' && (
                                 <Avatar className="w-8 h-8 border border-border/30 shadow-sm">
                                     {/* Placeholder User avatar */}
                                     <AvatarImage src="/placeholder-user.jpg" alt="User" data-ai-hint="person user"/>
                                     <AvatarFallback className="bg-muted text-muted-foreground"><User size={16}/></AvatarFallback>
                                 </Avatar>
                             )}
                           </motion.div>
                        ))}
                         {/* Loading indicator moved inside scroll area */}
                        {isLoading && messages[messages.length - 1]?.text === 'Thinking...' && (
                            <motion.div
                              key="thinking-indicator"
                              variants={messageVariants}
                              initial="hidden"
                              animate="visible"
                              layout
                              className="flex items-start gap-3 justify-start"
                            >
                             <Avatar className="w-8 h-8 border border-border/30 shadow-sm">
                               <AvatarImage src="/placeholder-ai.jpg" alt="AI" data-ai-hint="robot ai brain"/>
                               <AvatarFallback className="bg-primary/20 text-primary"><Bot size={16}/></AvatarFallback>
                             </Avatar>
                            <div className="rounded-xl py-2.5 px-4 bg-secondary dark:bg-muted/70 text-secondary-foreground rounded-bl-none shadow-md inline-flex items-center">
                              <span className="text-sm italic">Thinking...</span>
                              <Loader2 className="ml-2 h-4 w-4 animate-spin text-primary" />
                            </div>
                          </motion.div>
                        )}
                    </motion.div>
                  </AnimatePresence>
                </ScrollArea>

                {/* Input Area */}
                <div className="flex items-end space-x-2 border-t border-border/20 pt-4 bg-card/90 dark:bg-card/80 px-4 pb-3 -mx-4 -mb-4 sticky bottom-0 z-10">
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
                      className="hover:scale-110 active:scale-95 text-muted-foreground hover:text-primary"
                      aria-label="Upload Image"
                      disabled={isLoading || !!photo || isCheckingStatus} // Disable if photo already selected, loading or checking status
                   >
                      <ImagePlus className="h-5 w-5" />
                   </Button>
                   {/* Text Input */}
                  <Textarea
                    placeholder="Type your doubt here, or upload an image..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && !isLoading && !isCheckingStatus) { // Prevent send while loading or checking status
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    className="flex-1 rounded-lg border-input bg-background/80 dark:bg-input/80 min-h-[40px] max-h-[120px] resize-none text-sm shadow-inner" // Added shadow-inner
                    rows={1} // Start with 1 row
                    disabled={isLoading || isCheckingStatus} // Disable during both loading states
                  />
                  {/* Send Button */}
                  <Button
                    size="icon" // Changed to icon button
                    onClick={handleSend}
                    disabled={isLoading || isCheckingStatus || (!input.trim() && !photo) || !selectedSubject}
                    className="hover:scale-110 active:scale-95 w-9 h-9 rounded-lg" // Made it square-ish
                    aria-label="Send message"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
                {/* Image Preview */}
                <AnimatePresence>
                {photo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 10 }}
                      className="mt-2 p-1.5 border border-border/30 rounded-lg bg-muted/50 relative w-fit self-start ml-12 shadow-sm" // Aligned with input
                    >
                        <Image
                          src={photo}
                          alt="Preview"
                          width={80} // Explicit width
                          height={60} // Explicit height
                          className="max-h-20 rounded object-contain" // Adjusted max-h
                          unoptimized // If using base64 Data URI
                         />
                         <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                  setPhoto(null);
                                  if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input on remove
                              }}
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 h-5 w-5 hover:bg-destructive/90 hover:scale-110"
                              aria-label="Remove image"
                              disabled={isLoading || isCheckingStatus} // Disable remove while loading or checking status
                         >
                             <X className="w-3 h-3" />
                         </Button>
                    </motion.div>
                )}
                </AnimatePresence>
              </CardContent> {/* Closing CardContent */}
            </Card> {/* Closing Card */}
          </motion.div>

        </main> {/* Closing main */}
      </div> {/* Closing content wrapper div */}
    </div> // Closing main wrapper div
  ); // Closing return
} // Closing function


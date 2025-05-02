
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"; // Keep Input if needed within editor
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Keep Avatar if needed
import {
  Hash,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Link as LinkIcon,
  Trash2,
  Lightbulb,
  ExternalLink,
  Plus,
  Image as ImageIcon,
  Video,
  Code,
  AudioWaveform,
  Palette,
  TextQuote,
  MoreHorizontal,
  Search,
  ArrowLeft,
  Settings,
  Inbox,
  Folder,
  Grid3X3,
  Home,
  BarChart,
  Bot,
  Calendar,
  Clock,
  List,
  Type,
  ChevronDown,
  GripVertical,
  Wand2,
  ScrollText,
  ListChecks,
  ListOrdered,
  SpellCheck,
  Sparkles,
  Scissors,
  Filter,
  FileText,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverAnchor, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/layout/sidebar'; // Import standard Sidebar
import { Header } from '@/components/layout/header'; // Import standard Header

// Demo note data structure (expanded slightly) - Consider moving this to a data source or state management
interface Note {
  id: string;
  title: string;
  contentPreview: string; // Keep preview for potential future use, though full content is loaded
  lastEdited: string;
  createdAt?: string;
  url?: string;
  type?: string;
}

const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'The Remarkable Story...',
    contentPreview: 'Jeff Bezos is a business...',
    lastEdited: 'Today, 15:28',
    createdAt: '01/15/2024 11:31:04 AM',
    url: 'https://opennmind.com/notes/remarkable-story',
    type: 'Document',
  },
  { id: '2', title: 'Another Note', contentPreview: 'This is the preview...', lastEdited: 'Yesterday, 10:00' },
  { id: '3', title: 'Ideas for Project X', contentPreview: 'Need to research...', lastEdited: 'July 28, 09:15' },
];

// Define slash command options
const slashCommands = [
  { name: 'Heading 1', icon: Hash, level: 1 },
  { name: 'Heading 2', icon: Hash, level: 2 },
  { name: 'Bulleted List', icon: () => <ul className="list-disc pl-1 text-xs"><li></li></ul> },
  { name: 'Numbered List', icon: () => <ol className="list-decimal pl-1 text-xs"><li></li></ol> },
  { name: 'Image', icon: ImageIcon },
  { name: 'Video', icon: Video },
  { name: 'Code Block', icon: Code },
  { name: 'Audio', icon: AudioWaveform },
  { name: 'Highlight Block', icon: Highlighter },
  { name: 'Quote', icon: TextQuote },
  { name: 'Color Card', icon: Palette },
];

// Define AI action options
const aiActions = [
    { name: 'Summarize', icon: ScrollText, action: () => console.log('AI Action: Summarize') },
    { name: 'Action Points', icon: ListChecks, action: () => console.log('AI Action: Action Points') },
    { name: 'Main Points', icon: ListOrdered, action: () => console.log('AI Action: Main Points') },
    { name: 'Fix Grammar', icon: SpellCheck, action: () => console.log('AI Action: Fix Grammar') },
    { name: 'Improve Writing', icon: Sparkles, action: () => console.log('AI Action: Improve Writing') },
    { name: 'Make Shorter', icon: Scissors, action: () => console.log('AI Action: Make Shorter') },
    { name: 'Simplify', icon: Filter, action: () => console.log('AI Action: Simplify') },
    { name: 'Write Essay', icon: FileText, action: () => console.log('AI Action: Write Essay') },
];

export default function EditNotePage() {
  // State for current note ID - needs to be managed differently now, perhaps via URL param or context
  const [currentNoteId, setCurrentNoteId] = React.useState<string | null>('1'); // Example: load note 1 by default
  const [noteTitle, setNoteTitle] = React.useState("Untitled");
  const [noteContent, setNoteContent] = React.useState("");

  const [slashPopoverOpen, setSlashPopoverOpen] = React.useState(false);
  const [aiPopoverOpen, setAiPopoverOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);
  const [isTextSelected, setIsTextSelected] = React.useState(false);
  const slashTriggeredRef = React.useRef(false);
  const selectionRef = React.useRef<{ start: number, end: number } | null>(null);
  const popoverAnchorRef = React.useRef<HTMLDivElement>(null);
  const formattingToolbarRef = React.useRef<HTMLDivElement>(null);

  // TODO: Replace useEffect with logic to get note ID from URL params or global state
  React.useEffect(() => {
    // This part needs to adapt based on how the note ID is passed to the page
    const selected = sampleNotes.find(n => n.id === currentNoteId);
    if (selected) {
      setNoteTitle(selected.title || "Untitled");
      const fullContent = selected.id === '1'
       ? `Jeff Bezos is a business magnate and the founder, CEO, and president of Amazon, the world's largest online retailer. Born on January 12, 1964, in Albuquerque, New Mexico, Bezos had a varied career before starting Amazon. He graduated from Princeton University with a degree in electrical engineering and computer science. Bezos worked on Wall Street for several years before leaving to found Amazon. In the early days of the company, Bezos ran Amazon out of his garage and focused on selling books online.

As the company grew, Bezos expanded Amazon's product offerings to include a wide range of items, including electronics, clothing, and home goods. Under Bezos' leadership.

- Jeff Bezos was born on January 12, 1964, in Albuquerque, New Mexico.
- Bezos had a varied career before starting Amazon in 1994.
- Amazon started out as an online bookstore, but Bezos quickly expanded the company's product offerings to include a wide range of items.
- Bezos is known for his focus on customer obsession and long-term thinking.
- Bezos Family Foundation has donated millions of dollars to charitable causes through the`
       : selected.contentPreview + "\n\n(Full content would load here...)";
      setNoteContent(fullContent);
      setTimeout(() => adjustTextareaHeight(contentRef.current), 0);
    } else {
      setNoteTitle("Untitled"); // Or "New Note"
      setNoteContent("");
      setTimeout(() => adjustTextareaHeight(contentRef.current), 0);
    }
    setIsTextSelected(false);
    setSlashPopoverOpen(false);
    slashTriggeredRef.current = false;
    selectionRef.current = null;
  }, [currentNoteId]);


  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    const value = textarea.value;
    const cursorPos = textarea.selectionStart;
    const charJustTyped = value.substring(cursorPos - 1, cursorPos);
    const charBeforeSlash = value.substring(cursorPos - 2, cursorPos - 1);

    setNoteContent(value);
    adjustTextareaHeight(textarea);

    const shouldOpenPopover =
        charJustTyped === '/' &&
        (cursorPos === 1 || [' ', '\n', ''].includes(charBeforeSlash) || charBeforeSlash.match(/\W/) );

    if (shouldOpenPopover) {
        slashTriggeredRef.current = true;
        selectionRef.current = { start: cursorPos - 1, end: cursorPos };
        calculateAndSetPopoverPosition(textarea, cursorPos - 1);
        setSlashPopoverOpen(true);
        setIsTextSelected(false);
    } else if (slashPopoverOpen && slashTriggeredRef.current) {
        const textAroundCursor = value.substring(selectionRef.current?.start ?? 0, cursorPos);
        if (!textAroundCursor.startsWith('/')) {
            setSlashPopoverOpen(false);
            slashTriggeredRef.current = false;
        } else {
            calculateAndSetPopoverPosition(textarea, selectionRef.current?.start ?? 0);
        }
    } else if (charJustTyped !== '/') {
        const currentSelection = textarea.selectionStart === textarea.selectionEnd ? { start: textarea.selectionStart, end: textarea.selectionEnd } : null;
        if (slashPopoverOpen && (!selectionRef.current || (currentSelection && currentSelection.start <= selectionRef.current.start))) {
             setSlashPopoverOpen(false);
             slashTriggeredRef.current = false;
        }
    }
  };

  React.useEffect(() => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const resizeObserver = new ResizeObserver(() => {
      adjustTextareaHeight(textarea);
    });
    resizeObserver.observe(textarea);
    adjustTextareaHeight(textarea);
    return () => resizeObserver.disconnect();
  }, [noteContent]);

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSelectSlashCommand = (commandName: string) => {
    if (contentRef.current && selectionRef.current && slashTriggeredRef.current) {
      const textarea = contentRef.current;
      const { start: slashIndex } = selectionRef.current;
      const currentContent = noteContent;
      const textAfterSlash = currentContent.substring(slashIndex + 1).split(/(\s|\n)/)[0];
      const replaceEndIndex = slashIndex + 1 + textAfterSlash.length;
      const newContent =
        currentContent.substring(0, slashIndex) +
        `[${commandName}] ` +
        currentContent.substring(replaceEndIndex);

      setNoteContent(newContent);
      setTimeout(() => {
        const newCursorPos = slashIndex + `[${commandName}] `.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        adjustTextareaHeight(textarea);
      }, 0);
    }
    setSlashPopoverOpen(false);
    slashTriggeredRef.current = false;
    selectionRef.current = null;
  };

   const handleAiAction = (actionFunc: () => void) => {
        actionFunc();
        setAiPopoverOpen(false);
   };

  const handleInsertImage = () => {
     console.log("Insert Image");
     insertPlaceholder("[Image: Add URL or upload]");
     setIsTextSelected(false);
   };

   const handleInsertVideo = () => {
     console.log("Insert Video");
     insertPlaceholder("[Video: Add URL]");
     setIsTextSelected(false);
   };

   const insertPlaceholder = (text: string) => {
       if (!contentRef.current) return;
       const textarea = contentRef.current;
       const start = textarea.selectionStart;
       const end = textarea.selectionEnd;
       const currentContent = noteContent;
       const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
       setNoteContent(newContent);
       setTimeout(() => {
         const newCursorPos = start + text.length;
         textarea.focus();
         textarea.setSelectionRange(newCursorPos, newCursorPos);
         adjustTextareaHeight(textarea);
         selectionRef.current = { start: newCursorPos, end: newCursorPos };
         setIsTextSelected(false);
       }, 0);
   }

  const handleSelectionChange = () => {
       requestAnimationFrame(() => {
           if (contentRef.current && document.activeElement === contentRef.current) {
               const textarea = contentRef.current;
               const start = textarea.selectionStart;
               const end = textarea.selectionEnd;
               const hasSelection = start !== end;

               if (hasSelection) {
                   if (!slashPopoverOpen) {
                       selectionRef.current = { start, end };
                       calculateAndSetToolbarPosition(textarea, start);
                       setIsTextSelected(true);
                   } else {
                       setIsTextSelected(false);
                   }
               } else {
                    setIsTextSelected(false);
                    if (!slashPopoverOpen || !slashTriggeredRef.current) {
                        selectionRef.current = null;
                    }
               }
           } else {
                const activeEl = document.activeElement;
                const isFocusInsideToolbar = formattingToolbarRef.current?.contains(activeEl);
                const isFocusInsideSlashPopover = document.querySelector('[data-radix-popover-content][data-popover-type="slash"]')?.contains(activeEl);
                 const isFocusInsideAiPopover = document.querySelector('[data-radix-popover-content][data-popover-type="ai"]')?.contains(activeEl);

                if (!isFocusInsideToolbar) setIsTextSelected(false);
                if (!isFocusInsideSlashPopover && slashPopoverOpen) {
                    setSlashPopoverOpen(false);
                    slashTriggeredRef.current = false;
                 }
                 if (!isFocusInsideAiPopover && aiPopoverOpen) setAiPopoverOpen(false);
                if (!slashPopoverOpen && !aiPopoverOpen && !isFocusInsideToolbar) {
                     selectionRef.current = null;
                 }
           }
       });
   };

   const calculateAndSetPopoverPosition = (textarea: HTMLTextAreaElement, position: number) => {
        const measureDiv = document.createElement('div');
        measureDiv.style.position = 'absolute';
        measureDiv.style.visibility = 'hidden';
        measureDiv.style.whiteSpace = 'pre-wrap';
        measureDiv.style.wordWrap = 'break-word';
        measureDiv.style.overflowWrap = 'break-word';
        measureDiv.style.padding = window.getComputedStyle(textarea).padding;
        measureDiv.style.border = window.getComputedStyle(textarea).border;
        measureDiv.style.font = window.getComputedStyle(textarea).font;
        measureDiv.style.width = `${textarea.clientWidth}px`;
        measureDiv.style.boxSizing = 'border-box';

        const textBefore = textarea.value.substring(0, position);
        const textAfter = textarea.value.substring(position);
        measureDiv.textContent = textBefore;
        const cursorSpan = document.createElement('span');
        cursorSpan.textContent = '|';
        measureDiv.appendChild(cursorSpan);
        measureDiv.appendChild(document.createTextNode(textAfter));
        document.body.appendChild(measureDiv);

        const cursorRect = cursorSpan.getBoundingClientRect();
        const textareaRect = textarea.getBoundingClientRect();

        const top = cursorRect.top - textareaRect.top + textarea.scrollTop;
        const left = cursorRect.left - textareaRect.left + textarea.scrollLeft + 5;

        document.body.removeChild(measureDiv);

        if (popoverAnchorRef.current) {
            popoverAnchorRef.current.style.position = 'absolute';
            popoverAnchorRef.current.style.top = `${top}px`;
            popoverAnchorRef.current.style.left = `${left}px`;
            popoverAnchorRef.current.style.width = '1px';
            popoverAnchorRef.current.style.height = '1px';
        }
   };

   const calculateAndSetToolbarPosition = (textarea: HTMLTextAreaElement, position: number) => {
        const measureDiv = document.createElement('div');
        measureDiv.style.position = 'absolute';
        measureDiv.style.visibility = 'hidden';
        measureDiv.style.whiteSpace = 'pre-wrap';
        measureDiv.style.wordWrap = 'break-word';
        measureDiv.style.overflowWrap = 'break-word';
        measureDiv.style.padding = window.getComputedStyle(textarea).padding;
        measureDiv.style.border = window.getComputedStyle(textarea).border;
        measureDiv.style.font = window.getComputedStyle(textarea).font;
        measureDiv.style.width = `${textarea.clientWidth}px`;
        measureDiv.style.boxSizing = 'border-box';

        const textBefore = textarea.value.substring(0, position);
        const selectionSpan = document.createElement('span');
        selectionSpan.textContent = '|';
        measureDiv.textContent = textBefore;
        measureDiv.appendChild(selectionSpan);
        measureDiv.appendChild(document.createTextNode(textarea.value.substring(position)));
        document.body.appendChild(measureDiv);

        const spanRect = selectionSpan.getBoundingClientRect();
        const textareaRect = textarea.getBoundingClientRect();
        const top = spanRect.top - textareaRect.top + textarea.scrollTop - 45;
        const left = spanRect.left - textareaRect.left + textarea.scrollLeft + textarea.clientWidth / 2;

        document.body.removeChild(measureDiv);

        if (formattingToolbarRef.current) {
            formattingToolbarRef.current.style.position = 'absolute';
            formattingToolbarRef.current.style.top = `${Math.max(textarea.offsetTop, top)}px`;
            formattingToolbarRef.current.style.left = `${left}px`;
            formattingToolbarRef.current.style.transform = 'translateX(-50%)';
            formattingToolbarRef.current.style.zIndex = '50';
        }
   };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setTimeout(() => {
          const activeEl = document.activeElement;
          const isFocusInsideToolbar = formattingToolbarRef.current?.contains(activeEl);
           const isFocusInsideSlashPopover = document.querySelector('[data-radix-popover-content][data-popover-type="slash"]')?.contains(activeEl);
           const isFocusInsideAiPopover = document.querySelector('[data-radix-popover-content][data-popover-type="ai"]')?.contains(activeEl);

          if (!isFocusInsideToolbar) {
              setIsTextSelected(false);
          }
          if (!isFocusInsideSlashPopover && slashPopoverOpen) {
                setSlashPopoverOpen(false);
                slashTriggeredRef.current = false;
          }
           if (!isFocusInsideAiPopover && aiPopoverOpen) {
               setAiPopoverOpen(false);
           }
          if (!isFocusInsideToolbar && !isFocusInsideSlashPopover && !isFocusInsideAiPopover) {
               selectionRef.current = null;
           }
      }, 150);
  };

   React.useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
            if (slashPopoverOpen) {
             setSlashPopoverOpen(false);
             slashTriggeredRef.current = false;
             selectionRef.current = null;
             event.preventDefault();
            } else if (aiPopoverOpen) {
              setAiPopoverOpen(false);
              event.preventDefault();
            } else if (isTextSelected) {
                setIsTextSelected(false);
                selectionRef.current = null;
                if (contentRef.current) contentRef.current.blur();
                event.preventDefault();
            }
       }
     };
     document.addEventListener('keydown', handleKeyDown);
     return () => document.removeEventListener('keydown', handleKeyDown);
   }, [slashPopoverOpen, aiPopoverOpen, isTextSelected]);

  React.useEffect(() => {
    adjustTextareaHeight(contentRef.current);
  }, []);

  const currentNoteData = currentNoteId ? sampleNotes.find(n => n.id === currentNoteId) : null;
  const wikipediaLink = "https://en.wikipedia.org/wiki/Jeff_Bezos"; // Example link

  return (
    // Use standard layout
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        {/* Main Content Area - Adjusted for standard layout */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 relative bg-background">
           <div className="max-w-3xl mx-auto">
               {/* Back Button */}
               <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-4 px-0 h-auto">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back to notes {/* Or dynamic based on context */}
               </Button>

              {/* Title Textarea */}
              <Textarea
                placeholder="Untitled"
                value={noteTitle}
                onChange={(e) => {
                    setNoteTitle(e.target.value);
                    adjustTextareaHeight(e.target);
                }}
                onInput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
                className="text-3xl md:text-4xl font-bold border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent overflow-hidden h-auto leading-tight focus:outline-none mb-6 w-full block"
                rows={1}
                style={{ height: 'auto' }}
              />

              {/* Metadata and AI Trigger */}
              <div className="flex justify-between items-start mb-8">
                 <div className="space-y-2 text-sm text-foreground">
                    {/* Metadata items */}
                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-3 text-muted-foreground"/><span className="w-20 text-muted-foreground">Created</span><span>{currentNoteData?.createdAt || '-'}</span></div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-3 text-muted-foreground"/><span className="w-20 text-muted-foreground">Updated</span><span>{currentNoteData?.lastEdited || '-'}</span></div>
                    <div className="flex items-center"><LinkIcon className="w-4 h-4 mr-3 text-muted-foreground"/><span className="w-20 text-muted-foreground">URL</span>{currentNoteData?.url ? <a href={currentNoteData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate dark:text-blue-400">{currentNoteData.url}</a> : <span>-</span>}</div>
                    <div className="flex items-center"><List className="w-4 h-4 mr-3 text-muted-foreground"/><span className="w-20 text-muted-foreground">Name</span><span>{noteTitle || 'Untitled'}</span></div>
                    <div className="flex items-center"><Type className="w-4 h-4 mr-3 text-muted-foreground"/><span className="w-20 text-muted-foreground">Type</span><span>{currentNoteData?.type || 'Note'}</span></div>
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground px-0 h-auto -ml-1"><Plus className="w-4 h-4 mr-1.5"/> Add property</Button>
                 </div>

                  {/* AI Action Popover Trigger */}
                   <Popover open={aiPopoverOpen} onOpenChange={setAiPopoverOpen}>
                        <PopoverTrigger asChild>
                             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10">
                                 <Wand2 className="w-5 h-5" />
                                 <span className="sr-only">AI Actions</span>
                             </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-56 p-1 bg-background dark:bg-zinc-800 border border-border shadow-lg rounded-lg"
                            side="left"
                            align="start"
                            sideOffset={10}
                            data-popover-type="ai"
                        >
                            <div className="flex flex-col space-y-0.5">
                                {aiActions.map((action) => (
                                    <Button
                                        key={action.name}
                                        variant="ghost"
                                        className="w-full justify-start h-8 px-2 text-sm font-normal hover:bg-muted dark:hover:bg-muted/50"
                                        onClick={() => handleAiAction(action.action)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <action.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                                        <span>{action.name}</span>
                                    </Button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
              </div>

              <Separator className="mb-8" />

              {/* Floating Formatting Toolbar */}
               <div
                    ref={formattingToolbarRef}
                    style={{
                         opacity: isTextSelected ? 1 : 0,
                         pointerEvents: isTextSelected ? 'auto' : 'none',
                    }}
                    className={cn(
                         "absolute z-50 bg-background/80 dark:bg-zinc-800/80 backdrop-blur-sm py-1 px-1 rounded-md border border-border/30 shadow-lg transition-opacity duration-200",
                    )}>
                    <div className="flex items-center gap-0.5 p-0 rounded-md w-min">
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Bold className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Italic className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Underline className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Strikethrough className="w-4 h-4" /></Button>
                       <Separator orientation="vertical" className="h-5 mx-1" />
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Highlighter className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><LinkIcon className="w-4 h-4" /></Button>
                       <Separator orientation="vertical" className="h-5 mx-1" />
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95" onClick={handleInsertImage} title="Insert Image">
                         <ImageIcon className="w-4 h-4" />
                         <span className="sr-only">Insert Image</span>
                       </Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95" onClick={handleInsertVideo} title="Insert Video">
                         <Video className="w-4 h-4" />
                         <span className="sr-only">Insert Video</span>
                       </Button>
                    </div>
                 </div>

               {/* Main Content Textarea with Slash Command Popover */}
                <div className="relative w-full">
                 <div ref={popoverAnchorRef} className="absolute w-0 h-0"/>
                 <Popover open={slashPopoverOpen} onOpenChange={setSlashPopoverOpen}>
                    <PopoverAnchor asChild>
                        <div/>
                    </PopoverAnchor>
                    <Textarea
                      ref={contentRef}
                      placeholder="Start writing your note... Type '/' for commands."
                      value={noteContent}
                      onChange={handleContentChange}
                      onSelect={handleSelectionChange}
                      onBlur={handleBlur}
                      onClick={(e) => {
                         if (slashPopoverOpen && slashTriggeredRef.current && e.target === contentRef.current) {
                             const cursorPos = contentRef.current?.selectionStart ?? 0;
                             if(selectionRef.current && cursorPos > selectionRef.current.start && contentRef.current?.value.substring(selectionRef.current.start, cursorPos).startsWith('/')){
                                // Clicked within command, keep open
                             } else {
                                setSlashPopoverOpen(false);
                                slashTriggeredRef.current = false;
                             }
                         }
                      }}
                       className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent w-full leading-relaxed focus:outline-none min-h-[300px] block"
                       style={{ height: 'auto' }}
                    />
                   <PopoverContent
                        className="w-60 p-1 bg-background dark:bg-zinc-800 border border-border shadow-lg rounded-lg"
                        side="bottom"
                        align="start"
                        sideOffset={10}
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onInteractOutside={(e) => {
                             if (e.target !== contentRef.current) {
                                setSlashPopoverOpen(false);
                                slashTriggeredRef.current = false;
                            }
                        }}
                         data-popover-type="slash"
                         style={{ zIndex: 60 }}
                   >
                     <div className="text-xs text-muted-foreground px-2 py-1">Blocks</div>
                     <div className="flex flex-col space-y-0.5">
                       {slashCommands.map((cmd) => (
                         <Button
                           key={cmd.name}
                           variant="ghost"
                           className="w-full justify-start h-8 px-2 text-sm font-normal hover:bg-muted dark:hover:bg-muted/50"
                           onClick={() => handleSelectSlashCommand(cmd.name)}
                            onMouseDown={(e) => e.preventDefault()}
                         >
                            {typeof cmd.icon === 'function' ? (
                              React.createElement(cmd.icon, { className: "w-4 h-4 mr-2 text-muted-foreground" })
                            ) : (
                              <cmd.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                            )}
                           <span>{cmd.name}</span>
                         </Button>
                       ))}
                     </div>
                   </PopoverContent>
                 </Popover>
               </div>

              {/* Example Rendered Blocks */}
              {noteContent.includes("[Highlight Block]") && (
                  <div className="bg-yellow-100/50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg my-4 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
                      This is a highlighted block placeholder.
                    </p>
                  </div>
               )}

              {currentNoteId === '1' && (
                  <div className="mt-8">
                     <a href={wikipediaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-2">
                       <ExternalLink className="w-4 h-4" /> Check Wikipedia source
                     </a>
                  </div>
               )}
            </div> {/* End max-w-3xl */}
        </main>
      </div>
    </div>
  );
}

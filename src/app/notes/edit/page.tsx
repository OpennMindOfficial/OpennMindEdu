
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  GripVertical, // For drag handle in sidebar header (optional)
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

// Demo note data structure (expanded slightly)
interface Note {
  id: string;
  title: string;
  contentPreview: string;
  lastEdited: string;
  createdAt?: string; // Add createdAt
  url?: string;
  type?: string;
}

const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'The Remarkable Story...',
    contentPreview: 'Jeff Bezos is a business...',
    lastEdited: 'Today, 15:28',
    createdAt: '01/15/2024 11:31:04 AM', // Example data
    url: 'https://opennmind.com/notes/remarkable-story', // Example data
    type: 'Document', // Example data
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

export default function EditNotePage() {
  const [currentNoteId, setCurrentNoteId] = React.useState<string | null>('1');
  const [noteTitle, setNoteTitle] = React.useState("Untitled"); // Default to Untitled
  const [noteContent, setNoteContent] = React.useState(""); // Start empty for new notes

  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);
  const [isTextSelected, setIsTextSelected] = React.useState(false);
  const slashTriggeredRef = React.useRef(false);
  const selectionRef = React.useRef<{ start: number, end: number } | null>(null);
  const popoverAnchorRef = React.useRef<HTMLDivElement>(null); // Ref for explicit anchor positioning
  const formattingToolbarRef = React.useRef<HTMLDivElement>(null); // Ref for toolbar positioning

  // Load note data when currentNoteId changes
  React.useEffect(() => {
    const selected = sampleNotes.find(n => n.id === currentNoteId);
    if (selected) {
      setNoteTitle(selected.title || "Untitled");
      // Simulate loading full content - replace preview with actual content
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
      // Adjust height after content loads
       setTimeout(() => adjustTextareaHeight(contentRef.current), 0);
    } else {
      // Handle case where note ID is null (new note)
      setNoteTitle("Untitled");
      setNoteContent("");
      setTimeout(() => adjustTextareaHeight(contentRef.current), 0);
    }
    // Reset interaction states
    setIsTextSelected(false);
    setPopoverOpen(false);
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

    const shouldOpenPopover =
        charJustTyped === '/' &&
        (cursorPos === 1 || [' ', '\n', ''].includes(charBeforeSlash) || charBeforeSlash.match(/\W/) ); // Open after space, newline, start, or non-word char

    if (shouldOpenPopover) {
        slashTriggeredRef.current = true;
        selectionRef.current = { start: cursorPos - 1, end: cursorPos }; // Store slash position
        calculateAndSetPopoverPosition(textarea, cursorPos - 1); // Calculate position based on slash
        setPopoverOpen(true);
        setIsTextSelected(false);
    } else if (popoverOpen && slashTriggeredRef.current) {
        const textAroundCursor = value.substring(selectionRef.current?.start ?? 0, cursorPos);
        if (!textAroundCursor.endsWith('/')) { // Close if slash is deleted or moved away from
            setPopoverOpen(false);
            slashTriggeredRef.current = false;
        } else {
             // Keep it open if still at the slash, update position if needed
             calculateAndSetPopoverPosition(textarea, selectionRef.current?.start ?? 0);
        }
    }

    adjustTextareaHeight(textarea);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 200)}px`; // Ensure min height
    }
  };

  const handleSelectCommand = (commandName: string) => {
    if (contentRef.current && selectionRef.current && slashTriggeredRef.current) {
      const textarea = contentRef.current;
      const { start: slashIndex } = selectionRef.current;
      const currentContent = noteContent;

      if (currentContent.substring(slashIndex, slashIndex + 1) === '/') {
        const newContent =
          currentContent.substring(0, slashIndex) +
          `[${commandName}] ` +
          currentContent.substring(slashIndex + 1);

        setNoteContent(newContent);

        setTimeout(() => {
          const newCursorPos = slashIndex + `[${commandName}] `.length;
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
          adjustTextareaHeight(textarea);
        }, 0);
      }
    }
    setPopoverOpen(false);
    slashTriggeredRef.current = false;
    selectionRef.current = null;
  };

  const handleInsertImage = () => {
     console.log("Insert Image");
     // Placeholder: Insert markdown or placeholder text
     insertPlaceholder("[Image: Add URL or upload]");
     setIsTextSelected(false);
   };

   const handleInsertVideo = () => {
     console.log("Insert Video");
     insertPlaceholder("[Video: Add URL]");
     setIsTextSelected(false);
   };

   // Helper to insert placeholder text at selection/cursor
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
         selectionRef.current = null; // Clear selection after action
       }, 0);
   }

  const handleCreateNewNote = () => {
    // Generate a temporary new ID or handle state differently
    const newId = `new-${Date.now()}`;
    // Add a placeholder to sampleNotes or manage state separately
    // sampleNotes.push({ id: newId, title: 'Untitled', contentPreview: '', lastEdited: 'Now' });
    setCurrentNoteId(null); // Or set to newId if managing state directly
    // State reset happens in useEffect based on currentNoteId
  };

  const handleSelectNote = (noteId: string) => {
    setCurrentNoteId(noteId);
    // Data loading and state reset happens in useEffect
  };

   const handleSelectionChange = () => {
       requestAnimationFrame(() => {
           if (contentRef.current && document.activeElement === contentRef.current) {
               const start = contentRef.current.selectionStart;
               const end = contentRef.current.selectionEnd;
               const hasSelection = start !== end;

               if (hasSelection) {
                    selectionRef.current = { start, end };
                    calculateAndSetToolbarPosition(contentRef.current, start);
                    setIsTextSelected(true);
                    // Close slash popover if selection happens while it's open
                    if (popoverOpen && slashTriggeredRef.current) {
                        setPopoverOpen(false);
                        slashTriggeredRef.current = false;
                    }
               } else {
                   setIsTextSelected(false);
                   // Clear selectionRef only if slash popover isn't the active reason
                   if (!popoverOpen || !slashTriggeredRef.current) {
                       selectionRef.current = null;
                   }
               }
           } else {
                // If textarea loses focus, hide the toolbar unless focus moved TO the toolbar
                const activeEl = document.activeElement;
                if (!formattingToolbarRef.current?.contains(activeEl)) {
                    setIsTextSelected(false);
                    // Don't clear selection ref if popover is open
                    if (!popoverOpen) {
                         selectionRef.current = null;
                     }
                }
           }
       });
   };

   // Calculate and set Popover position based on cursor/slash
   const calculateAndSetPopoverPosition = (textarea: HTMLTextAreaElement, position: number) => {
     const textBeforeCursor = textarea.value.substring(0, position);
     const lines = textBeforeCursor.split('\n');
     const currentLine = lines[lines.length - 1];
     const lineIndex = lines.length - 1;

     // Estimate position - THIS IS COMPLEX AND OFTEN REQUIRES A DEDICATED LIBRARY
     // Basic approximation:
     const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight) || 24;
     const charWidth = 8; // Very rough estimate
     const top = textarea.offsetTop + lineIndex * lineHeight;
     const left = textarea.offsetLeft + currentLine.length * charWidth + textarea.scrollLeft;

     if (popoverAnchorRef.current) {
       popoverAnchorRef.current.style.top = `${top}px`;
       popoverAnchorRef.current.style.left = `${left}px`;
     }
   };

   // Calculate and set Toolbar position based on selection start
   const calculateAndSetToolbarPosition = (textarea: HTMLTextAreaElement, position: number) => {
        const textBeforeSelection = textarea.value.substring(0, position);
        const lines = textBeforeSelection.split('\n');
        const lineIndex = lines.length - 1;

        const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight) || 24;
        const top = textarea.offsetTop + lineIndex * lineHeight - 40; // Position above the line
        const left = textarea.offsetLeft + textarea.scrollLeft + 20; // Indent slightly

        if (formattingToolbarRef.current) {
            formattingToolbarRef.current.style.position = 'absolute';
            formattingToolbarRef.current.style.top = `${top}px`;
            formattingToolbarRef.current.style.left = `${left}px`;
        }
   };


  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      const relatedTarget = event.relatedTarget as Node | null;
      const popoverContent = document.querySelector('[data-radix-popover-content]');
      // const formattingToolbar = document.querySelector('.formatting-toolbar');
      const formattingToolbar = formattingToolbarRef.current; // Use ref

       // Delay hiding popover/toolbar to allow clicks inside them
      setTimeout(() => {
          const activeEl = document.activeElement;
          if (popoverOpen && !popoverContent?.contains(activeEl)) {
                setPopoverOpen(false);
                slashTriggeredRef.current = false;
          }
          if (isTextSelected && !formattingToolbar?.contains(activeEl)) {
               setIsTextSelected(false);
               selectionRef.current = null;
          }
      }, 150);
  };

   React.useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
            if (popoverOpen) {
             setPopoverOpen(false);
             slashTriggeredRef.current = false;
             selectionRef.current = null;
             event.preventDefault(); // Prevent other escape actions
            }
            if (isTextSelected) {
                setIsTextSelected(false);
                selectionRef.current = null;
                if (contentRef.current) contentRef.current.blur();
                event.preventDefault();
            }
       }
     };
     document.addEventListener('keydown', handleKeyDown);
     return () => document.removeEventListener('keydown', handleKeyDown);
   }, [popoverOpen, isTextSelected]);


  // Effect to adjust initial height
  React.useEffect(() => {
    adjustTextareaHeight(contentRef.current);
  }, []);

  const currentNoteData = currentNoteId ? sampleNotes.find(n => n.id === currentNoteId) : null;
  // const breadcrumb = currentNoteId ? `# Personal / ${currentNoteData?.title.substring(0, 20)}...` : "# Personal / New Note";
  // const author = "Nathalia Anderson";
  // const timestamp = currentNoteData?.lastEdited || `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const wikipediaLink = "https://en.wikipedia.org/wiki/Jeff_Bezos"; // Keep for demo link

  // --- New Layout Structure ---
  return (
    <div className="flex h-screen bg-muted/40 dark:bg-background text-foreground overflow-hidden font-sans">

      {/* Left Sidebar (Collections, Apps, etc.) */}
      <aside className="w-64 bg-background dark:bg-zinc-900/50 border-r border-border flex flex-col shrink-0 h-full">
        {/* Sidebar Header */}
        <div className="h-14 px-3 border-b border-border flex items-center justify-between shrink-0">
           <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" alt="Acme Inc" />
                <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">Acme</span>
           </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <GripVertical className="w-4 h-4" /> {/* Or ChevronUpDownIcon */}
            </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
            {/* Main Navigation */}
            <nav className="space-y-0.5">
                <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm font-normal"> <Inbox className="w-4 h-4 mr-2"/> Inbox</Button>
                <Button variant="secondary" className="w-full justify-start h-8 px-2 text-sm font-normal"> <Folder className="w-4 h-4 mr-2"/> Collections</Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm font-normal"> <Grid3X3 className="w-4 h-4 mr-2"/> Integrations</Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm font-normal"> <Settings className="w-4 h-4 mr-2"/> Settings</Button>
            </nav>

            {/* Apps Section */}
             <div>
                <div className="px-2 mb-1 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Apps</h3>
                   <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                     <Plus className="w-4 h-4" />
                   </Button>
                </div>
                 <nav className="space-y-0.5">
                    <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm font-normal"> <BarChart className="w-4 h-4 mr-2"/> Marketing</Button>
                    <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm font-normal"> <Home className="w-4 h-4 mr-2"/> My First App</Button>
                    <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm font-normal"> <Type className="w-4 h-4 mr-2"/> Sales</Button>
                    <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm font-normal"> <Bot className="w-4 h-4 mr-2"/> Slack Bot</Button>
                 </nav>
             </div>

              {/* Notes List (similar to previous implementation) */}
              <div>
                  <div className="px-2 mb-1 mt-4 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">My Notes</h3>
                     <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={handleCreateNewNote}>
                       <Plus className="w-4 h-4" />
                       <span className="sr-only">Create New Note</span>
                     </Button>
                  </div>
                   <div className="space-y-1 max-h-48 overflow-y-auto pr-1"> {/* Limit height and scroll */}
                     {sampleNotes.map((note) => (
                       <div
                         key={note.id}
                         onClick={() => handleSelectNote(note.id)}
                         className={cn(
                           "p-2 rounded-md cursor-pointer hover:bg-muted dark:hover:bg-muted/50 group",
                           currentNoteId === note.id && "bg-muted dark:bg-muted/50"
                         )}
                       >
                         <h4 className="text-sm font-medium truncate group-hover:text-foreground">{note.title || "Untitled Note"}</h4>
                         <p className="text-xs text-muted-foreground truncate mt-0.5">{note.contentPreview || "No content yet..."}</p>
                         <p className="text-[10px] text-muted-foreground/70 mt-1">{note.lastEdited}</p>
                       </div>
                     ))}
                     {sampleNotes.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          No notes yet. Click '+' to create one.
                        </div>
                     )}
                   </div>
              </div>


        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 bg-background dark:bg-zinc-900 overflow-hidden">
        {/* Top Bar (Tabs, Search, User) */}
        <header className="h-14 px-4 border-b border-border flex items-center justify-between shrink-0 bg-background dark:bg-zinc-900">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Grid3X3 className="w-4 h-4"/></Button>
                <Button variant="secondary" size="sm" className="h-8 px-3 rounded-md"> <Hash className="w-4 h-4 mr-2"/> Tab</Button>
                <Button variant="ghost" size="sm" className="h-8 px-3 rounded-md"> <Hash className="w-4 h-4 mr-2"/> Tab</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Plus className="w-4 h-4"/></Button>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="pl-9 h-8 bg-muted dark:bg-zinc-800 rounded-md text-sm"/>
                </div>
                <Button variant="default" size="sm" className="h-8">Save</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Folder className="w-4 h-4"/></Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4"/></Button>
                 <Avatar className="h-7 w-7">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                 </Avatar>
            </div>
        </header>

        {/* Editor Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 relative bg-white dark:bg-zinc-900/70">
           <div className="max-w-3xl mx-auto"> {/* Center content */}
              {/* Back Button */}
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-4 px-0 h-auto">
                 <ArrowLeft className="w-4 h-4 mr-1.5" />
                 Back to collection
              </Button>

              {/* Title Input */}
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

              {/* Metadata Section */}
              <div className="space-y-2 mb-8 text-sm text-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-muted-foreground"/>
                  <span className="w-20 text-muted-foreground">Created</span>
                  <span>{currentNoteData?.createdAt || '-'}</span>
                </div>
                 <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-3 text-muted-foreground"/>
                  <span className="w-20 text-muted-foreground">Updated</span>
                  <span>{currentNoteData?.lastEdited || '-'}</span>
                 </div>
                 <div className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-3 text-muted-foreground"/>
                  <span className="w-20 text-muted-foreground">URL</span>
                  {currentNoteData?.url ? (
                    <a href={currentNoteData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate dark:text-blue-400">
                       {currentNoteData.url}
                     </a>
                  ) : (
                     <span>-</span>
                  )}
                 </div>
                 <div className="flex items-center">
                  <List className="w-4 h-4 mr-3 text-muted-foreground"/>
                  <span className="w-20 text-muted-foreground">Name</span>
                  <span>{noteTitle || 'Untitled'}</span>
                 </div>
                 <div className="flex items-center">
                  <Type className="w-4 h-4 mr-3 text-muted-foreground"/>
                  <span className="w-20 text-muted-foreground">Type</span>
                  <span>{currentNoteData?.type || 'Note'}</span>
                 </div>
                 <Button variant="ghost" className="text-muted-foreground hover:text-foreground px-0 h-auto -ml-1">
                   <Plus className="w-4 h-4 mr-1.5"/> Add property
                 </Button>
              </div>

              <Separator className="mb-8" />


              {/* Floating Formatting Toolbar */}
              <div
                ref={formattingToolbarRef}
                style={{ opacity: isTextSelected ? 1 : 0, pointerEvents: isTextSelected ? 'auto' : 'none' }}
                className={cn(
                  "absolute z-50 bg-background/80 dark:bg-zinc-800/80 backdrop-blur-sm py-1 px-1 rounded-md border border-border/30 shadow-lg transition-opacity duration-200",
                  // Position is calculated in JS
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

              {/* Main Content Textarea with Popover */}
               <div className="relative w-full">
                 <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    {/* Explicit PopoverAnchor, positioned by JS */}
                    <PopoverAnchor ref={popoverAnchorRef} className="absolute w-0 h-0"/>
                    <Textarea
                      ref={contentRef}
                      placeholder="Start writing your note... Type '/' for commands."
                      value={noteContent}
                      onChange={handleContentChange}
                      onSelect={handleSelectionChange}
                      onBlur={handleBlur}
                      onClick={() => {
                          if (popoverOpen && slashTriggeredRef.current) {
                              setPopoverOpen(false);
                              slashTriggeredRef.current = false;
                              selectionRef.current = null;
                          }
                      }}
                      className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent w-full leading-relaxed focus:outline-none overflow-hidden min-h-[300px]" // Adjusted min-height
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
                              setPopoverOpen(false);
                              slashTriggeredRef.current = false;
                              // Maybe keep selectionRef if focus moves to toolbar?
                          }
                      }}
                      // Ensure popover is above content
                      style={{ zIndex: 60 }}
                   >
                     <div className="text-xs text-muted-foreground px-2 py-1">Blocks</div>
                     <div className="flex flex-col space-y-0.5">
                       {slashCommands.map((cmd) => (
                         <Button
                           key={cmd.name}
                           variant="ghost"
                           className="w-full justify-start h-8 px-2 text-sm font-normal hover:bg-muted dark:hover:bg-muted/50"
                           onClick={() => handleSelectCommand(cmd.name)}
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
              {/* Add more rendered block examples if needed */}

              {/* Wikipedia Link (if applicable) */}
              {currentNoteId === '1' && (
                  <div className="mt-8">
                     <a
                       href={wikipediaLink}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-2"
                     >
                       <ExternalLink className="w-4 h-4" />
                       Check Wikipedia source
                     </a>
                  </div>
               )}
            </div> {/* End max-w-3xl */}
        </main>
      </div>
    </div>
  );
}

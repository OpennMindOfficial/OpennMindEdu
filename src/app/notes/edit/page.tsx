
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
  Wand2, // Icon for AI actions trigger
  ScrollText, // Summarize
  ListChecks, // Action Points
  ListOrdered, // Main Points
  SpellCheck, // Fix Grammar
  Sparkles, // Improve Writing
  Scissors, // Make Shorter
  Filter, // Simplify (using Filter as an alternative)
  FileText, // Write Essay
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverAnchor, PopoverTrigger } from "@/components/ui/popover"; // Adjusted import
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
  const [currentNoteId, setCurrentNoteId] = React.useState<string | null>('1');
  const [noteTitle, setNoteTitle] = React.useState("Untitled"); // Default to Untitled
  const [noteContent, setNoteContent] = React.useState(""); // Start empty for new notes

  const [slashPopoverOpen, setSlashPopoverOpen] = React.useState(false);
  const [aiPopoverOpen, setAiPopoverOpen] = React.useState(false); // State for AI popover
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
    adjustTextareaHeight(textarea); // Adjust height on every change

    const shouldOpenPopover =
        charJustTyped === '/' &&
        (cursorPos === 1 || [' ', '\n', ''].includes(charBeforeSlash) || charBeforeSlash.match(/\W/) ); // Open after space, newline, start, or non-word char

    if (shouldOpenPopover) {
        slashTriggeredRef.current = true;
        selectionRef.current = { start: cursorPos - 1, end: cursorPos }; // Store slash position
        calculateAndSetPopoverPosition(textarea, cursorPos - 1); // Calculate position based on slash
        setSlashPopoverOpen(true);
        setIsTextSelected(false); // Close formatting toolbar if slash is typed
    } else if (slashPopoverOpen && slashTriggeredRef.current) {
        // Check if the slash command trigger is still valid
        const textAroundCursor = value.substring(selectionRef.current?.start ?? 0, cursorPos);
        if (!textAroundCursor.startsWith('/')) { // Close if slash is deleted or changed
            setSlashPopoverOpen(false);
            slashTriggeredRef.current = false;
        } else {
            // Keep it open and update position if needed (e.g., due to scrolling)
            calculateAndSetPopoverPosition(textarea, selectionRef.current?.start ?? 0);
        }
    } else if (charJustTyped !== '/') {
        // Close popover if user types something else or moves cursor away without selecting a command
        const currentSelection = textarea.selectionStart === textarea.selectionEnd ? { start: textarea.selectionStart, end: textarea.selectionEnd } : null;
        if (slashPopoverOpen && (!selectionRef.current || (currentSelection && currentSelection.start <= selectionRef.current.start))) {
             setSlashPopoverOpen(false);
             slashTriggeredRef.current = false;
        }
    }
  };

  // Use ResizeObserver to adjust height dynamically
  React.useEffect(() => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const resizeObserver = new ResizeObserver(() => {
      adjustTextareaHeight(textarea);
    });

    resizeObserver.observe(textarea);

    // Initial adjust
    adjustTextareaHeight(textarea);

    return () => resizeObserver.disconnect();
  }, [noteContent]); // Re-observe if content changes significantly causing reflow

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      // Use scrollHeight for content height, ensure min-height via CSS
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSelectSlashCommand = (commandName: string) => {
    if (contentRef.current && selectionRef.current && slashTriggeredRef.current) {
      const textarea = contentRef.current;
      const { start: slashIndex } = selectionRef.current;
      const currentContent = noteContent;
      const textAfterSlash = currentContent.substring(slashIndex + 1).split(/(\s|\n)/)[0]; // Get command text after slash

      // Replace the slash and the command text (if any)
      const replaceEndIndex = slashIndex + 1 + textAfterSlash.length;
      const newContent =
        currentContent.substring(0, slashIndex) +
        `[${commandName}] ` + // Simulate inserting the block
        currentContent.substring(replaceEndIndex);

      setNoteContent(newContent);

      // Set cursor after the inserted command placeholder
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
        actionFunc(); // Execute the placeholder function
        setAiPopoverOpen(false); // Close the AI popover
        // In a real app, you'd likely pass the selected text or entire note content
        // to the AI function here.
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

   // Helper to insert placeholder text at selection/cursor
   const insertPlaceholder = (text: string) => {
       if (!contentRef.current) return;
       const textarea = contentRef.current;
       const start = textarea.selectionStart;
       const end = textarea.selectionEnd;
       const currentContent = noteContent;
       const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
       setNoteContent(newContent);

       // Move cursor after inserted text
       setTimeout(() => {
         const newCursorPos = start + text.length;
         textarea.focus();
         textarea.setSelectionRange(newCursorPos, newCursorPos);
         adjustTextareaHeight(textarea);
         selectionRef.current = { start: newCursorPos, end: newCursorPos }; // Update selection ref to cursor pos
         setIsTextSelected(false); // Hide formatting toolbar
       }, 0);
   }

  const handleCreateNewNote = () => {
    const newId = `new-${Date.now()}`;
    // sampleNotes.unshift({ id: newId, title: 'Untitled', contentPreview: '', lastEdited: 'Now' });
    setCurrentNoteId(null);
  };

  const handleSelectNote = (noteId: string) => {
    setCurrentNoteId(noteId);
  };

   const handleSelectionChange = () => {
       // Use requestAnimationFrame to ensure selection state is updated
       requestAnimationFrame(() => {
           if (contentRef.current && document.activeElement === contentRef.current) {
               const textarea = contentRef.current;
               const start = textarea.selectionStart;
               const end = textarea.selectionEnd;
               const hasSelection = start !== end;

               if (hasSelection) {
                   // Only show formatting toolbar if slash popover is NOT open
                   if (!slashPopoverOpen) {
                       selectionRef.current = { start, end };
                       calculateAndSetToolbarPosition(textarea, start); // Calculate based on selection start
                       setIsTextSelected(true);
                   } else {
                       // If slash popover is open, prioritize it and hide formatting
                       setIsTextSelected(false);
                   }
               } else {
                    // No selection, hide toolbar
                    setIsTextSelected(false);
                    // Clear selectionRef only if slash popover isn't active
                    if (!slashPopoverOpen || !slashTriggeredRef.current) {
                        selectionRef.current = null;
                    }
               }
           } else {
                // If textarea loses focus, check if focus moved to the toolbar or popovers
                const activeEl = document.activeElement;
                const isFocusInsideToolbar = formattingToolbarRef.current?.contains(activeEl);
                const isFocusInsideSlashPopover = document.querySelector('[data-radix-popover-content][data-popover-type="slash"]')?.contains(activeEl);
                 const isFocusInsideAiPopover = document.querySelector('[data-radix-popover-content][data-popover-type="ai"]')?.contains(activeEl);


                if (!isFocusInsideToolbar) setIsTextSelected(false);
                if (!isFocusInsideSlashPopover && slashPopoverOpen) setSlashPopoverOpen(false);
                 if (!isFocusInsideAiPopover && aiPopoverOpen) setAiPopoverOpen(false);

                // Don't clear selection ref if a popover is the reason for blur
                if (!slashPopoverOpen && !aiPopoverOpen && !isFocusInsideToolbar) {
                     selectionRef.current = null;
                 }
           }
       });
   };

   // Calculate and set Popover position based on cursor/slash
   const calculateAndSetPopoverPosition = (textarea: HTMLTextAreaElement, position: number) => {
        // --- Advanced Position Calculation ---
        // Create a temporary hidden div to measure text position
        const measureDiv = document.createElement('div');
        measureDiv.style.position = 'absolute';
        measureDiv.style.visibility = 'hidden';
        measureDiv.style.whiteSpace = 'pre-wrap'; // Match textarea wrapping
        measureDiv.style.wordWrap = 'break-word'; // Match textarea wrapping
        measureDiv.style.overflowWrap = 'break-word';
        measureDiv.style.padding = window.getComputedStyle(textarea).padding;
        measureDiv.style.border = window.getComputedStyle(textarea).border;
        measureDiv.style.font = window.getComputedStyle(textarea).font;
        measureDiv.style.width = `${textarea.clientWidth}px`; // Match width
        measureDiv.style.boxSizing = 'border-box';

        const textBefore = textarea.value.substring(0, position);
        const textAfter = textarea.value.substring(position);

        measureDiv.textContent = textBefore;

        // Span to mark the exact cursor position
        const cursorSpan = document.createElement('span');
        cursorSpan.textContent = '|'; // Or use a zero-width space if needed
        measureDiv.appendChild(cursorSpan);
        measureDiv.appendChild(document.createTextNode(textAfter)); // Add remaining text for accurate height


        document.body.appendChild(measureDiv);

        // Calculate position relative to textarea
        const cursorRect = cursorSpan.getBoundingClientRect();
        const textareaRect = textarea.getBoundingClientRect();

        const top = cursorRect.top - textareaRect.top + textarea.scrollTop;
        // Use clientLeft for border width offset if needed
        const left = cursorRect.left - textareaRect.left + textarea.scrollLeft + 5; // Slight offset to the right

        document.body.removeChild(measureDiv);
        // --- End Advanced Calculation ---


        if (popoverAnchorRef.current) {
            popoverAnchorRef.current.style.position = 'absolute'; // Crucial for positioning
            // Position the anchor near the calculated cursor position
            // The popover will then position itself relative to this anchor
            popoverAnchorRef.current.style.top = `${top}px`;
            popoverAnchorRef.current.style.left = `${left}px`;
            popoverAnchorRef.current.style.width = '1px'; // Give it minimal size
            popoverAnchorRef.current.style.height = '1px';
        }
   };


    // Calculate and set Toolbar position based on selection start
   const calculateAndSetToolbarPosition = (textarea: HTMLTextAreaElement, position: number) => {
       // Re-use the advanced calculation logic, but position toolbar above
        const measureDiv = document.createElement('div');
        // ... (same setup as calculateAndSetPopoverPosition) ...
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
        selectionSpan.textContent = '|'; // Placeholder for start of selection
        measureDiv.textContent = textBefore;
        measureDiv.appendChild(selectionSpan);
        measureDiv.appendChild(document.createTextNode(textarea.value.substring(position)));

        document.body.appendChild(measureDiv);

        const spanRect = selectionSpan.getBoundingClientRect();
        const textareaRect = textarea.getBoundingClientRect();

        const top = spanRect.top - textareaRect.top + textarea.scrollTop - 45; // Position slightly above the line
        const left = spanRect.left - textareaRect.left + textarea.scrollLeft + textarea.clientWidth / 2; // Center horizontally

        document.body.removeChild(measureDiv);

        if (formattingToolbarRef.current) {
            formattingToolbarRef.current.style.position = 'absolute'; // Needs to be absolute
            formattingToolbarRef.current.style.top = `${Math.max(textarea.offsetTop, top)}px`; // Don't go above textarea top
            formattingToolbarRef.current.style.left = `${left}px`;
            // Add transform to center it precisely if needed
            formattingToolbarRef.current.style.transform = 'translateX(-50%)';
            formattingToolbarRef.current.style.zIndex = '50'; // Ensure it's above content
        }
   };


  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      // Use setTimeout to allow clicks within popovers/toolbars before hiding them
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
           // If focus didn't move to toolbar or popovers, clear selectionRef
          if (!isFocusInsideToolbar && !isFocusInsideSlashPopover && !isFocusInsideAiPopover) {
               selectionRef.current = null;
           }

      }, 150); // Delay allows button clicks in popovers/toolbar
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
                if (contentRef.current) contentRef.current.blur(); // Optionally blur textarea
                event.preventDefault();
            }
       }
     };
     document.addEventListener('keydown', handleKeyDown);
     return () => document.removeEventListener('keydown', handleKeyDown);
   }, [slashPopoverOpen, aiPopoverOpen, isTextSelected]);


  // Effect to adjust initial height
  React.useEffect(() => {
    adjustTextareaHeight(contentRef.current);
  }, []);

  const currentNoteData = currentNoteId ? sampleNotes.find(n => n.id === currentNoteId) : null;
  const wikipediaLink = "https://en.wikipedia.org/wiki/Jeff_Bezos";

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
              <GripVertical className="w-4 h-4" />
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

              {/* Notes List */}
              <div>
                  <div className="px-2 mb-1 mt-4 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">My Notes</h3>
                     <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={handleCreateNewNote}>
                       <Plus className="w-4 h-4" />
                       <span className="sr-only">Create New Note</span>
                     </Button>
                  </div>
                   <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
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
           <div className="max-w-3xl mx-auto">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-4 px-0 h-auto">
                 <ArrowLeft className="w-4 h-4 mr-1.5" />
                 Back to collection
              </Button>

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
                style={{ height: 'auto' }} // Start with auto height
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
                            data-popover-type="ai" // Add identifier
                        >
                            <div className="flex flex-col space-y-0.5">
                                {aiActions.map((action) => (
                                    <Button
                                        key={action.name}
                                        variant="ghost"
                                        className="w-full justify-start h-8 px-2 text-sm font-normal hover:bg-muted dark:hover:bg-muted/50"
                                        onClick={() => handleAiAction(action.action)}
                                        onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
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
                         // Position is calculated by JS
                    }}
                    className={cn(
                         "absolute z-50 bg-background/80 dark:bg-zinc-800/80 backdrop-blur-sm py-1 px-1 rounded-md border border-border/30 shadow-lg transition-opacity duration-200",
                    )}>
                    <div className="flex items-center gap-0.5 p-0 rounded-md w-min">
                       {/* Standard Formatting Buttons */}
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Bold className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Italic className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Underline className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Strikethrough className="w-4 h-4" /></Button>
                       <Separator orientation="vertical" className="h-5 mx-1" />
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><Highlighter className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 active:scale-95"><LinkIcon className="w-4 h-4" /></Button>
                       <Separator orientation="vertical" className="h-5 mx-1" />
                       {/* Insert Media Buttons */}
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
                 {/* PopoverAnchor needs to be inside the relative container */}
                 <div ref={popoverAnchorRef} className="absolute w-0 h-0"/>
                 <Popover open={slashPopoverOpen} onOpenChange={setSlashPopoverOpen}>
                    <PopoverAnchor asChild>
                        {/* The anchor is now positioned by JS */}
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
                         // Prevent closing slash popover if click is on the trigger area
                         if (slashPopoverOpen && slashTriggeredRef.current && e.target === contentRef.current) {
                             const cursorPos = contentRef.current?.selectionStart ?? 0;
                             if(selectionRef.current && cursorPos > selectionRef.current.start && contentRef.current?.value.substring(selectionRef.current.start, cursorPos).startsWith('/')){
                                // Clicked within the slash command, keep it open
                             } else {
                                setSlashPopoverOpen(false);
                                slashTriggeredRef.current = false;
                             }
                         }
                      }}
                       className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent w-full leading-relaxed focus:outline-none min-h-[300px] block" // Use block, remove overflow-hidden for auto-height
                       style={{ height: 'auto' }} // Let height grow with content
                    />
                   <PopoverContent
                        className="w-60 p-1 bg-background dark:bg-zinc-800 border border-border shadow-lg rounded-lg"
                        side="bottom"
                        align="start"
                        sideOffset={10}
                        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent stealing focus
                        onInteractOutside={(e) => {
                            // Close only if interaction is outside textarea & popover itself
                             if (e.target !== contentRef.current) {
                                setSlashPopoverOpen(false);
                                slashTriggeredRef.current = false;
                            }
                        }}
                         data-popover-type="slash" // Add identifier
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
                            onMouseDown={(e) => e.preventDefault()} // Prevents blur before click registers
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

    
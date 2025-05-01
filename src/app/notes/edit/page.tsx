
'use client';

import * as React from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  Plus, // Icon for add note
  Image as ImageIcon,
  Video,
  Code,
  AudioWaveform,
  Palette,
  TextQuote,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
// Import Popover, PopoverContent, and PopoverAnchor
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

// Demo note data structure
interface Note {
  id: string;
  title: string;
  contentPreview: string;
  lastEdited: string;
}

const sampleNotes: Note[] = [
  { id: '1', title: 'The Remarkable Story...', contentPreview: 'Jeff Bezos is a business...', lastEdited: 'Today, 15:28' },
  { id: '2', title: 'Another Note', contentPreview: 'This is the preview...', lastEdited: 'Yesterday, 10:00' },
  { id: '3', title: 'Ideas for Project X', contentPreview: 'Need to research...', lastEdited: 'July 28, 09:15' },
];

// Define slash command options
const slashCommands = [
  { name: 'Heading 1', icon: Hash, level: 1 },
  { name: 'Heading 2', icon: Hash, level: 2 },
  { name: 'Bulleted List', icon: () => <ul className="list-disc pl-1 text-xs"><li></li></ul>, },
  { name: 'Numbered List', icon: () => <ol className="list-decimal pl-1 text-xs"><li></li></ol>, },
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
  const [noteTitle, setNoteTitle] = React.useState("The Remarkable Story of Jeff Bezos and Amazon");
  const [noteContent, setNoteContent] = React.useState(`Jeff Bezos is a business magnate and the founder, CEO, and president of Amazon, the world's largest online retailer. Born on January 12, 1964, in Albuquerque, New Mexico, Bezos had a varied career before starting Amazon. He graduated from Princeton University with a degree in electrical engineering and computer science. Bezos worked on Wall Street for several years before leaving to found Amazon. In the early days of the company, Bezos ran Amazon out of his garage and focused on selling books online.

As the company grew, Bezos expanded Amazon's product offerings to include a wide range of items, including electronics, clothing, and home goods. Under Bezos' leadership.

- Jeff Bezos was born on January 12, 1964, in Albuquerque, New Mexico.
- Bezos had a varied career before starting Amazon in 1994.
- Amazon started out as an online bookstore, but Bezos quickly expanded the company's product offerings to include a wide range of items.
- Bezos is known for his focus on customer obsession and long-term thinking.
- Bezos Family Foundation has donated millions of dollars to charitable causes through the`);

  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);
  const [isTextSelected, setIsTextSelected] = React.useState(false);
  const slashTriggeredRef = React.useRef(false); // Track if slash was the trigger

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    const value = textarea.value;
    const cursorPos = textarea.selectionStart;
    const charJustTyped = value.substring(cursorPos - 1, cursorPos);
    const charBeforeSlash = value.substring(cursorPos - 2, cursorPos - 1);

    setNoteContent(value);

    // Determine if the slash command popover should open
    const shouldOpenPopover =
        charJustTyped === '/' &&
        (cursorPos === 1 || charBeforeSlash === ' ' || charBeforeSlash === '\n' || charBeforeSlash === '');

    // Only open if triggered by slash
    if (shouldOpenPopover) {
        slashTriggeredRef.current = true; // Mark that slash triggered it
        setPopoverOpen(true);
    } else if (charJustTyped !== '/') {
        // Close if typing anything other than '/' or if the slash is deleted
        const textBeforeCursor = value.substring(0, cursorPos);
        if (!textBeforeCursor.endsWith('/')) {
            slashTriggeredRef.current = false;
            setPopoverOpen(false);
        }
    }

    // Auto-adjust textarea height
    adjustTextareaHeight(textarea);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  };

  const handleSelectCommand = (commandName: string) => {
    if (contentRef.current) {
      const textarea = contentRef.current;
      const cursorPos = textarea.selectionStart;
      const currentContent = noteContent;

      // Find the last '/' that triggered the popover
      const textBeforeCursor = currentContent.substring(0, cursorPos);
      const lastSlashIndex = textBeforeCursor.lastIndexOf('/');

      // Only replace if the popover was triggered by this slash
      if (slashTriggeredRef.current && lastSlashIndex === cursorPos - 1) {
        const newContent =
          currentContent.substring(0, lastSlashIndex) + // Text before the slash
          `[${commandName}] ` +                         // Insert command placeholder
          currentContent.substring(cursorPos);         // Text after the cursor

        setNoteContent(newContent);

        // Set cursor position after the inserted command and adjust height
        setTimeout(() => {
          const newCursorPos = lastSlashIndex + `[${commandName}] `.length;
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
          adjustTextareaHeight(textarea);
        }, 0);
      }
    }
    setPopoverOpen(false); // Close popover after selection
    slashTriggeredRef.current = false; // Reset trigger flag
  };

  const handleCreateNewNote = () => {
    setCurrentNoteId(null);
    setNoteTitle("");
    setNoteContent("");
    setIsTextSelected(false);
    setPopoverOpen(false);
    slashTriggeredRef.current = false;
    setTimeout(() => adjustTextareaHeight(contentRef.current), 0); // Adjust height for empty content
  };

  const handleSelectNote = (noteId: string) => {
    const selected = sampleNotes.find(n => n.id === noteId);
    if (selected) {
      setCurrentNoteId(selected.id);
      setNoteTitle(selected.title);
      setNoteContent(selected.contentPreview + "\n\n(Full content would load here...)");
      setIsTextSelected(false);
      setPopoverOpen(false);
      slashTriggeredRef.current = false;
      // Adjust height for new content after a short delay for rendering
      setTimeout(() => adjustTextareaHeight(contentRef.current), 0);
    }
  };

  // Handle selection change to show/hide formatting toolbar
  const handleSelectionChange = () => {
      requestAnimationFrame(() => { // Use rAF to ensure selection state is updated
          if (contentRef.current) {
              const start = contentRef.current.selectionStart;
              const end = contentRef.current.selectionEnd;
              const hasSelection = start !== end;
              setIsTextSelected(hasSelection);

              // Close popover if selection changes and it was open
              if (popoverOpen && !hasSelection) {
                 // Don't close if it was explicitly triggered by slash just now
                 if (!slashTriggeredRef.current || noteContent.substring(start - 1, start) !== '/') {
                     setPopoverOpen(false);
                     slashTriggeredRef.current = false;
                 }
              } else if (hasSelection && popoverOpen) {
                  // Close popover if text is selected while it's open
                  setPopoverOpen(false);
                  slashTriggeredRef.current = false;
              }

          } else {
              setIsTextSelected(false);
          }
      });
  };

  // Close popover on blur if not interacting with popover content itself
  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      // Check if the related target (where focus went) is inside the popover
      const relatedTarget = event.relatedTarget as Node | null;
      const popoverContent = document.querySelector('[data-radix-popover-content]');

      if (!popoverContent?.contains(relatedTarget)) {
          setTimeout(() => { // Delay to allow popover item click
             if (!document.activeElement || !popoverContent?.contains(document.activeElement)) {
                  setPopoverOpen(false);
                  slashTriggeredRef.current = false;
             }
          }, 100); // Reduced delay
      }

       // Also hide formatting toolbar on blur if not interacting with it
       const formattingToolbar = document.querySelector('.formatting-toolbar');
       if (!formattingToolbar?.contains(relatedTarget)) {
           setTimeout(() => {
               if (!document.activeElement || !formattingToolbar?.contains(document.activeElement)) {
                   setIsTextSelected(false);
               }
           }, 100);
       }
  };

   // Close popover on Escape key
   React.useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === 'Escape' && popoverOpen) {
         setPopoverOpen(false);
         slashTriggeredRef.current = false;
       }
     };
     document.addEventListener('keydown', handleKeyDown);
     return () => document.removeEventListener('keydown', handleKeyDown);
   }, [popoverOpen]);


  // Effect to adjust initial height and on note change
  React.useEffect(() => {
    adjustTextareaHeight(contentRef.current);
  }, [currentNoteId]); // Adjust height when note changes

  const currentNoteData = currentNoteId ? sampleNotes.find(n => n.id === currentNoteId) : null;
  const breadcrumb = currentNoteId ? `# Personal / ${currentNoteData?.title.substring(0, 20)}...` : "# Personal / New Note";
  const author = "Nathalia Anderson";
  const timestamp = currentNoteData?.lastEdited || `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const wikipediaLink = "https://en.wikipedia.org/wiki/Jeff_Bezos";

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      {/* Notes List Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col shrink-0 h-full">
        {/* ... (sidebar content remains the same) ... */}
         <div className="p-3 border-b flex items-center justify-between h-16">
           <h2 className="font-semibold text-sm">All Notes</h2>
           <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95" onClick={handleCreateNewNote}>
             <Plus className="w-4 h-4" />
             <span className="sr-only">Create New Note</span>
           </Button>
         </div>
         <div className="flex-1 overflow-y-auto p-2 space-y-1">
           {sampleNotes.map((note) => (
             <div
               key={note.id}
               onClick={() => handleSelectNote(note.id)}
               className={cn(
                 "p-2 rounded-md cursor-pointer hover:bg-muted dark:hover:bg-muted/50 group",
                 currentNoteId === note.id && "bg-muted dark:bg-muted/50"
               )}
             >
               <h3 className="text-sm font-medium truncate group-hover:text-foreground">{note.title || "Untitled Note"}</h3>
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
      </aside>

      {/* Main Content Area (Editor) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        {/* Make main scrollable, not the individual textareas */}
        <main className="flex-1 p-6 md:p-8 lg:p-12 space-y-6 bg-background relative overflow-y-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="w-4 h-4" />
              <span>{breadcrumb}</span>
              <span className="text-xs ml-2">{author}</span>
              <span className="text-xs text-muted-foreground/70">{timestamp}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:scale-110 active:scale-95">
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Delete Note</span>
            </Button>
          </div>

          <Separator />

          {/* Title - Auto-growing */}
          <Textarea
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => {
                setNoteTitle(e.target.value);
                adjustTextareaHeight(e.target); // Auto-adjust height
            }}
            onInput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)} // Adjust on input too
            className="text-3xl font-bold border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent overflow-hidden h-auto leading-tight focus:outline-none"
            rows={1}
            style={{ height: 'auto' }} // Start with auto height
          />

          {/* Floating Formatting Toolbar - Conditionally rendered */}
           <div className={cn(
               "sticky top-[60px] z-10 bg-background/80 backdrop-blur-sm py-2 -mx-2 px-2 mb-4 rounded-md transition-opacity duration-200",
               // Only show when text is selected
               isTextSelected ? "opacity-100" : "opacity-0 pointer-events-none"
           )}>
               <div className="flex items-center gap-1 p-1 rounded-md border bg-card w-min shadow-sm formatting-toolbar">
                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Bold className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Italic className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Underline className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Strikethrough className="w-4 h-4" /></Button>
                   <Separator orientation="vertical" className="h-6 mx-1" />
                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Highlighter className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><LinkIcon className="w-4 h-4" /></Button>
               </div>
           </div>

          {/* Main Content - Auto-growing with Popover */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
             {/* Use PopoverAnchor to provide positioning context without being the trigger */}
             <PopoverAnchor className="absolute" />
             <Textarea
               ref={contentRef}
               placeholder="Start writing your note... Type '/' for commands."
               value={noteContent}
               onChange={handleContentChange}
               onSelect={handleSelectionChange}
               onBlur={handleBlur}
               className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent w-full leading-relaxed focus:outline-none overflow-hidden min-h-[200px]" // Increased min-height
               style={{ height: 'auto' }} // Start with auto height
             />
            <PopoverContent
               className="w-60 p-1"
               // Position near cursor requires complex logic - basic positioning for now
               side="bottom" // Position below the anchor (usually near cursor line)
               align="start" // Align start edge with anchor
               sideOffset={5}
               onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus shift
               // Close popover if user clicks outside of it
               onInteractOutside={(e) => {
                   // Only close if the target isn't the textarea itself
                   if (e.target !== contentRef.current) {
                       setPopoverOpen(false);
                       slashTriggeredRef.current = false;
                   }
               }}
            >
              <div className="text-xs text-muted-foreground px-2 py-1">Blocks</div>
              <div className="flex flex-col space-y-0.5">
                {slashCommands.map((cmd) => (
                  <Button
                    key={cmd.name}
                    variant="ghost"
                    className="w-full justify-start h-8 px-2 text-sm hover:scale-100 active:scale-100"
                    onClick={() => handleSelectCommand(cmd.name)}
                    // Add mouse down handler to prevent textarea blur closing popover prematurely
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


          {/* Example Rendered Blocks (Needs proper parsing) */}
          {noteContent.includes("[Highlight Block]") && (
              <div className="bg-yellow-100/50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg my-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
                  This is a highlighted block placeholder.
                </p>
              </div>
           )}

           {noteContent.includes("[Bulleted List]") && (
              <ul className="list-disc space-y-2 pl-6 my-4">
                <li className="text-base text-foreground/90 leading-relaxed">List item placeholder 1</li>
                <li className="text-base text-foreground/90 leading-relaxed">List item placeholder 2</li>
              </ul>
           )}

          {currentNoteId === '1' && (
              <div className="mt-6">
                 <a
                   href={wikipediaLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-2 hover:scale-110 active:scale-95"
                 >
                   <ExternalLink className="w-4 h-4" />
                   Check Wikipedia source
                 </a>
              </div>
           )}
        </main>
      </div>
    </div>
  );
}

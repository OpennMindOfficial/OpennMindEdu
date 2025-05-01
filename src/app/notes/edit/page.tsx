
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
  Image as ImageIcon, // Added
  Video, // Added
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
  const selectionRef = React.useRef<{ start: number, end: number } | null>(null); // Store selection range for toolbar

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
        (cursorPos === 1 || [' ', '\n', ''].includes(charBeforeSlash)); // Simplified check

    // Only open if triggered by slash
    if (shouldOpenPopover) {
        slashTriggeredRef.current = true; // Mark that slash triggered it
        selectionRef.current = { start: cursorPos -1, end: cursorPos }; // Anchor popover position
        setPopoverOpen(true);
        setIsTextSelected(false); // Hide formatting toolbar when slash menu opens
    } else if (popoverOpen && slashTriggeredRef.current) {
        // Close if typing anything other than '/' or if the slash is deleted/moved away from
        const textAroundCursor = value.substring(cursorPos - 1, cursorPos);
        if (!textAroundCursor.endsWith('/')) {
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
    if (contentRef.current && selectionRef.current) {
      const textarea = contentRef.current;
      const { start: slashIndex } = selectionRef.current; // Use stored slash index
      const currentContent = noteContent;

      // Only replace if the popover was triggered by this slash
      if (slashTriggeredRef.current && currentContent.substring(slashIndex, slashIndex + 1) === '/') {
        const newContent =
          currentContent.substring(0, slashIndex) + // Text before the slash
          `[${commandName}] ` +                         // Insert command placeholder
          currentContent.substring(slashIndex + 1);     // Text after the slash

        setNoteContent(newContent);

        // Set cursor position after the inserted command and adjust height
        setTimeout(() => {
          const newCursorPos = slashIndex + `[${commandName}] `.length;
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
          adjustTextareaHeight(textarea);
        }, 0);
      }
    }
    setPopoverOpen(false); // Close popover after selection
    slashTriggeredRef.current = false; // Reset trigger flag
    selectionRef.current = null; // Clear selection ref
  };

   // Placeholder function for inserting image
   const handleInsertImage = () => {
     console.log("Insert Image clicked");
     // TODO: Implement image upload/insertion logic
     if (contentRef.current && selectionRef.current) {
       const textarea = contentRef.current;
       const { start, end } = selectionRef.current;
       const newContent =
         noteContent.substring(0, start) +
         "[Image Placeholder]" +
         noteContent.substring(end);
       setNoteContent(newContent);
       // Optionally move cursor
       setTimeout(() => {
           const newCursorPos = start + "[Image Placeholder]".length;
           textarea.focus();
           textarea.setSelectionRange(newCursorPos, newCursorPos);
           adjustTextareaHeight(textarea);
           setIsTextSelected(false); // Hide toolbar after action
           selectionRef.current = null;
       }, 0);
     }
   };

   // Placeholder function for inserting video
   const handleInsertVideo = () => {
     console.log("Insert Video clicked");
     // TODO: Implement video upload/insertion logic
     if (contentRef.current && selectionRef.current) {
       const textarea = contentRef.current;
       const { start, end } = selectionRef.current;
       const newContent =
         noteContent.substring(0, start) +
         "[Video Placeholder]" +
         noteContent.substring(end);
       setNoteContent(newContent);
       setTimeout(() => {
         const newCursorPos = start + "[Video Placeholder]".length;
         textarea.focus();
         textarea.setSelectionRange(newCursorPos, newCursorPos);
         adjustTextareaHeight(textarea);
         setIsTextSelected(false); // Hide toolbar after action
         selectionRef.current = null;
       }, 0);
     }
   };


  const handleCreateNewNote = () => {
    setCurrentNoteId(null);
    setNoteTitle("");
    setNoteContent("");
    setIsTextSelected(false);
    setPopoverOpen(false);
    slashTriggeredRef.current = false;
    selectionRef.current = null;
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
      selectionRef.current = null;
      // Adjust height for new content after a short delay for rendering
      setTimeout(() => adjustTextareaHeight(contentRef.current), 0);
    }
  };

  // Handle selection change to show/hide formatting toolbar
  const handleSelectionChange = () => {
      requestAnimationFrame(() => { // Use rAF to ensure selection state is updated
          if (contentRef.current && document.activeElement === contentRef.current) {
              const start = contentRef.current.selectionStart;
              const end = contentRef.current.selectionEnd;
              const hasSelection = start !== end;

              // Show formatting toolbar only if text is selected AND slash command is NOT active
              if (hasSelection && !popoverOpen) {
                  selectionRef.current = { start, end }; // Store selection for toolbar actions
                  setIsTextSelected(true);
              } else {
                  setIsTextSelected(false);
                  // Don't clear selectionRef if popover is open for anchoring
                  if (!popoverOpen) {
                    selectionRef.current = null;
                  }
              }

              // Close slash popover if selection changes while it's open
              if (popoverOpen && slashTriggeredRef.current && hasSelection) {
                 setPopoverOpen(false);
                 slashTriggeredRef.current = false;
                 selectionRef.current = { start, end }; // Update selection ref for toolbar
                 setIsTextSelected(true); // Show toolbar now
              }

          } else if (!document.querySelector('.formatting-toolbar:hover') && !document.querySelector('[data-radix-popover-content]:hover')) {
             // Hide toolbar if textarea loses focus and mouse isn't over toolbar/popover
             setIsTextSelected(false);
             if (!popoverOpen) {
                selectionRef.current = null;
             }
          }
      });
  };

  // Close popover on blur if not interacting with popover content itself
  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      const relatedTarget = event.relatedTarget as Node | null;
      const popoverContent = document.querySelector('[data-radix-popover-content]');
      const formattingToolbar = document.querySelector('.formatting-toolbar');

       // Delay closing popover to allow clicks inside it
      if (popoverOpen && !popoverContent?.contains(relatedTarget)) {
          setTimeout(() => {
             // Check again after delay if focus is still outside popover
             if (!document.activeElement || !popoverContent?.contains(document.activeElement)) {
                  setPopoverOpen(false);
                  slashTriggeredRef.current = false;
                  // Keep selection ref if needed, or clear:
                  // selectionRef.current = null;
             }
          }, 150); // Slightly longer delay
      }

       // Delay hiding toolbar to allow clicks inside it
       if (isTextSelected && !formattingToolbar?.contains(relatedTarget)) {
           setTimeout(() => {
                // Check again after delay if focus is still outside toolbar
               if (!document.activeElement || !formattingToolbar?.contains(document.activeElement)) {
                   setIsTextSelected(false);
                   selectionRef.current = null; // Clear selection when toolbar hides
               }
           }, 150);
       }
  };

   // Close popover on Escape key
   React.useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
            if (popoverOpen) {
             setPopoverOpen(false);
             slashTriggeredRef.current = false;
             selectionRef.current = null;
            }
            if (isTextSelected) {
                setIsTextSelected(false);
                selectionRef.current = null;
                if (contentRef.current) contentRef.current.blur(); // Optional: blur textarea
            }
       }
     };
     document.addEventListener('keydown', handleKeyDown);
     return () => document.removeEventListener('keydown', handleKeyDown);
   }, [popoverOpen, isTextSelected]);


  // Effect to adjust initial height and on note change
  React.useEffect(() => {
    adjustTextareaHeight(contentRef.current);
  }, [currentNoteId]); // Adjust height when note changes

  const currentNoteData = currentNoteId ? sampleNotes.find(n => n.id === currentNoteId) : null;
  const breadcrumb = currentNoteId ? `# Personal / ${currentNoteData?.title.substring(0, 20)}...` : "# Personal / New Note";
  const author = "Nathalia Anderson";
  const timestamp = currentNoteData?.lastEdited || `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const wikipediaLink = "https://en.wikipedia.org/wiki/Jeff_Bezos";

  // Calculate popover position (basic example - may need refinement)
   const getPopoverStyle = (): React.CSSProperties => {
     if (!selectionRef.current || !contentRef.current) return { display: 'none' }; // Hide if no anchor

     // Very basic positioning below the slash or selection start
     // A more robust solution would calculate character position precisely
     const linesBefore = noteContent.substring(0, selectionRef.current.start).split('\n').length - 1;
     const lineHeight = 24; // Approximate line height (adjust as needed)
     const topOffset = linesBefore * lineHeight + 60; // Add offset for header etc.
     const leftOffset = 50; // Simple fixed left offset

     return {
       position: 'absolute',
       top: `${topOffset}px`,
       left: `${leftOffset}px`,
       zIndex: 50, // Ensure it's above the textarea
     };
   };

   // Calculate formatting toolbar position
    const getToolbarStyle = (): React.CSSProperties => {
       if (!isTextSelected || !selectionRef.current || !contentRef.current) {
         return { display: 'none', opacity: 0 };
       }

       // Basic positioning above the selection start
       // Again, needs refinement for precise positioning
       const linesBefore = noteContent.substring(0, selectionRef.current.start).split('\n').length - 1;
       const lineHeight = 24; // Approximate line height
       const topOffset = linesBefore * lineHeight + 20; // Position slightly above the line
       const leftOffset = 50; // Simple fixed left offset

       return {
         position: 'absolute',
         top: `${topOffset}px`,
         left: `${leftOffset}px`,
         opacity: 1,
         transition: 'opacity 0.2s ease-in-out',
         zIndex: 50,
       };
    };


  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      {/* Notes List Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col shrink-0 h-full">
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
            className="text-3xl font-bold border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent overflow-hidden h-auto leading-tight focus:outline-none mb-4" // Add margin bottom
            rows={1}
            style={{ height: 'auto' }} // Start with auto height
          />


           {/* Floating Formatting Toolbar - Positioned Absolutely */}
           <div style={getToolbarStyle()} className={cn(
               "bg-background/80 backdrop-blur-sm py-1 px-1 rounded-md border border-border/30 shadow-lg",
               // Controlled by getToolbarStyle's display and opacity
            )}>
               <div className="flex items-center gap-0.5 p-0 rounded-md bg-card w-min formatting-toolbar">
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95"><Bold className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95"><Italic className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95"><Underline className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95"><Strikethrough className="w-4 h-4" /></Button>
                   <Separator orientation="vertical" className="h-5 mx-1" />
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95"><Highlighter className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95"><LinkIcon className="w-4 h-4" /></Button>
                   <Separator orientation="vertical" className="h-5 mx-1" />
                   {/* Add Image and Video buttons */}
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95" onClick={handleInsertImage} title="Insert Image">
                     <ImageIcon className="w-4 h-4" />
                     <span className="sr-only">Insert Image</span>
                   </Button>
                   <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 active:scale-95" onClick={handleInsertVideo} title="Insert Video">
                     <Video className="w-4 h-4" />
                     <span className="sr-only">Insert Video</span>
                   </Button>
               </div>
           </div>

          {/* Main Content - Auto-growing with Popover Anchored */}
           {/* Wrap Textarea and Popover for relative positioning */}
           <div className="relative w-full">
               <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  {/* Invisible PopoverAnchor at the cursor/slash position */}
                  <PopoverAnchor style={{
                      position: 'absolute',
                      top: selectionRef.current ? (noteContent.substring(0, selectionRef.current.start).split('\n').length -1) * 24 : 0, // Approximation
                      left: '10px', // Approximation - needs better calculation
                      width: 0,
                      height: 0,
                  }}/>
                  <Textarea
                    ref={contentRef}
                    placeholder="Start writing your note... Type '/' for commands."
                    value={noteContent}
                    onChange={handleContentChange}
                    onSelect={handleSelectionChange} // Use custom selection handler
                    onBlur={handleBlur}
                    onClick={() => { // Close popover on simple click inside textarea if it was open
                        if (popoverOpen && slashTriggeredRef.current) {
                            setPopoverOpen(false);
                            slashTriggeredRef.current = false;
                            selectionRef.current = null;
                        }
                    }}
                    className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent w-full leading-relaxed focus:outline-none overflow-hidden min-h-[400px]" // Ensure sufficient min-height
                    style={{ height: 'auto' }} // Start with auto height
                  />
                 <PopoverContent
                    className="w-60 p-1"
                    side="bottom" // Position below the anchor
                    align="start" // Align start edge with anchor
                    sideOffset={10} // Offset below the anchor
                    onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus shift
                    onInteractOutside={(e) => {
                        // Only close if the target isn't the textarea itself
                        if (e.target !== contentRef.current) {
                            setPopoverOpen(false);
                            slashTriggeredRef.current = false;
                             // Keep selection ref if needed, or clear:
                             // selectionRef.current = null;
                        }
                    }}
                    // Force render allows position calculation even when hidden initially
                    // but can have performance implications. Manage visibility via `open` prop.
                    // style={getPopoverStyle()} // Use absolute positioning if needed, but side/align usually better
                 >
                   <div className="text-xs text-muted-foreground px-2 py-1">Blocks</div>
                   <div className="flex flex-col space-y-0.5">
                     {slashCommands.map((cmd) => (
                       <Button
                         key={cmd.name}
                         variant="ghost"
                         className="w-full justify-start h-8 px-2 text-sm hover:scale-100 active:scale-100"
                         onClick={() => handleSelectCommand(cmd.name)}
                         onMouseDown={(e) => e.preventDefault()} // Prevent blur
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

           {noteContent.includes("[Image Placeholder]") && (
               <div className="my-4 p-4 border rounded-md bg-muted/30 text-center text-muted-foreground">
                   [Image Placeholder - Implement Upload/Display]
               </div>
           )}
            {noteContent.includes("[Video Placeholder]") && (
                <div className="my-4 p-4 border rounded-md bg-muted/30 text-center text-muted-foreground">
                    [Video Placeholder - Implement Upload/Display]
                </div>
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

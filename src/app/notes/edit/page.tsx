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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Import Popover components
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
  { name: 'Bulleted List', icon: () => <ul className="list-disc pl-1 text-xs"><li></li></ul>, }, // Custom icon for list
  { name: 'Numbered List', icon: () => <ol className="list-decimal pl-1 text-xs"><li></li></ol>, }, // Custom icon for list
  { name: 'Image', icon: ImageIcon },
  { name: 'Video', icon: Video },
  { name: 'Code Block', icon: Code },
  { name: 'Audio', icon: AudioWaveform },
  { name: 'Highlight Block', icon: Highlighter },
  { name: 'Quote', icon: TextQuote },
  { name: 'Color Card', icon: Palette },
];

export default function EditNotePage() {
  // State for current note being edited (replace with actual logic)
  const [currentNoteId, setCurrentNoteId] = React.useState<string | null>('1'); // Start with the sample note
  const [noteTitle, setNoteTitle] = React.useState("The Remarkable Story of Jeff Bezos and Amazon");
  const [noteContent, setNoteContent] = React.useState(`Jeff Bezos is a business magnate and the founder, CEO, and president of Amazon, the world's largest online retailer. Born on January 12, 1964, in Albuquerque, New Mexico, Bezos had a varied career before starting Amazon. He graduated from Princeton University with a degree in electrical engineering and computer science. Bezos worked on Wall Street for several years before leaving to found Amazon. In the early days of the company, Bezos ran Amazon out of his garage and focused on selling books online.

As the company grew, Bezos expanded Amazon's product offerings to include a wide range of items, including electronics, clothing, and home goods. Under Bezos' leadership.

- Jeff Bezos was born on January 12, 1964, in Albuquerque, New Mexico.
- Bezos had a varied career before starting Amazon in 1994.
- Amazon started out as an online bookstore, but Bezos quickly expanded the company's product offerings to include a wide range of items.
- Bezos is known for his focus on customer obsession and long-term thinking.
- Bezos Family Foundation has donated millions of dollars to charitable causes through the`);

  // State for slash command popover
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setNoteContent(value);

    // Check for slash command trigger at the end of the text or after a space
    if (value.endsWith('/') || value.endsWith('/ ')) {
      setPopoverOpen(true);
    } else {
      setPopoverOpen(false);
    }
  };

  const handleSelectCommand = (commandName: string) => {
     // Replace '/' with the selected command/block (placeholder logic)
     setNoteContent(prev => prev.replace(/\/$/, `[${commandName}] `)); // Basic replacement
     setPopoverOpen(false);
     contentRef.current?.focus(); // Focus back on the textarea
  };

   // Handle creating a new note (placeholder)
   const handleCreateNewNote = () => {
     console.log("Create new note clicked");
     setCurrentNoteId(null); // Indicate new note state
     setNoteTitle(""); // Clear title
     setNoteContent(""); // Clear content
   };

   // Handle selecting an existing note (placeholder)
   const handleSelectNote = (noteId: string) => {
     const selected = sampleNotes.find(n => n.id === noteId);
     if (selected) {
        setCurrentNoteId(selected.id);
        setNoteTitle(selected.title); // Load sample title
        setNoteContent(selected.contentPreview + "\n\n(Full content would load here...)"); // Load sample content
     }
   };

  const currentNoteData = currentNoteId ? sampleNotes.find(n => n.id === currentNoteId) : null;
  const breadcrumb = currentNoteId ? `# Personal / ${currentNoteData?.title.substring(0,20)}...` : "# Personal / New Note";
  const author = "Nathalia Anderson"; // Static for now
  const timestamp = currentNoteData?.lastEdited || `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const wikipediaLink = "https://en.wikipedia.org/wiki/Jeff_Bezos"; // Example link

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      {/* Notes List Sidebar (Left) */}
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
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 space-y-6 bg-background">
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

          {/* Title - Editable */}
          <Textarea
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="text-3xl font-bold border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent h-auto leading-tight focus:outline-none"
            rows={1}
          />

          {/* Floating Toolbar Placeholder */}
          <div className="sticky top-[-1px] z-10 bg-background/80 backdrop-blur-sm py-2 mb-4 rounded-md -mx-2 px-2"> {/* Negative margin to extend backdrop */}
            <div className="flex items-center gap-1 p-1 rounded-md border bg-card w-min shadow-sm">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Bold className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Italic className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Underline className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Strikethrough className="w-4 h-4" /></Button>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><Highlighter className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 active:scale-95"><LinkIcon className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Main Content - Editable */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
               {/* The Textarea acts as the trigger implicitly via state change */}
               {/* We need an invisible trigger or manage popover position manually */}
               {/* For simplicity, let's assume the popover anchors near the cursor (requires JS) */}
               {/* This basic example just opens it */}
               <div className='relative'> {/* Wrapper for potential positioning context */}
                    <Textarea
                      ref={contentRef}
                      placeholder="Start writing your note... Type '/' for commands."
                      value={noteContent}
                      onChange={handleContentChange}
                      className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent min-h-[200px] w-full leading-relaxed focus:outline-none"
                    />
               </div>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-1">
              <div className="text-xs text-muted-foreground px-2 py-1">Blocks</div>
              <div className="flex flex-col space-y-0.5">
                {slashCommands.map((cmd) => (
                  <Button
                    key={cmd.name}
                    variant="ghost"
                    className="w-full justify-start h-8 px-2 text-sm hover:scale-100 active:scale-100" // Disable bubble effect for popover items
                    onClick={() => handleSelectCommand(cmd.name)}
                  >
                    <cmd.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{cmd.name}</span>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>


          {/* Example: Render Highlighted Info Block if present in content (logic needed) */}
          {noteContent.includes("Under Bezos' leadership") && (
              <div className="bg-yellow-100/50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg my-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
                  As the company grew, Bezos expanded Amazon's product offerings to include a wide range of items, including electronics, clothing, and home goods. Under Bezos' leadership
                </p>
              </div>
           )}

           {/* Example: Render Bullet Points if present (logic needed) */}
            {noteContent.includes("- Jeff Bezos was born") && (
              <ul className="list-disc space-y-2 pl-6 my-4">
                <li className="text-base text-foreground/90 leading-relaxed">Jeff Bezos was born on January 12, 1964, in Albuquerque, New Mexico.</li>
                <li className="text-base text-foreground/90 leading-relaxed">Bezos had a varied career before starting Amazon in 1994.</li>
                {/* ... other points */}
              </ul>
           )}


          {/* Wikipedia Link */}
          {currentNoteId === '1' && ( // Only show for the sample note
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
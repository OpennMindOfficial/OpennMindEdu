
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ExternalLink
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

export default function EditNotePage() {
  // Demo data
  const breadcrumb = "# Personal / Journey of Life";
  const author = "Nathalia Anderson";
  const timestamp = "Today, 15:28";
  const noteTitle = "The Remarkable Story of Jeff Bezos and Amazon";
  const noteContent = `
Jeff Bezos is a business magnate and the founder, CEO, and president of Amazon, the world's largest online retailer. Born on January 12, 1964, in Albuquerque, New Mexico, Bezos had a varied career before starting Amazon. He graduated from Princeton University with a degree in electrical engineering and computer science. Bezos worked on Wall Street for several years before leaving to found Amazon. In the early days of the company, Bezos ran Amazon out of his garage and focused on selling books online.
  `.trim();
  const highlightedText = `
As the company grew, Bezos expanded Amazon's product offerings to include a wide range of items, including electronics, clothing, and home goods. Under Bezos' leadership
  `.trim();
  const bulletPoints = [
    "Jeff Bezos was born on January 12, 1964, in Albuquerque, New Mexico.",
    "Bezos had a varied career before starting Amazon in 1994.",
    "Amazon started out as an online bookstore, but Bezos quickly expanded the company's product offerings to include a wide range of items.",
    "Bezos is known for his focus on customer obsession and long-term thinking.",
    "Bezos Family Foundation has donated millions of dollars to charitable causes through the"
  ];
  const wikipediaLink = "https://en.wikipedia.org/wiki/Jeff_Bezos"; // Example link

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
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
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Delete Note</span>
            </Button>
          </div>

          <Separator />

          {/* Title */}
          {/* Using a Textarea for potential editing, styled like a heading */}
          <Textarea
            placeholder="Note Title"
            defaultValue={noteTitle}
            className="text-3xl font-bold border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent h-auto leading-tight focus:outline-none"
            rows={1} // Adjust rows as needed, auto-height might need JS
          />


          {/* Floating Toolbar Placeholder */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 mb-4 rounded-md">
            <div className="flex items-center gap-1 p-1 rounded-md border bg-card w-min shadow-sm">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Bold className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Italic className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Underline className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Strikethrough className="w-4 h-4" /></Button>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8"><Highlighter className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><LinkIcon className="w-4 h-4" /></Button>
            </div>
          </div>


          {/* Main Content */}
           {/* Using Textarea for potential editing */}
           <Textarea
             placeholder="Start writing your note..."
             defaultValue={noteContent}
             className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent min-h-[100px] w-full leading-relaxed focus:outline-none"
           />


          {/* Highlighted Info Block */}
          <div className="bg-yellow-100/50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg my-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
            <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
              {highlightedText}
            </p>
          </div>

          {/* Bulleted List */}
           <ul className="list-disc space-y-2 pl-6 my-4">
             {bulletPoints.map((point, index) => (
               <li key={index} className="text-base text-foreground/90 leading-relaxed">
                 {/* Using Textarea for potential editing */}
                 <Textarea
                   defaultValue={point}
                   className="text-base border-none focus-visible:ring-0 shadow-none p-0 resize-none bg-transparent w-full leading-relaxed focus:outline-none h-auto"
                   rows={1}
                 />
               </li>
             ))}
           </ul>

          {/* Wikipedia Link */}
          <div className="mt-6">
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
        </main>
      </div>
    </div>
  );
}


'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Lightbulb, ArrowLeft } from "lucide-react"; // Added Lightbulb and ArrowLeft
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useRef } from 'react'; 
import { gsap } from 'gsap'; 

export default function NotesPage() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(true); // Keep popup open
  
  const pageRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null); // Ref for the main content to animate
  const popupRef = useRef<HTMLDivElement>(null); // Ref for the popup

  useEffect(() => {
    if (mainContentRef.current) {
      gsap.fromTo(mainContentRef.current.children, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    }
    if (isPopupOpen && popupRef.current) {
      gsap.fromTo(popupRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isPopupOpen]);


  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        {/* Apply blur to the main content when popup is open */}
        <main
          ref={pageRef}
          className={cn(
            "flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background",
            isPopupOpen ? "blur-sm" : ""
          )}
        >
          <div ref={mainContentRef}> {/* Wrapper for GSAP targeting */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Notes</h1>
              <Link href="/notes/edit" passHref legacyBehavior>
                <a>
                  <Button className="hover:scale-110 active:scale-95">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Note
                  </Button>
                </a>
              </Link>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-10 w-full max-w-sm bg-muted dark:bg-input rounded-full"
              />
            </div>

            <div>
              <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg text-muted-foreground">No notes yet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Click "Create Note" to start writing your first note.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Non-cancelable Popup Dialog */}
        <Dialog open={isPopupOpen} onOpenChange={(open) => {
          // Prevent closing by not changing state unless explicitly handled by a button
          if (!open && isPopupOpen) { 
            // setIsPopupOpen(false); // Example: can be set to false by a button
          }
        }}>
          <DialogContent
            ref={popupRef}
            className="sm:max-w-[425px] pointer-events-auto"
            onInteractOutside={(e) => e.preventDefault()} 
            onEscapeKeyDown={(e) => e.preventDefault()} 
            hideCloseButton={true} 
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Feature Under Development
              </DialogTitle>
              <DialogDescription>
                The Notes feature is currently under development and will be launching soon.
                We are working hard to bring you a comprehensive note-taking experience!
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Thank you for your patience. Please check back later.
              </p>
            </div>
            <DialogFooter>
              <Link href="/" passHref legacyBehavior>
                <Button
                  variant="outline"
                  className="hover:scale-105 active:scale-95"
                  onClick={() => setIsPopupOpen(false)} 
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

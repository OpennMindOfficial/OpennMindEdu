
'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Lightbulb } from "lucide-react"; // Added Lightbulb
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function NotesPage() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(true); // Keep popup open

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        {/* Apply blur to the main content when popup is open */}
        <motion.main
          className={cn(
            "flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background",
            isPopupOpen ? "blur-sm" : ""
          )}
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.div className="flex justify-between items-center mb-6" variants={itemVariants}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Notes</h1>
            <Link href="/notes/edit" passHref legacyBehavior>
              <a>
                <Button className="hover:scale-110 active:scale-95">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Note
                </Button>
              </a>
            </Link>
          </motion.div>

          <motion.div className="relative mb-6" variants={itemVariants}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="pl-10 w-full max-w-sm bg-muted dark:bg-input rounded-full"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>
        </motion.main>

        {/* Non-cancelable Popup Dialog */}
        <Dialog open={isPopupOpen} onOpenChange={(open) => {
          // Prevent closing by not changing state, or only allow closing if !open (which won't happen here)
          if (!open) {
            // This part can be removed if it should truly never close by onOpenChange
            // setIsPopupOpen(false);
          }
        }}>
          <DialogContent
            className="sm:max-w-[425px] pointer-events-auto"
            onInteractOutside={(e) => e.preventDefault()} // Prevent closing on outside click
            onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on Esc key
            hideCloseButton={true} // Custom prop to hide close button in DialogContent if implemented
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
            {/* No footer or close buttons to make it non-cancelable */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

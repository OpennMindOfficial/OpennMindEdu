
'use client'; // Added use client for potential future interactions

import { Header } from "@/components/layout/header"; // Import Header
import { Sidebar } from "@/components/layout/sidebar"; // Import Sidebar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link"; // Import Link
import { cn } from "@/lib/utils"; // Import cn
import { motion } from 'framer-motion'; // Import motion

// Note: This page might need further adjustments depending on how notes are listed
// and how it integrates with the new sidebar navigation in the edit page.
// For now, it provides a basic starting point within the main layout.

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
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <motion.main
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background"
          initial="hidden"
          animate="show"
          variants={containerVariants} // Apply container variants
        >
          <motion.div className="flex justify-between items-center mb-6" variants={itemVariants}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Notes</h1>
            {/* Updated Button to be a Link */}
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

          {/* Placeholder for notes content */}
          <motion.div variants={itemVariants}>
            <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">No notes yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Click "Create Note" to start writing your first note.
                </p>
                {/* Or display list of notes here */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Example Note Card Structure (hidden for now) */}
          {/*
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Sample Note Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    This is the beginning of your note content. It might be longer,
                    but we'll only show a few lines here as a preview...
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground pt-4">
                  <span>Last edited: July 29, 2024</span>
                </CardFooter>
              </Card>
            </motion.div>
             Add more note cards here with motion.div wrapper
          </motion.div>
          */}

        </motion.main>
      </div>
    </div>
  );
}

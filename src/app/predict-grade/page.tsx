
'use client';

import * as React from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Lightbulb, Send } from "lucide-react"; // Import icons
import { motion } from 'framer-motion'; // Import motion

export default function PredictGradePage() {
  const [suggestion, setSuggestion] = React.useState("");

  const handleSuggestionSubmit = () => {
    console.log("Suggestion submitted:", suggestion);
    // Add logic to send the suggestion (e.g., API call)
    setSuggestion(""); // Clear textarea after submission
    // Potentially show a success message
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <motion.h1
            className="text-3xl font-bold text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Predict Grade
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span>Feature Under Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The Predict Grade feature is currently under development and will be launching soon.
                  Stay tuned for a tool to help you estimate your performance!
                </p>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Have a Suggestion?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    How can we make this feature most useful for you? Let us know your thoughts!
                  </p>
                  <Textarea
                    placeholder="Enter your suggestion here..."
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="mb-3 min-h-[100px] bg-background dark:bg-input"
                  />
                  <Button
                    onClick={handleSuggestionSubmit}
                    disabled={!suggestion.trim()}
                    className="hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Suggestion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}


'use client';

import * as React from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Lightbulb, Send } from "lucide-react"; // Import icons
import { gsap } from 'gsap'; // Import GSAP

export default function PredictedPapersPage() {
  const [suggestion, setSuggestion] = React.useState("");
  const pageRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});
    tl.fromTo(titleRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(cardRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.3");
  }, []);

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
        <main ref={pageRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1
            ref={titleRef}
            className="text-3xl font-bold text-foreground"
          >
            Predicted Papers
          </h1>
          <div ref={cardRef}>
            <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span>Feature Under Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The Predicted Papers feature is currently being developed and will be available soon.
                  We're working hard to bring you high-quality predictions to help you ace your exams!
                </p>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Have a Suggestion?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    We'd love to hear your ideas for this feature! Let us know what you'd like to see.
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
          </div>
        </main>
      </div>
    </div>
  );
}

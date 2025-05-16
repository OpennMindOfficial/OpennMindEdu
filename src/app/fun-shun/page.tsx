
'use client'; 

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef } from 'react'; // Import React hooks
import { gsap } from 'gsap'; // Import GSAP

export default function FunShunPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});
    tl.fromTo(titleRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(cardRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.3");
  }, []);

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
            Fun Shun
          </h1>
          <div ref={cardRef}>
            <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">Take a Break and Have Fun</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enjoy some light-hearted content and fun activities to refresh
                  your mind. It's important to take breaks and recharge.
                </p>
                {/* Example fun activities */}
                <div className="mt-4">
                  <h4 className="font-semibold">Suggested Activities</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Play a Quick Puzzle Game</li>
                    <li>Watch Funny Video Clips</li>
                    <li>Listen to Relaxing Music</li>
                    <li>Read Jokes and Riddles</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

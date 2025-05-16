
'use client';

import React, { useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Target, Users, BookOpen } from "lucide-react";
import { gsap } from 'gsap';
import Image from 'next/image'; // Import Image

export default function AboutUsPage() {
  const pageTitleRef = useRef<HTMLDivElement>(null);
  const missionCardRef = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);
  const teamCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (pageTitleRef.current) {
      tl.fromTo(pageTitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
      );
    }

    const cardsToAnimate = [missionCardRef.current, storyCardRef.current, teamCardRef.current].filter(Boolean);
    if (cardsToAnimate.length > 0) {
      tl.fromTo(cardsToAnimate,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 },
        "-=0.3" // Start slightly after the title animation
      );
    }
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 space-y-8 bg-muted/30 dark:bg-muted/10">
          <div className="max-w-4xl mx-auto">
            <div // Removed Framer Motion props from here
              ref={pageTitleRef}
              className="flex items-center gap-3 mb-10 text-center flex-col"
            >
              <Info className="w-10 h-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">About OpennMind</h1>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
                Revolutionizing learning with intelligent tools and a passion for education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div ref={missionCardRef}>
                <Card className="bg-card dark:bg-card border-0 rounded-xl shadow-lg h-full">
                  <CardHeader className="items-center text-center">
                    <Target className="w-10 h-10 text-primary mb-3" />
                    <CardTitle className="text-2xl font-semibold">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground leading-relaxed px-6 pb-6">
                    <p>
                      At OpennMind, our mission is to empower students of all ages with innovative AI-driven tools that make learning more accessible, engaging, and effective. We believe in fostering a love for knowledge and equipping learners with the skills they need to succeed in an ever-evolving world.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div ref={storyCardRef}>
                <Card className="bg-card dark:bg-card border-0 rounded-xl shadow-lg h-full">
                  <CardHeader className="items-center text-center">
                    <BookOpen className="w-10 h-10 text-primary mb-3" />
                    <CardTitle className="text-2xl font-semibold">Our Story</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground leading-relaxed px-6 pb-6">
                    <p>
                      Founded by a team of passionate educators and technologists, OpennMind was born from the desire to bridge the gap between traditional education and the possibilities of artificial intelligence. We started with a simple idea: to create a smarter, more personalized learning companion.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div ref={teamCardRef}>
                <Card className="bg-card dark:bg-card border-0 rounded-xl shadow-lg">
                    <CardHeader className="items-center text-center">
                        <Users className="w-10 h-10 text-primary mb-3" />
                        <CardTitle className="text-2xl font-semibold">Meet the Team (Coming Soon)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground leading-relaxed px-6 pb-6">
                        <p>
                        We're a diverse group of innovators, thinkers, and dreamers dedicated to shaping the future of education. More about our amazing team coming soon!
                        </p>
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex flex-col items-center">
                                     <Image
                                         src={`https://placehold.co/100x100.png`}
                                         alt={`Team Member ${i}`}
                                         width={80}
                                         height={80}
                                         className="rounded-full mb-2 shadow-md"
                                         data-ai-hint="person portrait"
                                     />
                                    <p className="font-semibold text-sm text-foreground">Team Member {i}</p>
                                    <p className="text-xs text-muted-foreground">Role {i}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="h-8"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

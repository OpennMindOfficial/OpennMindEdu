
'use client';

import React, { useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, LifeBuoy, Mail, MessageSquare } from "lucide-react";
import { gsap } from 'gsap';

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by going to the login page and clicking on the 'Forgot Password' link. Follow the instructions sent to your email.",
  },
  {
    question: "Where can I find my saved notes?",
    answer: "Your saved notes are accessible from the 'Saved' section in the sidebar menu.",
  },
  {
    question: "How does the 'Ask Doubt' feature work?",
    answer: "The 'Ask Doubt' feature allows you to type your questions or upload images related to your doubts. Our AI tutor will provide explanations and assistance.",
  },
  {
    question: "Is there a mobile app available?",
    answer: "Currently, OpennMind is optimized for web browsers. A mobile app is in our future development plans.",
  },
];

export default function SupportPage() {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pageTitleRef = useRef<HTMLDivElement>(null);
  const searchCardRef = useRef<HTMLDivElement>(null);
  const faqCardRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const accordionItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!pageContainerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate the page title container
    if (pageTitleRef.current) {
      tl.fromTo(pageTitleRef.current, 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }

    // Animate the main cards
    const cards = [searchCardRef.current, faqCardRef.current, contactCardRef.current].filter(Boolean);
    if (cards.length > 0) {
      tl.fromTo(cards, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, 
        "-=0.3" // Start slightly after the title animation begins to overlap
      );
    }
    
    // Animate accordion items if they exist and FAQ card is present
    if (faqCardRef.current) {
        const validAccordionItems = accordionItemRefs.current.filter(el => el !== null);
        if (validAccordionItems.length > 0) {
            tl.fromTo(validAccordionItems,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
                "-=0.2" // Overlap with the FAQ card animation
            );
        }
    }

  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main ref={pageContainerRef} className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 space-y-8 bg-muted/30 dark:bg-muted/10">
          <div className="max-w-4xl mx-auto">
            <div
              ref={pageTitleRef}
              className="flex items-center gap-3 mb-8"
            >
              <LifeBuoy className="w-8 h-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Help & Support</h1>
            </div>

            <div ref={searchCardRef} className="mb-8">
              <Card className="bg-card dark:bg-card border-0 rounded-xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">Search Help</CardTitle>
                  <CardDescription className="text-muted-foreground">Find answers to your questions quickly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search FAQs and articles..."
                      className="pl-10 w-full bg-background dark:bg-input rounded-lg h-11 text-base shadow-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div ref={faqCardRef} className="mb-8">
              <Card className="bg-card dark:bg-card border-0 rounded-xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq, index) => (
                      <div key={index} ref={el => accordionItemRefs.current[index] = el}>
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="text-base font-medium hover:no-underline text-foreground/90 dark:text-foreground/90">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </div>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div ref={contactCardRef}>
              <Card className="bg-card dark:bg-card border-0 rounded-xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">Still Need Help?</CardTitle>
                  <CardDescription className="text-muted-foreground">Our support team is here to assist you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 dark:bg-zinc-800/60 rounded-lg">
                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Send us an email at <a href="mailto:support@opennmind.com" className="text-primary hover:underline">support@opennmind.com</a>. We typically respond within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/50 dark:bg-zinc-800/60 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Live Chat (Coming Soon)</h4>
                      <p className="text-sm text-muted-foreground">
                        Chat directly with a support agent. This feature will be available soon.
                      </p>
                    </div>
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

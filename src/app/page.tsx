import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { TryNowSection } from '@/components/sections/try-now-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ChatInterface } from '@/components/chat/chat-interface';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TryNowSection />
          <FaqSection />
          {/* Chat Interface is positioned via CSS in its component */}
          <ChatInterface />
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}

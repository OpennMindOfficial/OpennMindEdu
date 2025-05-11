import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureCard } from '@/components/landing/feature-card';
import { Cube, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNavbar />
      <main>
        <HeroSection />

        {/* Feature Highlights Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<Cube className="w-7 h-7 text-primary" />}
                title="Use Database with your stack"
                description="We offer client and server libraries in everything from React and Ruby to iOS."
                dataAiHint="database stack"
              />
              <FeatureCard
                icon={<ShieldCheck className="w-7 h-7 text-primary" />}
                title="Security & privacy"
                description="Database supports PII data encrypted with AES-256 at rest or explicit user consent flows."
                dataAiHint="security privacy"
              />
            </div>
          </div>
        </section>
        
        {/* Placeholder for other sections like "Why Heexo", "Platform", "Solutions" as per nav links */}
         <section id="why-heexo" className="py-16 md:py-24 bg-muted/20 dark:bg-card/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why heexo?</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Discover the advantages of using heexo for your modern applications. Speed, scalability, and simplicity.
            </p>
            {/* Add more content here */}
          </div>
        </section>
        <section id="platform" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Platform Overview</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore the robust architecture and features of the heexo database platform.
            </p>
            {/* Add more content here */}
          </div>
        </section>
         <section id="solutions" className="py-16 md:py-24 bg-muted/20 dark:bg-card/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Solutions</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
             Tailored solutions for various use cases, from startups to enterprise-level applications.
            </p>
            {/* Add more content here */}
          </div>
        </section>
        <section id="changelog" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Changelog</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Stay updated with the latest improvements and features added to heexo.
            </p>
            {/* Add more content here */}
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/30 bg-background">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} heexo. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:underline hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

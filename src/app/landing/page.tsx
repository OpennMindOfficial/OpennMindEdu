
import { HeroSection } from '@/components/landing/hero-section';
import { LandingNavbar } from '@/components/landing/landing-navbar';
import { FeatureCard } from '@/components/landing/feature-card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, BookOpen, Lightbulb, Star } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <LandingNavbar />
      <HeroSection />

      {/* Placeholder for Features Section (Inspired by Brilliant.org) */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock Your Potential
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            OpennMind offers a new way to learn, practice, and master any subject. Explore interactive lessons, get instant AI help, and track your progress.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-12 h-12 text-primary mb-4" />}
              title="Interactive Courses"
              description="Engage with hands-on lessons designed to make learning effective and fun."
              dataAiHint="book education"
            />
            <FeatureCard
              icon={<Lightbulb className="w-12 h-12 text-primary mb-4" />}
              title="AI-Powered Assistance"
              description="Get your doubts cleared instantly, generate study materials, and more with our AI tutor."
              dataAiHint="ai brain"
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-primary mb-4" />}
              title="Practice Makes Perfect"
              description="Test your knowledge with mock exams, timed quizzes, and a vast question bank."
              dataAiHint="exam test"
            />
          </div>
        </div>
      </section>

      {/* Placeholder for "How it Works" or Course Showcase */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Master Concepts with OpennMind
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From foundational basics to advanced topics, we break down complex ideas into understandable pieces.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg" data-ai-hint="laptop learning">
              <Image src="https://picsum.photos/seed/learningplatform/600/338" alt="Learning Platform" layout="fill" objectFit="cover" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Learn by Doing</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our interactive exercises and real-time feedback ensure you grasp concepts, not just memorize them.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Step-by-step explanations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Personalized learning paths
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Track your progress and achievements
                </li>
              </ul>
              <Button size="lg" className="mt-4">Explore Subjects</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section Placeholder */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Loved by Students Worldwide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="p-6 bg-slate-100 dark:bg-slate-700 rounded-lg shadow">
                <div className="flex justify-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                  "OpennMind has completely changed the way I study. The AI tutor is a lifesaver!"
                </p>
                <div className="flex items-center justify-center">
                  <Image src={`https://picsum.photos/seed/student${i}/40/40`} alt={`Student ${i}`} width={40} height={40} className="rounded-full mr-3" data-ai-hint="person student" />
                  <span className="font-semibold">Student {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Learning?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join thousands of students who are acing their exams and building a strong foundation with OpennMind.
          </p>
          <Button size="lg" variant="secondary" className="text-primary bg-white hover:bg-slate-100 dark:text-primary dark:bg-slate-50 dark:hover:bg-slate-200">
            Get Started for Free
          </Button>
        </div>
      </section>

      <footer className="py-8 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} OpennMind. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

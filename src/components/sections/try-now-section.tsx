import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function TryNowSection() {
  return (
    <section id="try-now" className="section-padding bg-gradient-to-r from-primary/80 to-primary dark:from-primary/50 dark:to-primary/80 text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
          Experience the future of learning. Ask your first question and see how Tangled can transform your study sessions.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="rounded-xl bg-background text-primary hover:bg-background/90 border-none shadow-lg"
        >
          Ask Your Problem <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle, Search } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Ask Your Question',
    description: 'Simply type your question into the chat interface, specifying the subject if needed.',
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Our advanced AI analyzes your query, accessing vast knowledge bases relevant to the subject.',
  },
  {
    icon: CheckCircle,
    title: 'Receive Your Answer',
    description: 'Get a clear, concise answer along with a detailed explanation to deepen your understanding.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          How Our AI Works to Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card text-card-foreground shadow-lg border-border/50 rounded-xl overflow-hidden transition-transform hover:scale-105">
              <CardHeader className="items-center">
                 <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                 </div>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

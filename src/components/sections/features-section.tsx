import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Code, Languages, Landmark, LineChart, MessageSquare, Microscope, Palette, Scale, Settings } from 'lucide-react';

const subjects = [
  { name: 'Computer Science', icon: Code },
  { name: 'Psychology', icon: BrainCircuit },
  { name: 'AI', icon: Settings }, // Using Settings as a placeholder for AI
  { name: 'Business', icon: LineChart },
  { name: 'Math', icon: Scale }, // Using Scale as a placeholder for Math
  { name: 'Physics', icon: Microscope },
  { name: 'Language', icon: Languages },
  { name: 'History', icon: Landmark },
  { name: 'Communication', icon: MessageSquare },
  { name: 'Design', icon: Palette },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ask everything with Tangled anytime, anywhere
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore the wide range of subjects our AI can assist you with. From complex algorithms to historical events, Tangled has you covered.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {subjects.map((subject) => (
            <Badge
              key={subject.name}
              variant="secondary"
              className="text-sm md:text-base px-4 py-2 rounded-full cursor-pointer transition-all hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary"
            >
              <subject.icon className="w-4 h-4 mr-2" />
              {subject.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

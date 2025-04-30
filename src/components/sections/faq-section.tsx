import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What subjects does Tangled cover?',
    answer: 'Tangled covers a wide range of academic subjects including Computer Science, Psychology, AI, Business, Math, Physics, Language, History, Communication, and Design. We are continuously expanding our knowledge base.',
  },
  {
    question: 'Is Tangled free to use?',
    answer: 'Tangled offers both free and premium plans. The free plan allows a limited number of queries per month, while premium plans offer unlimited access, priority support, and advanced features.',
  },
  {
    question: 'How accurate are the AI answers?',
    answer: 'Our AI is trained on vast datasets and verified sources to provide highly accurate answers. However, it\'s always recommended to cross-reference critical information, especially for complex academic research.',
  },
  {
    question: 'Can Tangled help with homework assignments?',
    answer: 'Yes, Tangled can provide explanations, definitions, and guidance on homework problems. However, it is designed as a learning tool to help you understand concepts, not to provide direct answers for submission.',
  },
  {
     question: 'How does Tangled ensure data privacy?',
     answer: 'We take data privacy seriously. User queries are processed securely, and personal information is handled according to our strict Privacy Policy. We do not share your personal data with third parties without your consent.',
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-left font-medium text-lg hover:text-primary hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

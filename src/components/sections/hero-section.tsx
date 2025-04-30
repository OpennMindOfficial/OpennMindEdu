import { Button } from '@/components/ui/button';
import { ArrowRight, Bot } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full section-padding bg-gradient-to-b from-background to-background/80 overflow-hidden">
       {/* Optional subtle background elements */}
       <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
         {/* Digital Grid Example */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
              backgroundSize: `40px 40px`,
            }}
          ></div>
       </div>

      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold !leading-tight tracking-tighter mb-6">
            Best AI for <span className="text-primary">Education</span> Tech
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            Specially designed for students and college learners. The newest and most sophisticated platform that can educate people from all walks of life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Button size="lg" className="rounded-xl">
              Start Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              See Ability <Bot className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 3D Cube Placeholder */}
        <div className="lg:w-1/2 flex justify-center items-center perspective">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Simple CSS Cube Representation */}
            <div className="cube-container animate-spin-slow">
              <div className="cube">
                <div className="face front bg-primary/30 border border-primary/50 backdrop-blur-sm"></div>
                <div className="face back bg-secondary/30 border border-secondary/50 backdrop-blur-sm"></div>
                <div className="face right bg-accent/30 border border-accent/50 backdrop-blur-sm"></div>
                <div className="face left bg-muted/30 border border-muted/50 backdrop-blur-sm"></div>
                <div className="face top bg-card/30 border border-border/50 backdrop-blur-sm"></div>
                <div className="face bottom bg-popover/30 border border-ring/30 backdrop-blur-sm"></div>
              </div>
            </div>
            {/* Floating elements (optional) */}
            <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-accent/20 blur-2xl animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      {/* CSS for the cube */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .cube-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          transform: rotateX(-30deg) rotateY(-45deg);
        }
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: hsl(var(--foreground));
          opacity: 0.8;
        }
        .front  { transform: rotateY(  0deg) translateZ(calc(var(--cube-size) / 2)); }
        .back   { transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2)); }
        .right  { transform: rotateY( 90deg) translateZ(calc(var(--cube-size) / 2)); }
        .left   { transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2)); }
        .top    { transform: rotateX( 90deg) translateZ(calc(var(--cube-size) / 2)); }
        .bottom { transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2)); }

        @media (min-width: 768px) {
          .face { --cube-size: 20rem; } /* 320px */
        }
        @media (min-width: 1024px) {
           .face { --cube-size: 24rem; } /* 384px */
        }
        @media (max-width: 767px) {
           .face { --cube-size: 16rem; } /* 256px */
        }

        @keyframes spin-slow {
          from { transform: rotateX(-30deg) rotateY(-45deg); }
          to { transform: rotateX(-30deg) rotateY(315deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

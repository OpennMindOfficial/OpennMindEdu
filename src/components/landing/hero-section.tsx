'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, TrendingUp, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content: Text and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              The database for <span className="text-primary">modern applications</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Hurree centralizes data from your entire tech stack and database creating one clear view of performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button size="lg" variant="beige" className="text-base px-8 py-3 shadow-md hover:shadow-lg group">
                Start 14-day trial
                <span className="ml-2 p-1 border border-orange-300 dark:border-orange-600 rounded-full group-hover:bg-orange-200 dark:group-hover:bg-orange-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </motion.div>

          {/* Right Content: Illustration Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 shadow-xl overflow-hidden min-h-[400px]"
            style={{
              // Basic representation of squiggly lines
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 50 90 90 10 Q 50 90 10 90' stroke='%23FCA5A5' stroke-width='2' fill='none' opacity='0.2'/%3E%3Cpath d='M90 90 Q 50 10 10 90 Q 50 10 90 10' stroke='%23FCD34D' stroke-width='2' fill='none' opacity='0.2'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
            }}
          >
            <div className="relative z-10 space-y-4">
              {/* Spend Management Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-background/80 dark:bg-card/70 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <TrendingUp className="w-4 h-4 mr-1.5 text-green-500" />
                    Spend Management
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    $434 / 700 <span className="text-sm font-normal text-green-600 dark:text-green-400">(62.2%)</span>
                  </div>
                </div>
                <Switch defaultChecked={true} id="spend-management" />
              </motion.div>

              {/* Advanced Bot Protection Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-background/80 dark:bg-card/70 backdrop-blur-sm p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-start mb-2">
                  <UserCircle className="w-8 h-8 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Advanced bot protection</h4>
                    <p className="text-xs text-muted-foreground">Your data is secure from automated threats.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <Switch id="bot-protection" disabled />
                    <label htmlFor="bot-protection" className="ml-2 text-sm text-muted-foreground">Activate</label>
                  </div>
                  <Button variant="link" size="sm" className="text-primary hover:underline p-0 h-auto">
                    Learn more <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

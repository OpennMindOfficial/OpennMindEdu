
'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, ShieldCheck, Box, UserCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 leading-tight">
              The AI-Powered <span className="text-primary">Learning Platform</span> for Modern Students
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
              OpennMind centralizes your study materials, provides instant AI doubt-solving, and helps you track performance for academic success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button size="lg" className="text-base px-8 py-3">
                Start 14-day free trial
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-3 border-slate-300 dark:border-slate-700">
                View Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Illustration Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-700 shadow-2xl overflow-hidden min-h-[400px]"
          >
            {/* Abstract background shapes/lines */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                <defs>
                  <pattern id="wavyLines" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(45)">
                    <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="rgba(255, 165, 0, 0.3)" strokeWidth="2" fill="none"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wavyLines)" />
              </svg>
            </div>
            
            <div className="relative z-10 space-y-4">
              {/* Spend Management Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-lg flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-1">
                    <TrendingUp className="w-4 h-4 mr-1.5 text-green-500" />
                    Study Progress
                  </div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    $434 / 700 <span className="text-sm font-normal text-green-600 dark:text-green-400">(62.2%)</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Course Completion</p>
                </div>
                <Switch defaultChecked={true} id="spend-management" />
              </motion.div>

              {/* Advanced Bot Protection Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-start mb-2">
                  <UserCircle className="w-8 h-8 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">AI Doubt Solver</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Instant AI-powered assistance</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <Switch id="bot-protection" />
                    <label htmlFor="bot-protection" className="ml-2 text-sm text-slate-600 dark:text-slate-300">Activate Tutor</label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center">
                    Learn more <ArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mt-16 md:mt-24"
        >
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Box className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">All Your Tools in One Stack</h3>
              <p className="text-slate-600 dark:text-slate-400">
                From notes and mock exams to flashcards and planners, everything you need is integrated seamlessly.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Secure & Private Learning</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your data is protected. Focus on learning with peace of mind.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  TrendingUp,
  Target,
  Activity,
  BookOpen,
  CalendarDays,
  Filter,
  ChevronDown,
  Info,
  BarChart3,
  LineChart,
  GitFork,
  Award, // New icon for achievements
  Zap, // Already used, can be reused for streaks
  CheckCircle2, // New icon for completed tasks/milestones
  Brain, // New icon for subjects
  FlaskConical, // New icon for subjects
  BookMarked, // New icon for subjects
  ScrollText, // New icon for subjects
  ListChecks, // New icon for overview
  Trophy, // New icon for overview
} from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import React from 'react';
import Image from "next/image"; // Import Image for potential future use in cards

// Enhanced Overview Data
const overviewData = [
  { title: "Total Study Hours", value: "248.78 hrs", icon: BookOpen, color: "text-blue-500", bgColor: "bg-blue-500/10 dark:bg-blue-900/20" },
  { title: "Goal Completion", value: "72.5%", icon: Target, color: "text-green-500", bgColor: "bg-green-500/10 dark:bg-green-900/20" },
  { title: "Active Days Streak", value: "14 days", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-500/10 dark:bg-yellow-900/20" },
  { title: "Tasks Completed", value: "128", icon: ListChecks, color: "text-purple-500", bgColor: "bg-purple-500/10 dark:bg-purple-900/20" },
];


// Placeholder data for charts (remains the same structure)
const focusScoreData = {
  labels: ["Avg Study Session", "Avg Distraction Time", "Completion Rate", "Notes Taken", "Retention Rate"],
  datasets: [ { label: 'Your Score', data: [75, 20, 85, 60, 70] } ],
};
const dailyStudyProgressData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [ { label: "Hours Studied", data: [2, 3, 1.5, 4, 2.5, 5, 1] } ],
};
const studyVsBreakData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    { label: "Study Time (hrs)", data: [2, 3, 1.5, 4, 2.5, 5, 1], backgroundColor: "hsl(var(--primary))" },
    { label: "Break Time (hrs)", data: [0.5, 0.75, 0.25, 1, 0.5, 1.25, 0.25], backgroundColor: "hsl(var(--destructive))" },
  ],
};

// New data for Subject Performance
const subjectPerformanceData = [
  { subject: "Mathematics", icon: Brain, hours: "65.2 hrs", goal: "80%", retention: "72%", lastActive: "Today", color: "text-blue-500" },
  { subject: "Science", icon: FlaskConical, hours: "50.5 hrs", goal: "65%", retention: "60%", lastActive: "Yesterday", color: "text-green-500" },
  { subject: "History", icon: ScrollText, hours: "32.0 hrs", goal: "90%", retention: "85%", lastActive: "2 days ago", color: "text-orange-500" },
  { subject: "English Lit.", icon: BookMarked, hours: "40.8 hrs", goal: "70%", retention: "68%", lastActive: "Today", color: "text-purple-500" },
];

// New data for Recent Achievements
const recentAchievementsData = [
  { text: "Completed 'Calculus Fundamentals' module!", icon: Trophy, date: "May 12", color: "text-yellow-500" },
  { text: "Achieved a 7-day study streak! Keep it up!", icon: Zap, date: "May 11", color: "text-orange-500" },
  { text: "Mastered 50 new vocabulary words for English.", icon: Award, date: "May 10", color: "text-green-500" },
  { text: "Perfect score on Physics Quiz 3.", icon: CheckCircle2, date: "May 9", color: "text-blue-500" },
];


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};


export default function PerformanceTrackingPage() {
  const pageDescription = "Monitor your learning journey and track your progress.";
  const truncatedDescription = pageDescription.length > 20 ? pageDescription.substring(0, 20) + '...' : pageDescription;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/20 dark:bg-zinc-900/30">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Performance Insights</h1>
                <p className="text-sm text-muted-foreground">{truncatedDescription}</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="this-month">
                  <SelectTrigger className="w-[160px] h-9 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm rounded-lg hover:bg-muted/50 dark:hover:bg-zinc-700/50">
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm rounded-lg hover:scale-105 active:scale-95 hover:bg-muted/50 dark:hover:bg-zinc-700/50">
                  <Filter className="w-3.5 h-3.5 mr-1.5" /> Filters
                </Button>
              </div>
            </motion.div>

            {/* Overview Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {overviewData.map((item, index) => (
                <Card key={index} className={cn(
                    "bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1",
                    item.bgColor
                )}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                    <item.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", item.color)} />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-xl sm:text-2xl font-bold text-foreground">{item.value}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Charts Section & Recent Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
              {/* Your Focus Score (Radar Chart Placeholder) */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-base font-semibold text-foreground">Focus Score</CardTitle>
                    <Info className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[220px] sm:min-h-[250px]">
                    <div className="text-center text-muted-foreground">
                      <GitFork className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 opacity-40" />
                      <p className="text-xs sm:text-sm">Focus Score Radar Chart</p>
                      <p className="text-xs mt-1">(Data: {focusScoreData.labels.join(', ')})</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Daily Study Progress (Line Chart Placeholder) */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-base font-semibold text-foreground">Daily Study</CardTitle>
                    <Info className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[220px] sm:min-h-[250px]">
                     <div className="text-center text-muted-foreground">
                      <LineChart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 opacity-40" />
                      <p className="text-xs sm:text-sm">Daily Study Hours Line Chart</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Recent Achievements */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base font-semibold text-foreground">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-3 min-h-[220px] sm:min-h-[250px]">
                    {recentAchievementsData.slice(0, 3).map((achievement, index) => ( // Show top 3
                      <div key={index} className="flex items-start gap-3">
                        <achievement.icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", achievement.color)} />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-foreground/90">{achievement.text}</p>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                     {recentAchievementsData.length === 0 && <p className="text-xs text-muted-foreground text-center pt-8">No achievements yet. Keep studying!</p>}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Subject Performance Table */}
            <motion.div variants={itemVariants}>
              <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                  <CardTitle className="text-base font-semibold text-foreground">Subject Performance</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-primary hover:bg-muted/50 dark:hover:bg-zinc-700/50">
                    View All <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70"/>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b-border/20 dark:border-b-border/10">
                          <TableHead className="px-4 py-2 text-xs text-muted-foreground whitespace-nowrap">Subject</TableHead>
                          <TableHead className="px-4 py-2 text-xs text-muted-foreground whitespace-nowrap">Hours Studied</TableHead>
                          <TableHead className="px-4 py-2 text-xs text-muted-foreground whitespace-nowrap">Goal Progress</TableHead>
                          <TableHead className="px-4 py-2 text-xs text-muted-foreground whitespace-nowrap">Avg Retention</TableHead>
                          <TableHead className="px-4 py-2 text-xs text-muted-foreground text-right whitespace-nowrap">Last Active</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjectPerformanceData.map((item, index) => (
                          <TableRow key={index} className="border-b-border/10 dark:border-b-transparent last:border-b-0 hover:bg-muted/30 dark:hover:bg-zinc-700/40">
                            <TableCell className="px-4 py-3 font-medium text-sm text-foreground flex items-center gap-2 whitespace-nowrap">
                              <item.icon className={cn("w-4 h-4", item.color)} />
                              {item.subject}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground/90 whitespace-nowrap">{item.hours}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground/90 whitespace-nowrap">{item.goal}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground/90 whitespace-nowrap">{item.retention}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-muted-foreground text-right whitespace-nowrap">{item.lastActive}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

             {/* Study vs Break Time (Bar Chart Placeholder) & Calendar (Can be a future addition) */}
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5">
                <motion.div variants={itemVariants} className="lg:col-span-3">
                    <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                            <CardTitle className="text-base font-semibold text-foreground">Study vs Break Ratio</CardTitle>
                            <Info className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
                        </CardHeader>
                        <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[220px] sm:min-h-[250px]">
                            <div className="text-center text-muted-foreground">
                                <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 opacity-40" />
                                <p className="text-xs sm:text-sm">Study vs Break Time Bar Chart</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                        <CardTitle className="text-base font-semibold text-foreground">Study Calendar</CardTitle>
                         <Select defaultValue="current-month">
                            <SelectTrigger className="w-auto h-8 text-xs bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 text-muted-foreground hover:text-primary">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="current-month">This Month</SelectItem>
                                <SelectItem value="last-month">Last Month</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[220px] sm:min-h-[250px]">
                        <div className="text-center text-muted-foreground">
                            <CalendarDays className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 opacity-40" />
                            <p className="text-xs sm:text-sm">Monthly Study Session Calendar</p>
                            <p className="text-xs mt-1">(e.g., Jan 15 - 2 sessions, 3.5 hrs)</p>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
            </div>
            
          </motion.div>
           <div className="h-8"></div> {/* Add some bottom padding */}
        </main>
      </div>
    </div>
  );
}


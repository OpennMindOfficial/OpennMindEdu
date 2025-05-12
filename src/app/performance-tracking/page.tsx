'use client';

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Target, Activity, BookOpen, CalendarDays, Filter, ChevronDown, Info, BarChart3, LineChart, GitFork } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import React from 'react';

// Placeholder data
const overviewData = [
  { title: "Total Study Hours", value: "248.78 hrs", icon: BookOpen, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { title: "Goal Progress", value: "54.65%", icon: Target, color: "text-green-500", bgColor: "bg-green-500/10" },
  { title: "Focus Factor", value: "1.24", icon: Activity, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { title: "Avg Daily Retention", value: "39.90%", icon: TrendingUp, color: "text-purple-500", bgColor: "bg-purple-500/10" },
];

const focusScoreData = {
  labels: ["Avg Study Session", "Avg Distraction Time", "Completion Rate", "Notes Taken", "Retention Rate"],
  datasets: [
    {
      label: 'Your Score',
      data: [75, 20, 85, 60, 70], // Example percentages or values
      // Styling for a radar chart would go here
    },
  ],
};

const openTopicsData = [
  { subject: "Mathematics", topic: "Calculus I", progress: "75%", lastStudied: "2 days ago" },
  { subject: "Science", topic: "Photosynthesis", progress: "40%", lastStudied: "Yesterday" },
  { subject: "History", topic: "World War II", progress: "90%", lastStudied: "Today" },
  { subject: "English", topic: "Shakespearean Sonnets", progress: "60%", lastStudied: "3 days ago" },
];

const dailyStudyProgressData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Last 7 days
  datasets: [
    {
      label: "Hours Studied",
      data: [2, 3, 1.5, 4, 2.5, 5, 1], // Example hours
    },
  ],
};

const studyVsBreakData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Study Time (hrs)",
      data: [2, 3, 1.5, 4, 2.5, 5, 1],
      backgroundColor: "hsl(var(--primary))",
    },
    {
      label: "Break Time (hrs)",
      data: [0.5, 0.75, 0.25, 1, 0.5, 1.25, 0.25],
      backgroundColor: "hsl(var(--destructive))",
    },
  ],
};


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};


export default function PerformanceTrackingPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/30 dark:bg-muted/10">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Performance</h1>
                <p className="text-sm text-muted-foreground">Track your study habits and progress.</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="this-month">
                  <SelectTrigger className="w-[160px] h-9 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm rounded-lg">
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
                <Button variant="outline" size="sm" className="h-9 text-xs bg-card dark:bg-zinc-800 border-border/30 shadow-sm rounded-lg hover:scale-105 active:scale-95">
                  <Filter className="w-3.5 h-3.5 mr-1.5" /> Filters
                </Button>
              </div>
            </motion.div>

            {/* Overview Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {overviewData.map((item, index) => (
                <Card key={index} className={cn("bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1", item.bgColor)}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                    <item.icon className={cn("h-5 w-5", item.color)} />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-foreground">{item.value}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Your Focus Score (Radar Chart Placeholder) */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-base font-semibold text-foreground">Your Focus Score</CardTitle>
                    <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[250px]">
                    {/* Placeholder for Radar Chart */}
                    <div className="text-center text-muted-foreground">
                      <GitFork className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Radar Chart for Focus Score</p>
                      <p className="text-xs mt-1">(Data: {focusScoreData.labels.join(', ')})</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Daily Study Progress (Line Chart Placeholder) */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-base font-semibold text-foreground">Daily Study Progress</CardTitle>
                    <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[250px]">
                    {/* Placeholder for Line Chart */}
                     <div className="text-center text-muted-foreground">
                      <LineChart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Line Chart for Daily Study Hours</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Study vs Break Time (Bar Chart Placeholder) & Open Topics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                            <CardTitle className="text-base font-semibold text-foreground">Study vs Break Time</CardTitle>
                            <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </CardHeader>
                        <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[250px]">
                            {/* Placeholder for Bar Chart */}
                            <div className="text-center text-muted-foreground">
                                <BarChart3 className="w-16 h-16 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Bar Chart for Study vs Break Time</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                {/* Calendar Placeholder */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                        <CardTitle className="text-base font-semibold text-foreground">Study Sessions - January</CardTitle>
                         <Select defaultValue="january">
                            <SelectTrigger className="w-auto h-8 text-xs bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="january">January</SelectItem>
                                <SelectItem value="february">February</SelectItem>
                                {/* Add other months */}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex items-center justify-center min-h-[250px]">
                        {/* Placeholder for Calendar */}
                        <div className="text-center text-muted-foreground">
                        <CalendarDays className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Calendar View of Study Sessions</p>
                        <p className="text-xs mt-1">(Example: Jan 15 - 2 sessions, 3.5 hrs)</p>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
            </div>
            
            {/* Open Topics List */}
            <motion.div variants={itemVariants}>
              <Card className="bg-card dark:bg-card/80 border-0 rounded-xl shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                  <CardTitle className="text-base font-semibold text-foreground">Open Topics</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-primary">
                    View All <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70"/>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-border/20">
                        <TableHead className="px-4 py-2 text-xs text-muted-foreground">Subject</TableHead>
                        <TableHead className="px-4 py-2 text-xs text-muted-foreground">Topic</TableHead>
                        <TableHead className="px-4 py-2 text-xs text-muted-foreground">Progress</TableHead>
                        <TableHead className="px-4 py-2 text-xs text-muted-foreground text-right">Last Studied</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {openTopicsData.map((topic, index) => (
                        <TableRow key={index} className="border-b-border/10 last:border-b-0 hover:bg-muted/30 dark:hover:bg-muted/20">
                          <TableCell className="px-4 py-3 font-medium text-sm text-foreground">{topic.subject}</TableCell>
                          <TableCell className="px-4 py-3 text-sm text-foreground/90">{topic.topic}</TableCell>
                          <TableCell className="px-4 py-3 text-sm text-foreground/90">{topic.progress}</TableCell>
                          <TableCell className="px-4 py-3 text-sm text-muted-foreground text-right">{topic.lastStudied}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
            
          </motion.div>
        </main>
      </div>
    </div>
  );
}


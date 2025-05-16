
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Trash2, ListChecks } from "lucide-react";
import { cn } from '@/lib/utils';
import { gsap } from 'gsap'; // Import GSAP

interface StudyTask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number; // for sorting
}

export default function StudyPlanPage() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [mounted, setMounted] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const addTaskCardRef = useRef<HTMLDivElement>(null);
  const currentTasksCardRef = useRef<HTMLDivElement>(null);
  const taskListRef = useRef<HTMLUListElement>(null); // For staggering list items

  // Load tasks from localStorage on mount
  useEffect(() => {
    setMounted(true); // Ensure this runs only on client
    try {
      const storedTasks = localStorage.getItem('studyTasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to parse study tasks from localStorage", error);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (mounted) { 
      localStorage.setItem('studyTasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  useEffect(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});

    tl.fromTo(titleRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(addTaskCardRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.3")
      .fromTo(currentTasksCardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
      
    // Animate task items when tasks array changes
    if (taskListRef.current) {
      const taskItems = taskListRef.current.querySelectorAll('li');
      if (taskItems.length > 0) {
        gsap.fromTo(taskItems, 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "easeOut" }
        );
      }
    }
  }, [tasks, mounted]); // Re-run list item animation when tasks change

  const handleAddTask = () => {
    if (newTaskInput.trim() === '') return;
    const newTask: StudyTask = {
      id: Date.now().toString(),
      text: newTaskInput.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]); 
    setNewTaskInput('');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRemoveTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Sort tasks: incomplete first, then by newest createdAt
  const sortedTasks = React.useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) {
        return b.createdAt - a.createdAt; 
      }
      return a.completed ? 1 : -1; 
    });
  }, [tasks]);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main ref={pageRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-muted/30 dark:bg-zinc-900/50">
          <div
            ref={titleRef}
            className="flex items-center gap-3"
          >
            <ListChecks className="w-7 h-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              My Study Plan
            </h1>
          </div>

          <div ref={addTaskCardRef}>
            <Card className="bg-card/90 dark:bg-card/80 border border-border/20 rounded-xl shadow-lg backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-foreground">Add a New Study Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="E.g., Review Chapter 3 of Mathematics"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddTask();
                      }
                    }}
                    className="bg-background/80 dark:bg-input/70 rounded-lg shadow-sm"
                  />
                  <Button onClick={handleAddTask} className="hover:scale-105 active:scale-95 shrink-0 rounded-lg">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div ref={currentTasksCardRef}>
            <Card className="bg-card/90 dark:bg-card/80 border border-border/20 rounded-xl shadow-lg backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Current Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                {mounted && tasks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Your study plan is empty. Add some tasks to get started!
                  </p>
                ) : (
                  <ScrollArea className="h-[calc(100vh-500px)] pr-3 -mr-3"> {/* Adjusted height */}
                    <ul ref={taskListRef} className="space-y-3">
                      {sortedTasks.map((task) => (
                        <li
                          key={task.id}
                          // layout // Framer Motion prop removed
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg transition-colors duration-200",
                            task.completed ? "bg-green-500/10 dark:bg-green-700/20" : "bg-muted/40 dark:bg-zinc-800/50 hover:bg-muted/60 dark:hover:bg-zinc-800/70"
                          )}
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <Checkbox
                              id={`task-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() => handleToggleTask(task.id)}
                              aria-labelledby={`task-label-${task.id}`}
                              className={cn(
                                "transition-all flex-shrink-0",
                                task.completed ? "border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:border-green-500 dark:data-[state=checked]:bg-green-500" : "border-primary"
                              )}
                            />
                            <label
                              id={`task-label-${task.id}`}
                              htmlFor={`task-${task.id}`}
                              className={cn(
                                "text-sm font-medium cursor-pointer truncate",
                                task.completed ? "line-through text-muted-foreground dark:text-gray-500" : "text-foreground"
                              )}
                            >
                              {task.text}
                            </label>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTask(task.id)}
                            className="text-muted-foreground hover:text-destructive h-7 w-7 hover:bg-destructive/10 rounded-full flex-shrink-0"
                            aria-label="Remove task"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

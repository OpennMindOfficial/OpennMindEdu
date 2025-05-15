'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Please fill in all fields.",
      });
      return;
    }
    // Simulate successful signup
    console.log("Simulating signup for:", name, email);
    // In a real app, you'd register the user and then log them in
    if (typeof window !== "undefined") {
        localStorage.setItem('isAuthenticated', 'true'); // Auto-login after signup for demo
    }
    toast({
      title: "Signup Successful!",
      description: "Welcome to OpennMind!",
    });
    router.push('/'); // Redirect to homepage
  };

  // Redirect to home if already authenticated
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem('isAuthenticated') === 'true') {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <Card className="border-border/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Create an account to get started with OpennMind.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background dark:bg-input rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background dark:bg-input rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background dark:bg-input rounded-lg"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                 <Button variant="outline" className="w-full" type="button" onClick={() => toast({ title: "Coming Soon!", description: "Google signup will be available soon."})}>
                    Sign up with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

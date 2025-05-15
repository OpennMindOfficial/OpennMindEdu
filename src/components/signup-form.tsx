
'use client';

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
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

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSignupSuccess?: (name: string) => void; // Updated to accept name
  onSwitchToLogin?: () => void; 
}

export function SignupForm({ className, onSignupSuccess, onSwitchToLogin, ...props }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

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
    if (onSignupSuccess) {
      onSignupSuccess(name); // Pass the entered name
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background dark:bg-input rounded-lg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background dark:bg-input rounded-lg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
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
              <Button 
                type="button" 
                variant="link" 
                onClick={onSwitchToLogin} 
                className="underline underline-offset-4 h-auto p-0 text-sm"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

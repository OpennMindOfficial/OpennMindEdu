
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
// Link import removed as it's handled by a button click now

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoginSuccess?: () => void;
  onSwitchToSignup?: () => void; // Callback to switch to signup view
}

export function LoginForm({ className, onLoginSuccess, onSwitchToSignup, ...props }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please enter both email and password.",
      });
      return;
    }
    // Simulate successful login
    console.log("Simulating login for:", email);
    if (onLoginSuccess) {
      onLoginSuccess();
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline h-auto p-0"
                    onClick={() => toast({ title: "Feature Coming Soon", description: "Password recovery will be available soon."})}
                  >
                    Forgot your password?
                  </Button>
                </div>
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
                Login
              </Button>
              <Button variant="outline" className="w-full" type="button" onClick={() => toast({ title: "Coming Soon!", description: "Google login will be available soon."})}>
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Button 
                type="button" 
                variant="link" 
                onClick={onSwitchToSignup} 
                className="underline underline-offset-4 h-auto p-0 text-sm"
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

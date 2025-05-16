
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Corrected import
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Settings,
  Upload,
  User,
  Lock,
  Trash2,
  PlusCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Separator } from '@/components/ui/separator'; // Import Separator
import { cn } from '@/lib/utils';
import { gsap } from 'gsap'; // Import GSAP

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null); // Use placeholder or initial data
  const [firstName, setFirstName] = useState("Bryan"); // Demo Data
  const [lastName, setLastName] = useState("Cranston"); // Demo Data
  const [email, setEmail] = useState("bryan.cranston@example.com"); // Demo Data
  const [currentPassword, setCurrentPassword] = useState("**********"); // Use placeholder for security
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { toast } = useToast();

  const pageRef = useRef<HTMLDivElement>(null);
  const titleSectionRef = useRef<HTMLDivElement>(null);
  const accountCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});

    tl.fromTo(titleSectionRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(accountCardRef.current, { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.3");
  }, []);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Add size validation if needed (e.g., 15MB limit from image)
    const maxSizeInBytes = 15 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
        toast({
            variant: 'destructive',
            title: 'Image Too Large',
            description: `Please upload an image smaller than ${maxSizeInBytes / 1024 / 1024}MB.`,
        });
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setProfileImage(null); // Or replace with default image logic
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { firstName, lastName, email, newPassword: newPassword ? '******' : '' }); // Don't log passwords
    toast({
      title: "Settings Updated",
      description: "Your account information has been successfully updated.",
    });
    // Add actual submission logic (API call)
    setNewPassword(""); // Clear new password field after submission
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main
          ref={pageRef}
          className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 space-y-6 bg-muted/30 dark:bg-muted/10" 
        >
          {/* Use max-w-4xl or similar for wider content area */}
          <div className="max-w-4xl mx-auto">
             {/* Header */}
             <div ref={titleSectionRef} className="flex items-center space-x-2 mb-6">
               <Settings className="w-6 h-6 text-muted-foreground" />
               <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
             </div>

             {/* Account Card */}
             <div ref={accountCardRef}>
              <Card className="bg-card border border-border/20 rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Account</CardTitle>
                    <CardDescription>Real-time information and activities of your property.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/20 pb-6">
                          <div className="flex items-center space-x-4">
                              <Avatar className="w-16 h-16">
                                {profileImage ? (
                                  <AvatarImage src={profileImage} alt="Profile Preview" className="object-cover" />
                                ) : (
                                  <AvatarFallback className="bg-muted text-muted-foreground">
                                    <User size={32} />
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                  <p className="text-sm font-medium text-foreground">Profile picture</p>
                                  <p className="text-xs text-muted-foreground">PNG, JPEG under 15MB</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                              <Input
                                type="file"
                                id="profile-image-upload"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                              <Button variant="outline" size="sm" asChild className="hover:scale-105 active:scale-95">
                                <label htmlFor="profile-image-upload" className="cursor-pointer">
                                  <Upload className="w-3 h-3 mr-1.5" />
                                  <span>Upload new picture</span>
                                </label>
                              </Button>
                              <Button variant="ghost" size="sm" onClick={handleDeleteImage} className="text-destructive hover:bg-destructive/10 hover:scale-105 active:scale-95">
                                <Trash2 className="w-3 h-3 mr-1.5" />
                                Delete
                              </Button>
                          </div>
                        </div>

                        {/* Full Name Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-b border-border/20 pb-6">
                          <div>
                            <Label htmlFor="first-name" className="block text-sm font-medium mb-1">First name</Label>
                            <Input
                              type="text"
                              id="first-name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="bg-background dark:bg-input rounded-lg shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="last-name" className="block text-sm font-medium mb-1">Last name</Label>
                            <Input
                              type="text"
                              id="last-name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="bg-background dark:bg-input rounded-lg shadow-sm"
                            />
                          </div>
                        </div>

                        {/* Contact Email Section */}
                        <div className="border-b border-border/20 pb-6 space-y-4">
                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium mb-1">Contact email</Label>
                                <p className="text-xs text-muted-foreground mb-2">Manage your account's email address for the invoices.</p>
                                <Input
                                  type="email"
                                  id="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="bg-background dark:bg-input rounded-lg shadow-sm"
                                />
                            </div>
                            <Button variant="outline" size="sm" className="hover:scale-105 active:scale-95">
                                <PlusCircle className="w-4 h-4 mr-1.5" />
                                Add another email
                            </Button>
                        </div>

                        {/* Password Section */}
                        <div className="border-b border-border/20 pb-6 space-y-4">
                              <div>
                                <Label className="block text-sm font-medium mb-1">Password</Label>
                                <p className="text-xs text-muted-foreground mb-2">Modify your current password.</p>
                              </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <Label htmlFor="current-password" className="block text-sm font-medium mb-1">Current password</Label>
                                    <div className="relative">
                                        <Input
                                          type={showCurrentPassword ? "text" : "password"}
                                          id="current-password"
                                          placeholder="Enter current password" 
                                          className="bg-background dark:bg-input rounded-lg shadow-sm pr-10" 
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute inset-y-0 right-0 h-full w-10 text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                        >
                                            {showCurrentPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="new-password" className="block text-sm font-medium mb-1">New password</Label>
                                    <div className="relative">
                                        <Input
                                          type={showNewPassword ? "text" : "password"}
                                          id="new-password"
                                          value={newPassword}
                                          onChange={(e) => setNewPassword(e.target.value)}
                                          placeholder="Enter new password"
                                          className="bg-background dark:bg-input rounded-lg shadow-sm pr-10" 
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute inset-y-0 right-0 h-full w-10 text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                                        >
                                            {showNewPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters.</p>
                                </div>
                            </div>
                        </div>

                        {/* Integrated Account Section - Placeholder */}
                        <div className="space-y-4">
                              <div>
                                <Label className="block text-sm font-medium mb-1">Integrated account</Label>
                                <p className="text-xs text-muted-foreground mb-2">Manage your current integrated accounts.</p>
                              </div>
                              {/* Example Google Analytics Integration */}
                              <div className="flex items-center justify-between p-3 border border-border/20 rounded-lg bg-muted/30 dark:bg-muted/20">
                                <div className="flex items-center space-x-3">
                                    {/* Placeholder Icon */}
                                    <div className="w-8 h-8 bg-orange-200 dark:bg-orange-800 rounded-md flex items-center justify-center">
                                      {/* Simple Analytics-like icon */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600 dark:text-orange-300"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-foreground">Google analytics</p>
                                      <p className="text-xs text-muted-foreground">Navigate the Google Analytics interface and reports.</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-green-600 text-green-700 bg-green-100/50 hover:bg-green-100 dark:border-green-500 dark:text-green-400 dark:bg-green-900/30 dark:hover:bg-green-900/50 hover:scale-105 active:scale-95">
                                    Connected
                                </Button>
                              </div>
                              {/* Example Google Account Integration */}
                              <div className="flex items-center justify-between p-3 border border-border/20 rounded-lg bg-muted/30 dark:bg-muted/20">
                                <div className="flex items-center space-x-3">
                                    {/* Placeholder Icon */}
                                    <div className="w-8 h-8 bg-blue-200 dark:bg-blue-800 rounded-md flex items-center justify-center">
                                        {/* Simple Google G */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-blue-600 dark:text-blue-300" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                                        </svg>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-foreground">Google account</p>
                                      <p className="text-xs text-muted-foreground">Manage Google integrations.</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-green-600 text-green-700 bg-green-100/50 hover:bg-green-100 dark:border-green-500 dark:text-green-400 dark:bg-green-900/30 dark:hover:bg-green-900/50 hover:scale-105 active:scale-95">
                                    Connected
                                </Button>
                              </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6">
                            <Button type="submit" className="hover:scale-105 active:scale-95">
                              Save Changes
                            </Button>
                        </div>
                    </form>
                  </CardContent>
              </Card>
             </div>

          </div> {/* End max-w container */}
        </main>
      </div>
    </div>
  );
}

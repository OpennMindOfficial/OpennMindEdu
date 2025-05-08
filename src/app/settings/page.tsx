'use client';

import React, { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Settings,
  Upload,
  Mail,
  User,
  Lock,
  Calendar,
  Phone,
} from "lucide-react";
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("John Doe"); // Demo Data
  const [email, setEmail] = useState("john.doe@example.com"); // Demo Data
  const [phone, setPhone] = useState("123-456-7890"); // Demo Data
  const [dob, setDob] = useState("01/01/1990"); // Demo Data
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, phone, dob, password });
    toast({
      title: "Settings Updated",
      description: "Your settings have been successfully updated.",
    });
    // Add actual submission logic (API call)
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <motion.main
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2">
             <Settings className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Account Settings</h1>
          </div>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Picture */}
                <div>
                  <Label htmlFor="profile-image" className="block text-sm font-medium">Profile Picture</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      {profileImage ? (
                        <AvatarImage src={profileImage} alt="Profile Preview" className="object-cover" />
                      ) : (
                        <AvatarFallback><User size={24} /></AvatarFallback>
                      )}
                    </Avatar>
                    <Input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button variant="secondary" asChild>
                      <label htmlFor="profile-image" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        <span>Upload New Image</span>
                      </label>
                    </Button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 bg-background dark:bg-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-background dark:bg-input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 bg-background dark:bg-input"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <Label htmlFor="dob" className="block text-sm font-medium">Date of Birth</Label>
                  <Input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="mt-1 bg-background dark:bg-input"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium">New Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 bg-background dark:bg-input"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Leave blank to keep current password.</p>
                </div>

                <Button type="submit" className="hover:scale-105 active:scale-95">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

        </motion.main>
      </div>
    </div>
  );
}

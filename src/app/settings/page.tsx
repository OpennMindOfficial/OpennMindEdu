
'use client'; // Add use client for motion

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion'; // Import motion

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <motion.h1
            className="text-3xl font-bold text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Account Settings
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl"> {/* Apply styling */}
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Customize Your Experience</CardTitle> {/* Adjust text color */}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground"> {/* Adjust text color */}
                  Manage your account settings, change your password, update your
                  profile information, and customize your preferences.
                </p>
                 {/* Add placeholder settings options */}
                 <div className="mt-4 space-y-4">
                   <div>
                     <h4 className="font-semibold text-foreground mb-1">Profile</h4>
                     <p className="text-sm text-muted-foreground">Update your name, email, etc.</p>
                     {/* Add form elements or links here */}
                   </div>
                   <div>
                     <h4 className="font-semibold text-foreground mb-1">Password</h4>
                     <p className="text-sm text-muted-foreground">Change your account password.</p>
                     {/* Add form elements or links here */}
                   </div>
                   <div>
                     <h4 className="font-semibold text-foreground mb-1">Preferences</h4>
                     <p className="text-sm text-muted-foreground">Customize notification settings.</p>
                     {/* Add form elements or links here */}
                   </div>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

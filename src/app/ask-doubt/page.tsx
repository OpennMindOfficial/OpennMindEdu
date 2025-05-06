import React from 'react';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AskDoubtPage = () => {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Ask Doubt</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Got a question? Ask here!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This page is under construction. Come back soon for an AI powered solution.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AskDoubtPage;

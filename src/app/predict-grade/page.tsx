import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PredictGradePage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Predict Grade</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Predict Your Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enter your current scores and predict your final grade. Use this
                tool to set realistic expectations and stay motivated.
              </p>
              {/* Example input fields */}
              <div className="mt-4">
                <h4 className="font-semibold">Enter Your Scores</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Midterm Exam Score</label>
                    <Input type="number" placeholder="Enter Score" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Homework Average</label>
                    <Input type="number" placeholder="Enter Average" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Project Score</label>
                    <Input type="number" placeholder="Enter Score" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Final Exam Weight (%)</label>
                    <Input type="number" placeholder="Enter Weight" />
                  </div>
                </div>
                <Button className="mt-4">Predict Grade</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PerformanceTrackingPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Performance Tracking</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Track Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor your performance over time. View your progress, identify
                strengths and weaknesses, and stay on track with your goals.
              </p>
              {/* Example tracking data */}
              <div className="mt-4">
                <h4 className="font-semibold">Recent Performance</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Mathematics: Mock Exam 1 - 85%</li>
                  <li>Science: Chapter Test - 78%</li>
                  <li>English: Essay Writing - 92%</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

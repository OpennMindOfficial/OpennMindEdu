import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TimedExamsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Timed Exams</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Improve Timing with Timed Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Practice completing exams within a set time limit. Improve your
                speed, accuracy, and time management skills.
              </p>
              {/* Example exam options */}
              <div className="mt-4">
                <h4 className="font-semibold">Available Timed Exams</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Mathematics: Chapter 1 - 30 minutes</li>
                  <li>Science: Chemistry - 45 minutes</li>
                  <li>English: Essay Writing - 60 minutes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

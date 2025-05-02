import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ExamModePage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Exam Mode</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Simulate Exam Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Practice under realistic exam conditions. Set a timer, avoid
                distractions, and see how well you perform under pressure.
              </p>
              {/* Example configuration options */}
              <div className="mt-4">
                <h4 className="font-semibold">Configure Your Exam</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Set Exam Duration</li>
                  <li>Choose Subject and Topics</li>
                  <li>Disable External Resources</li>
                </ul>
                <Button className="mt-4">Start Exam</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

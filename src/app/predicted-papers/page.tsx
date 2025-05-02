import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PredictedPapersPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Predicted Papers</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Access Predicted Papers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Review predicted papers to prepare for your exams effectively.
                These papers cover important topics and potential questions.
              </p>
              {/* Example papers list */}
              <div className="mt-4">
                <h4 className="font-semibold">Available Predicted Papers</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Mathematics: Final Exam - 2024</li>
                  <li>Science: Board Exam - 2024</li>
                  <li>English: Literature - 2024</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

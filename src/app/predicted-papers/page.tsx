
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
          <Card>
            <CardHeader>
              <CardTitle>Access Predicted Papers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Review predicted papers to prepare for your exams effectively.
                These papers cover important topics and potential questions.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

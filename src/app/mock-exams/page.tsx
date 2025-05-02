
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MockExamsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Mock Exams</h1>
          <Card>
            <CardHeader>
              <CardTitle>Prepare with Mock Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Take mock exams to assess your knowledge and prepare for upcoming
                tests. Get detailed feedback on your performance.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

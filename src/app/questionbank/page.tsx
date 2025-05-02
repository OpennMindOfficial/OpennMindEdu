import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function QuestionBankPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Questionbank</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Explore the Question Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access a vast question bank to practice and master various
                concepts. Filter by topic, difficulty, and more.
              </p>
              {/* Example filters */}
              <div className="mt-4">
                <h4 className="font-semibold">Filter Questions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Topic</label>
                    <Input type="text" placeholder="Enter Topic" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Difficulty</label>
                    <Input type="text" placeholder="Enter Difficulty" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

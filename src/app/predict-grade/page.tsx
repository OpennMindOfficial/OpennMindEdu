
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PredictGradePage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Predict Grade</h1>
          <Card>
            <CardHeader>
              <CardTitle>Predict Your Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Enter your current scores and predict your final grade. Use this
                tool to set realistic expectations and stay motivated.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

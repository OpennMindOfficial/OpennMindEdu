
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NcertExplanationsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">NCERT Explanations</h1>
          <Card>
            <CardHeader>
              <CardTitle>Understand NCERT Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Access detailed explanations for NCERT textbooks to strengthen
                your understanding of fundamental concepts.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

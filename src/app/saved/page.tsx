
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SavedPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Saved</h1>
          <Card>
            <CardHeader>
              <CardTitle>Access Your Saved Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Find all your saved notes, questions, and resources in one
                convenient location. Stay organized and never lose track of
                important information.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

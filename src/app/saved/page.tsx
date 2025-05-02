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
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Access Your Saved Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Find all your saved notes, questions, and resources in one
                convenient location. Stay organized and never lose track of
                important information.
              </p>
              {/* Example saved items */}
              <div className="mt-4">
                <h4 className="font-semibold">Your Saved Items</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Mathematics: Chapter 1 Notes</li>
                  <li>Science: Question on Chemical Reactions</li>
                  <li>English: Essay Example</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

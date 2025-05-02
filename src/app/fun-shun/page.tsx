import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FunShunPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Fun Shun</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Take a Break and Have Fun</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enjoy some light-hearted content and fun activities to refresh
                your mind. It's important to take breaks and recharge.
              </p>
              {/* Example fun activities */}
              <div className="mt-4">
                <h4 className="font-semibold">Suggested Activities</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Play a Quick Puzzle Game</li>
                  <li>Watch Funny Video Clips</li>
                  <li>Listen to Relaxing Music</li>
                  <li>Read Jokes and Riddles</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

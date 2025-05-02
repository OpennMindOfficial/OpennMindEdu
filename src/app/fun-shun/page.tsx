
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
          <Card>
            <CardHeader>
              <CardTitle>Take a Break and Have Fun</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Enjoy some light-hearted content and fun activities to refresh
                your mind. It's important to take breaks and recharge.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}


import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExtraCoursesPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Extra Courses</h1>
          <Card>
            <CardHeader>
              <CardTitle>Explore Additional Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Discover extra courses to expand your knowledge beyond the
                regular curriculum. Learn new skills and explore your interests.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

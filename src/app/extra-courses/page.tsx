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
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Explore Additional Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discover extra courses to expand your knowledge beyond the
                regular curriculum. Learn new skills and explore your interests.
              </p>
              {/* Example courses list */}
              <div className="mt-4">
                <h4 className="font-semibold">Featured Courses</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Web Development Fundamentals</li>
                  <li>Introduction to Data Science</li>
                  <li>Creative Writing Workshop</li>
                  <li>Foreign Language Studies (Spanish, French, German)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

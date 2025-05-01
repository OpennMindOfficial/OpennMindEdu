
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function FunShunPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Fun Shun</h1>
          <p className="text-muted-foreground">Fun Shun content will go here.</p>
          {/* Placeholder content */}
        </main>
      </div>
    </div>
  );
}

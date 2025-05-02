
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Chat With AI</h1>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to the AI Chat!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Start a conversation with our AI assistant to get help with your
                studies. Ask questions, brainstorm ideas, or get explanations on
                difficult topics.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

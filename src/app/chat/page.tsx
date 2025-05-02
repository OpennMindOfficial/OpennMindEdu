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
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Welcome to the AI Chat!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Start a conversation with our AI assistant to get help with your
                studies. Ask questions, brainstorm ideas, or get explanations on
                difficult topics.
              </p>
              {/* Example conversation */}
              <div className="mt-4">
                <div className="mb-2">
                  <span className="font-semibold">You:</span> What are the main causes of World War II?
                </div>
                <div className="mb-2">
                  <span className="font-semibold">AI:</span> World War II was primarily caused by the Treaty of Versailles, the rise of fascism and militarism, and the failure of appeasement policies.
                </div>
                <div>
                  <span className="font-semibold">You:</span> Explain the concept of supply and demand.
                </div>
                <div>
                  <span className="font-semibold">AI:</span> Supply and demand is an economic model describing the effect of price on the quantity of a product available and desired by consumers.
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PdfToNotesPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">PDF To Notes</h1>
          <Card className="bg-muted/50 dark:bg-card/80 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Convert PDFs to Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload a PDF document and automatically convert it into editable
                notes. Summarize key points, extract information, and more.
              </p>
              {/* Example usage instructions */}
              <div className="mt-4">
                <h4 className="font-semibold">How to Convert PDF to Notes</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Upload your PDF file.</li>
                  <li>Wait for the conversion process to complete.</li>
                  <li>Review and edit the extracted notes.</li>
                </ul>
                <Button>Upload PDF</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

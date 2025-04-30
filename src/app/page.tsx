import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight, Bookmark } from "lucide-react";

const subjects = [
  {
    title: "Information Technology",
    imageUrl: "https://picsum.photos/seed/infotech/300/200",
  },
  {
    title: "English Language & Literature",
    imageUrl: "https://picsum.photos/seed/englishlit/300/200",
  },
  {
    title: "Social Science",
    imageUrl: "https://picsum.photos/seed/socialsci/300/200",
  },
  {
    title: "English Communicative",
    imageUrl: "https://picsum.photos/seed/englishcomm/300/200",
  },
  {
    title: "Mathematics",
    imageUrl: "https://picsum.photos/seed/math/300/200",
  },
  {
    title: "Science",
    imageUrl: "https://picsum.photos/seed/science/300/200",
  },
];

export default function Home() {
  // In a real app, user name would come from auth context or props
  const userName = "Rudransh";

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background"> {/* Ensure main area has background */}
          <h1 className="text-3xl font-bold text-foreground">Good morning, {userName}</h1>

          <div className="space-y-4">
             <div className="flex justify-between items-center">
               <div className="flex items-center space-x-2 cursor-pointer group">
                 <Bookmark className="w-5 h-5 text-primary" />
                 <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">My subjects</h2>
                 <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="flex items-center space-x-4 text-sm">
                  {/* Matched ghost variant and text color */}
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Change subjects</Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Browse all</Button>
               </div>
            </div>

            <div className="relative">
               <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 pb-4"> {/* Added pb-4 for scrollbar space */}
                  {subjects.map((subject, index) => (
                    <SubjectCard
                      key={index}
                      title={subject.title}
                      imageUrl={subject.imageUrl}
                      className="w-[200px] md:w-[220px] flex-shrink-0" // Adjusted width slightly
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-2" />
              </ScrollArea>
               {/* Add functional navigation arrows if needed */}
               {/* <Button variant="outline" size="icon" className="absolute left-[-10px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card hover:bg-muted z-10">
                 <ChevronLeft className="h-4 w-4" />
               </Button>
               <Button variant="outline" size="icon" className="absolute right-[-10px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card hover:bg-muted z-10">
                 <ChevronRight className="h-4 w-4" />
               </Button> */}
             </div>
          </div>

          {/* Bottom promotional banner - Matched styling */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-primary-foreground p-4 rounded-lg text-center mt-auto mx-[-1rem] mb-[-1rem] md:mx-[-2rem] md:mb-[-2rem]">
            <p className="font-semibold">How did RevisionDojo help your predicted grades?</p>
          </div>
        </main>
      </div>
    </div>
  );
}

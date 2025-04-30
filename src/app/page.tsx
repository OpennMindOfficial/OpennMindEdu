import Image from 'next/image';
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SubjectCard } from "@/components/ui/subject-card";
import { ExamCard } from "@/components/ui/exam-card"; // Import ExamCard
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Card, CardContent } from "@/components/ui/card"; // Import Card and CardContent
import { ArrowRight, Bookmark, ChevronRight, PlusCircle, Lightbulb } from "lucide-react"; // Added icons

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

// Data for Exam Cards
const examCards = [
  {
    title: "Random exam",
    imageUrl: "https://picsum.photos/seed/randomexam/400/300", // Placeholder
    bgColorClass: "bg-gradient-to-br from-exam-blue-light to-white dark:from-exam-blue-dark/30 dark:to-background",
    isNew: false,
  },
  {
    title: "Custom exam",
    imageUrl: "https://picsum.photos/seed/customexam/400/300", // Placeholder
    bgColorClass: "bg-gradient-to-br from-exam-green-light to-white dark:from-exam-green-dark/30 dark:to-background",
    isNew: true,
  },
    {
    title: "Timed exam",
    imageUrl: "https://picsum.photos/seed/timedexam/400/300", // Placeholder
    bgColorClass: "bg-gradient-to-br from-exam-pink-light to-white dark:from-exam-pink-dark/30 dark:to-background",
    isNew: true,
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
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-background">
          <h1 className="text-3xl font-bold text-foreground">Good morning, {userName}</h1>

           {/* Top Promotional Banner - New Style */}
           <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900/80 text-primary-foreground p-6 rounded-xl shadow-lg flex items-center justify-between relative overflow-hidden">
             <div className="z-10">
               <h2 className="text-xl md:text-2xl font-semibold mb-2">How did RevisionDojo help your predicted grades?</h2>
               <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white rounded-full px-4 py-1 text-xs h-auto">
                 Share your wins with us &lt;3
               </Button>
             </div>
             {/* Placeholder for character image */}
             <div className="absolute right-0 bottom-[-20px] opacity-70 z-0 w-32 h-32 md:w-40 md:h-40">
                {/* Simple placeholder - replace with actual image/SVG if available */}
                 <svg viewBox="0 0 100 100" fill="currentColor" className="text-purple-400 w-full h-full">
                    <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z M50,10 C66.6,10 80,23.4 80,40 C80,56.6 66.6,70 50,70 C33.4,70 20,56.6 20,40 C20,23.4 33.4,10 50,10 Z M50,80 C38.9,80 30,71.1 30,60 L70,60 C70,71.1 61.1,80 50,80 Z"/>
                 </svg>
              </div>
           </div>

           {/* Mock Exams Section */}
           <div className="space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer group">
                 <PlusCircle className="w-5 h-5 text-primary" />
                 <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">Mock exams</h2>
                 <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {examCards.map((card, index) => (
                   <ExamCard
                     key={index}
                     title={card.title}
                     imageUrl={card.imageUrl}
                     bgColorClass={card.bgColorClass}
                     isNew={card.isNew}
                   />
                 ))}
               </div>
           </div>

           {/* Learn With Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer group">
                 <Lightbulb className="w-5 h-5 text-yellow-500" /> {/* Updated Icon */}
                 <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">Learn with</h2>
              </div>
              {/* Content for Learn With section goes here - placeholder for now */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {/* Example Placeholder Card - Replace with actual content */}
                 <Card className="p-4 bg-muted/50 dark:bg-card/80 rounded-xl border-0">
                   <CardContent>
                     <p className="text-muted-foreground">Learning content coming soon...</p>
                   </CardContent>
                 </Card>
               </div>
            </div>


           {/* My Subjects Section (existing) - no visual changes needed based on screenshot */}
          <div className="space-y-4">
             <div className="flex justify-between items-center">
               <div className="flex items-center space-x-2 cursor-pointer group">
                 <Bookmark className="w-5 h-5 text-primary" />
                 <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">My subjects</h2>
                 <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="flex items-center space-x-4 text-sm">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Change subjects</Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Browse all</Button>
               </div>
            </div>

            <div className="relative">
               <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 pb-4">
                  {subjects.map((subject, index) => (
                    <SubjectCard
                      key={index}
                      title={subject.title}
                      imageUrl={subject.imageUrl}
                      className="w-[200px] md:w-[220px] flex-shrink-0"
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-2" />
              </ScrollArea>
             </div>
          </div>

          {/* Footer - Added simple footer */}
          <footer className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-primary-foreground p-4 rounded-lg text-center mt-auto mx-[-1rem] mb-[-1rem] md:mx-[-2rem] md:mb-[-2rem]">
            <p className="font-semibold">How did RevisionDojo help your predicted grades?</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

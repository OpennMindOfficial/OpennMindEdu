import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, CircleHelp, Settings, Zap, ShieldQuestion, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-card shrink-0">
      <div className="flex items-center gap-4">
         {/* Logo Section */}
         <div className="flex items-center gap-2 font-bold text-lg text-foreground">
            <div className="bg-foreground text-background rounded-md p-1.5"> {/* Adjusted padding and rounding */}
             {/* Using GraduationCap directly */}
             <GraduationCap className="w-5 h-5" strokeWidth={2} />
            </div>
             OpennMind
             {/* Using ShieldQuestion directly */}
             <ShieldQuestion className="w-4 h-4 text-muted-foreground ml-[-4px]" /> {/* Adjusted margin */}
         </div>
      </div>

      {/* Search Bar - Centered and Max Width */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anything..."
            className="pl-10 w-full bg-background md:bg-muted dark:bg-input" // Adjusted background for better contrast based on theme
          />
        </div>
      </div>

      {/* Right Side Icons & Buttons */}
      <div className="flex items-center gap-2"> {/* Reduced gap */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <CircleHelp className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

         {/* Points Counter Button - Matched styling */}
         <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary gap-1 px-2.5 h-9 rounded-lg">
             <Zap className="h-4 w-4 fill-primary" strokeWidth={1.5}/> {/* Filled Zap icon */}
             <span className="font-semibold">20</span>
             <CircleHelp className="h-4 w-4 text-muted-foreground ml-1" />
         </Button>

        {/* Upgrade Button - Matched styling */}
        <Button variant="primary" size="sm" className="px-4 font-semibold h-9 rounded-lg"> {/* Used primary variant */}
            Upgrade
        </Button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
        </Button>
      </div>
    </header>
  );
}

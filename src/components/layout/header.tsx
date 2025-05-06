import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, CircleHelp, Settings, Zap, ShieldQuestion, GraduationCap, Bug } from "lucide-react"; // Import Bug icon
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link"; // Import Link

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
            className="pl-10 w-full bg-background md:bg-muted dark:bg-input rounded-full" // Rounded search bar
          />
        </div>
      </div>

      {/* Right Side Icons & Buttons */}
      <div className="flex items-center gap-2"> {/* Reduced gap */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95">
          <CircleHelp className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        {/* Upgrade Button - Matched styling */}
        <Button variant="primary" size="sm" className="px-4 font-semibold hover:scale-105 active:scale-95"> {/* Adjusted padding via size="sm" */}
            Upgrade
        </Button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
        </Button>

        {/* Bug Report Button */}
        <Link href="/bug-report" passHref legacyBehavior>
           <a>
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive hover:scale-110 active:scale-95">
                 <Bug className="h-5 w-5" />
                 <span className="sr-only">Report a Bug</span>
             </Button>
           </a>
        </Link>
      </div>
    </header>
  );
}

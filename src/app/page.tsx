'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react'; 

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new landing page for "heexo"
    router.replace('/landing');
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading heexo...</p>
      </div>
    </div>
  );
}

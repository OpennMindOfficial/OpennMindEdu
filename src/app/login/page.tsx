'use client';

import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // In a real app, you'd get a token, save it, etc.
    // For this demo, we just set a flag in localStorage
    if (typeof window !== "undefined") {
        localStorage.setItem('isAuthenticated', 'true');
    }
    router.push('/'); // Redirect to homepage
  };
  
  // Redirect to home if already authenticated
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem('isAuthenticated') === 'true') {
      router.push('/');
    }
  }, [router]);


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}

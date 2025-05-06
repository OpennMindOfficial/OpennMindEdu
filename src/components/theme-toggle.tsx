"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <label className="inline-flex items-center space-x-2">
      <span className="text-sm font-medium">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
      <button
        className="h-9 px-3 font-semibold rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Toggle Theme
      </button>
    </label>
  );
}


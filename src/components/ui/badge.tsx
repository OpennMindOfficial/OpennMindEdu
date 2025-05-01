import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", // Adjusted base rounding
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", // Use for subtle backgrounds like in the sidebar
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Variant for the "New" badge (can be adjusted or removed if not used)
        new: "border-transparent bg-blue-500 text-white text-[10px] h-5 px-2 rounded-full", // Keep New badge round
        // Sidebar count badge style
        count: "border-border/50 bg-muted text-foreground text-[10px] h-5 w-5 p-0 items-center justify-center rounded-full", // Keep count badge round
        // Sidebar FREE badge style
        free: "border-transparent bg-green-600/90 dark:bg-green-700/90 text-white font-bold", // Specific style for 'FREE'
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

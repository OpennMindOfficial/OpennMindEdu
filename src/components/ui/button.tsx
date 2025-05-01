import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-transform duration-150 ease-in-out active:scale-95 focus-visible:scale-105", // Removed hover:scale-105
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-muted hover:text-foreground", // Changed hover:bg-accent to hover:bg-muted and hover:text-accent-foreground to hover:text-foreground
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground", // Adjusted ghost hover for better visibility
        link: "text-primary underline-offset-4 hover:underline !scale-100 active:!scale-100", // Link might not need scaling
        // Adjusted primary variant to match screenshot blue
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90", // Keep original accent if needed elsewhere
      },
      size: {
        default: "h-10 px-6 py-2", // Adjusted padding for bubble shape
        sm: "h-9 px-4", // Adjusted padding
        lg: "h-11 px-8", // Adjusted padding
        icon: "h-10 w-10", // Icon size remains square but gets rounded-full
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
